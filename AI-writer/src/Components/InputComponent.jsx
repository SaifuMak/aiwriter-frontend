import React from 'react'
import DotIcon from '../assets/Icons/DotIcon'

function InputComponent({label,placeholder,count,onChange,value}) {
    return (
        <section className="flex flex-col w-full mt-8 space-y-2">
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center">
                    <DotIcon />
                    <span className="ml-1 text-sm text-white lg:text-base xl:text-lg">{label}</span>
                </div>
                <span className="text-[#E6E6E6] max-lg:text-sm ml-1">{count}</span>
            </div>
            <input type="text" onChange={onChange} value= {value} className="px-4 py-1.5 bg-white rounded-md outline-none max-sm:lg:text-sm lg:py:2 xl:py-2.5 " placeholder={placeholder} />
        </section>
    )
}

export default InputComponent