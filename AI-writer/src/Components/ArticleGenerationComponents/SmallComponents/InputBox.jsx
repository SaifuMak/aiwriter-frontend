import React from 'react'

function InputBox({ placeholder, name, value, onchange }) {


  return (

    <div className="relative w-1/2 py-2 text-base text-black border-b outline-none border-slate-400 ">
      <input onChange={onchange} value={value} name={name} type="text" className="" placeholder={placeholder} />
      <span className="absolute left-0 text-xs text-red-500 -bottom-5 ">*This field is required</span>
    </div>

  )
}



export default InputBox