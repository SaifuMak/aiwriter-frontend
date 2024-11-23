import React from 'react'

function InputComponent({ label, value, isInline, Iseditable,handleInputChange, name}) {
    return (
        
        <div className={`${isInline ? 'flex  space-x-6' : ''} mt-3 w-full`}>

            <div className="w-4/12 ">
                <h6 className="font-semibold  text-[#3D3D3D]">{label}</h6>
            </div>

            {isInline ? (
                <input onChange={handleInputChange} name={name}  placeholder={value ? '' : 'N/A'} type="text" value={value || ''} disabled={!Iseditable} className={` ${Iseditable ? 'border border-custom-dark-orange rounded-md w-3/12  outline-none pl-1 ' : ' w-4/12   bg-transparent'}  pr-2  py-0.5   text-[#3D3D3D]`} />
            ) : (
                <input onChange={handleInputChange} name={name}  placeholder={value ? '' : 'N/A'} type="text" value={value || ''} disabled={!Iseditable} className={` ${Iseditable ? 'border border-custom-dark-orange rounded-md  outline-none pl-1' : '   bg-transparent'}   pr-2  py-0.5   text-[#3D3D3D]`} />
            )}
           
        </div>
      

    )
}

export default InputComponent