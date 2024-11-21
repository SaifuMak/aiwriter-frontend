import React from 'react'

function InputComponent({ label, value, isInline,  }) {
    return (
        <div className={`${isInline ? 'flex  space-x-6' : ''} mt-3 w-full`}>
        
            <div className="w-4/12 ">
                <h6 className="font-semibold  text-[#3D3D3D]">{label}</h6>
            </div>

            <div className="">
                <input type="text" value={value} className="border outline-none text-[#3D3D3D]" />
            </div>
        </div>
    )
}

export default InputComponent