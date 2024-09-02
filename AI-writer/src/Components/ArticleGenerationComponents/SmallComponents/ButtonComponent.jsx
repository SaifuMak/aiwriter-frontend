import React from 'react'

function ButtonComponent({isVisible,onClick,label}) {
    if (!isVisible) return null;
  return (
    <button onClick={onClick} className="px-2 py-1.5 tracking-wider text-white rounded-sm cursor-pointer sm:text-xs lg:py-2 xl:px-6 lg:px-5 lg:text-base bg-custom-dark-orange ">{label}</button>

  )
}

export default ButtonComponent