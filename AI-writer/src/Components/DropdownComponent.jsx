import React from 'react'
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function DropdownComponent({ label, options, IsOpened, value, ToggleAction, HandleSelection }) {


    return (
        <div className="relative w-full mt-8">
            <label className="inline-block mb-1 text-sm text-white lg:text-base xl:text-lg ">{label}</label>
            <div
                className="relative w-full px-4 py-1.5 lg:py-2 xl:py-2.5 bg-[#42515F] border border-custom-dark-orange border-opacity-55  rounded-md cursor-pointer"
                onClick={ToggleAction}
            >
                <span className={`block text-sm lg:text-base  ${value ? 'text-white' : 'text-slate-400'} truncate`}>{value ? value : label}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    {IsOpened ? (<MdKeyboardArrowUp className='text-xl text-slate-600' />) : (< MdKeyboardArrowDown className='text-xl text-slate-600' />)}
                </span>
            </div>
            {IsOpened && (
                <ul className="absolute left-0 right-0 z-10 py-2 mt-1 overflow-auto bg-[#42515F]  rounded-md shadow-lg max-h-40 scrollbar-hide">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="block px-4 py-2 text-sm lg:text-base text-gray-300 cursor-pointer hover:bg-[#455665] "
                            onClick={() => HandleSelection(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default DropdownComponent