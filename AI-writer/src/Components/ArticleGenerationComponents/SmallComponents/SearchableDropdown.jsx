import React, { useState,useRef,useEffect } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


function SearchableDropdown({ IsOpened, options, Toggle, HandleCountrySelection, SelectedCountry, is_null, searchQuery, setSearchQuery }) {
    const dropdownRef = useRef(null); // Ref to track the dropdown component


    // Filter options based on search query
    const filteredOptions = options.filter((option) =>
        option.toLowerCase().startsWith(searchQuery.toLowerCase())
    );

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        HandleCountrySelection(e.target.value)

        if (!IsOpened) {
            Toggle(); // Open the dropdown if not already open
        }
    };
    const handleCancelButton = ()=>{
        HandleCountrySelection('')
        Toggle();
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                if (IsOpened) {
                    Toggle(); // Close the dropdown
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [IsOpened, Toggle]);



    return (
        <div ref={dropdownRef} className="relative w-1/2 ">

            <div
                className={`relative w-full py-2  border-b border-slate-400  `}
                onClick={Toggle}
            >
                <input onChange={handleSearch} type="text" placeholder='Country' value={SelectedCountry || searchQuery || ''} className="w-full outline-none " />
                {/* <span className={`block text-sm lg:text-base ${SelectedCountry ? ' text-black' : 'text-slate-400'}   truncate`}>{SelectedCountry ? SelectedCountry : 'Country'}</span> */}
                {SelectedCountry && <span onClick={handleCancelButton} className="absolute inset-y-0 flex items-center font-semibold cursor-pointer right-10 text-custom-dark-orange "><RxCross2 /></span>}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer pointer-events-none">
                    {/* {IsOpened ? (<MdKeyboardArrowUp className='text-2xl rotate-180 text-custom-dark-orange' />) : (< MdKeyboardArrowDown className='text-2xl rotate-180 text-custom-dark-orange' />)} */}
                    <MdKeyboardArrowDown className={`${IsOpened ? 'rotate-180' : 'rotate-0'} text-custom-dark-orange transition-transform duration-150  transform  text-2xl`} />
                </span>
            </div>



            {IsOpened && (
                <ul className="absolute left-0 right-0 z-10 py-2 mt-1 overflow-auto bg-white rounded-md shadow-md max-h-40 scrollbar-hide">
                   
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                className="block px-1 py-2 text-sm cursor-pointer lg:text-base hover:bg-slate-50"
                                onClick={() => HandleCountrySelection(option)}
                            >
                                {option}
                            </li>
                        ))
                    ) : (
                        <li className="px-2 py-1 text-sm text-gray-400">No results found</li>
                    )}
                </ul>
            )}

            {is_null && <span className="text-xs text-red-500 ">*This field is required</span>}

        </div>
    )
}

export default SearchableDropdown