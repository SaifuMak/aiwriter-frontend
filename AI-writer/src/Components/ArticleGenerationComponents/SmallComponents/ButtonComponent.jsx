import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { LuRefreshCcw } from "react-icons/lu";



function ButtonComponent({ isVisible, onClick, color= '#FB923C',  label, isIcon=false }) {
  const { loading } = useSelector((state) => state.articleGeneration);
  if (!isVisible) return null;

  return (
    <>
      {loading ? (
        <button className="text-white  lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md px-3 min-w-[100px] xl:min-w-[151px] lg:min-w-[120px]" style={{ backgroundColor: color }}>
          <PulseLoader color="#ffffff" size={6} margin={4} />
        </button>

      ) : (
        <button onClick={onClick} className="text-white flex justify-center  lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md  px-3 min-w-[100px] xl:min-w-[151px] lg:min-w-[120px] " style={{ backgroundColor: color }}>
         
          <span className='flex items-center '>
           {isIcon &&  <LuRefreshCcw className='mr-2 shrink-0' />}
            {label}</span>
        </button>

      )}
    </>
    // <button onClick={onClick} className="px-2 py-1.5 tracking-wider text-white rounded-sm cursor-pointer sm:text-xs lg:py-2 xl:px-6 lg:px-5 lg:text-base bg-custom-dark-orange ">{label}</button>

  )
}

export default ButtonComponent

