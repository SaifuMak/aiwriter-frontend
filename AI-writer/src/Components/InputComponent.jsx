import React from 'react'
import DotIcon from '../assets/Icons/DotIcon'


function InputComponent({label,placeholder,count,onChange,value,isOptional,isActive}) {
    return (
        <section className="flex flex-col w-full mt-8 space-y-2">
            <div className="flex items-center justify-between ">
                <div className="flex items-center justify-center">
                    <DotIcon />
                    <span className="ml-1 text-sm text-white lg:text-base xl:text-lg">{label}</span>
                    {isOptional && (<span className="ml-1 text-xs text-white ">(optional)</span>)}
                </div>
                <span className="text-[#E6E6E6]  max-lg:text-sm ml-1">{count}</span>
            </div>
            {/* <textarea type="text" onChange={onChange} value= {value} disabled={isActive} className={`px-4 py-1.5 ${isActive ? 'cursor-not-allowed' : ''}  rounded-md outline-none bg-fuchsia-100 text-sm lg:text-base  lg:py-2 xl:py-2.5 `} placeholder={placeholder} /> */}
            <textarea type="text" onChange={onChange} value= {value} disabled={isActive} className={`px-4 ${isActive ? 'cursor-not-allowed' : ''}  rounded-md  outline-none  bg-white  text-sm lg:text-base   `} placeholder={placeholder} />
        
        </section>
    )
}

export default InputComponent