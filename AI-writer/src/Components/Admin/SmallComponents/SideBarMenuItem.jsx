import React from 'react'

function SideBarMenuItem({ Icon, label, getMenuStyle,handleComponentChange,currentPageOfAdmin }) {
    return (
        <div onClick={()=>handleComponentChange(label)} className={`flex items-center  lg:text-base xl:text-base   ${getMenuStyle(label)} space-x-1 xl:space-x-2 px-2 xl:px-4 xl:font-semibold xl:py-2 py-1 hover:text-white duration-150 cursor-pointer ${currentPageOfAdmin !== label ? 'hover:hover:bg-[#FFFFFF1A]': ''}  `}>
            <div className="flex items-center w-full space-x-2 lg:px-4 xl:px-6 ">
                <Icon className='xl:text-lg shrink-0' />
                <span className="2xl:text-lg">{label}</span>
            </div>
        </div>
    )
}

export default SideBarMenuItem