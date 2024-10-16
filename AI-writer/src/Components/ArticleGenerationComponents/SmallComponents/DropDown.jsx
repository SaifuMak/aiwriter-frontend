import React from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";

function DropDown({  IsOpened, options,Toggle,HandleCountrySelection,SelectedCountry }) {


    return (
        <div className="relative w-1/2 ">

            <div
                className={`relative w-full py-2  border-b border-slate-400  cursor-pointer `}
               onClick={Toggle}
            >
                <span className={`block text-sm lg:text-base ${SelectedCountry ? ' text-black' : 'text-slate-400'}   truncate`}>{SelectedCountry ? SelectedCountry : 'Country'}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    {/* {IsOpened ? (<MdKeyboardArrowUp className='text-2xl rotate-180 text-custom-dark-orange' />) : (< MdKeyboardArrowDown className='text-2xl rotate-180 text-custom-dark-orange' />)} */}
                    <MdKeyboardArrowDown className={`${IsOpened ? 'rotate-180' : 'rotate-0'} text-custom-dark-orange transition-transform duration-150  transform  text-2xl`} />
                </span>
            </div>
            
            {IsOpened && (
                <ul className="absolute left-0 right-0 z-10 py-2 mt-1 overflow-auto bg-white rounded-md shadow-md max-h-40 scrollbar-hide">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="block px-1 py-2 text-sm cursor-pointer lg:text-base hover:bg-slate-50 "
                            onClick={() => HandleCountrySelection(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropDown