import React from 'react'

function InputBox({placeholder}) {
  return (
    <input type="text" className="w-1/2 py-2 text-base text-black border-b outline-none border-slate-400" placeholder={placeholder} />

  )
}

export default InputBox