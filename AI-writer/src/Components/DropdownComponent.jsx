import React from 'react'
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";
import CustomToolTip from './ArticleGenerationComponents/SmallComponents/CustomToolTip';

function DropdownComponent({ label, options, IsLabel = true, IsOpened, IsToolTip = false, IsDarkBackground = true, ToolTipInfo, value, ToggleAction, HandleSelection, isActive }) {


    return (
        <div className={`relative  w-full ${IsDarkBackground ? 'mt-8' : ' mt-0'}`}>
           {IsLabel && <CustomToolTip title={ToolTipInfo}>
                 <label className="inline-flex items-center mb-1 text-sm text-white lg:text-base xl:text-lg ">{label} {IsToolTip && <MdInfoOutline className='text-white ml-1 text-sm font-bold' />}</label>
            </CustomToolTip>}
            <div
                className={`relative w-full px-4 py-1.5 lg:py-2 xl:py-2.5 ${IsDarkBackground ? 'bg-[#42515F]' : 'bg-[#ffffff]'}  border border-custom-dark-orange border-opacity-55  rounded-md ${isActive ? 'cursor-pointer' : 'cursor-not-allowed'} `}
                onClick={isActive ? ToggleAction : null}
            >
                {IsDarkBackground ? (
                    <span className={`block text-sm lg:text-base  ${value ? 'text-white' : 'text-slate-400'} truncate`}>{value ? value : label}</span>
                ) : (
                    <span className={`block text-sm lg:text-base  ${value ? 'text-slate-900' : 'text-slate-800'} truncate`}>{value ? value : label}</span>
                )}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    {/* {IsOpened ? (<MdKeyboardArrowUp className='text-2xl rotate-180 text-custom-dark-orange' />) : (< MdKeyboardArrowDown className='text-2xl rotate-180 text-custom-dark-orange' />)} */}
                    <MdKeyboardArrowDown className={`${IsOpened ? 'rotate-180' : 'rotate-0'} text-custom-dark-orange transition-transform duration-150  transform  text-2xl`} />
                </span>
            </div>
            {IsOpened && (
                <ul className={`absolute left-0 right-0 z-10 py-2 mt-1 overflow-auto  ${IsDarkBackground ? 'bg-[#42515F]' : 'bg-[#ffffff]'}  rounded-md shadow-lg max-h-40 scrollbar-hide`}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`block ${option === value  ? 'bg-custom-lighter-orange': '' } px-4 py-2 text-sm lg:text-base  ${IsDarkBackground ? 'hover:bg-[#455665] text-gray-300' : 'text-gray-900 hover:bg-stone-50'}  cursor-pointer  `}
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