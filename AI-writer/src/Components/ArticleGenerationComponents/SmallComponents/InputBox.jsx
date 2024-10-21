import React from 'react'

function InputBox({ placeholder, name, value, onchange,is_null}) {


  return (

    <div className="relative w-1/2 py-2 text-base text-black border-b border-slate-400 ">
      <input onChange={onchange} value={value} name={name} type="text" className="w-full outline-none " placeholder={placeholder} />
     {is_null && <span className="absolute left-0 text-xs text-red-500 -bottom-5 ">*This field is required</span>}
    </div>

  )
}



export default InputBox