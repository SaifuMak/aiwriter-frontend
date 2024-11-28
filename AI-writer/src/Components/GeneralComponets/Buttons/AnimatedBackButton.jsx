import React from 'react'
import { MdOutlineKeyboardBackspace } from "react-icons/md";

function AnimatedBackButton({HandleGoBack}) {
  return (
    <div className="flex   mb-8">
    <button onClick={HandleGoBack} className="px-4 py-1.5 duration-150 hover:bg-slate-100 rounded-2xl font-semibold border flex group items-center border-custom-dark-orange"><MdOutlineKeyboardBackspace className='mr-1 text-xl transition-transform duration-300 ease-in-out group-hover:-translate-x-1.5' />Go back</button>
</div>

  )
}

export default AnimatedBackButton