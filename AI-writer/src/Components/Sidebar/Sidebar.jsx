import React from 'react'
import { SlHome } from "react-icons/sl";
import { AiOutlineFileSync } from "react-icons/ai";
import { GrDocumentTime } from "react-icons/gr";
import { LuFileEdit } from "react-icons/lu";
import { GrUploadOption } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";

import Logo from '../../assets/Images/Logo.png'


import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, setLogout } from '../../Redux/Slices/AuthSlice'


function Sidebar({ setIsProfilePopup, setIsSidedbarOpened }) {

  const dispatch = useDispatch()

  const { IsAuthenticated, Username } = useSelector(state => state.auth);
  console.log(IsAuthenticated, '-----', Username, '-----------------------------------')

  const menustyle = 'flex items-center  lg:text-base xl:text-base text-white space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer  hover:text-custom-dark-orange'


  

  return (

    <div className='flex flex-col items-center px-2 py-16 space-y-12 md:py-10 md:space-y-10 xl:space-y-12 xl:px-4 bg-custom-dark h-svh'>

      <section className='w-full border rounded-lg xl:py-2 border-custom-dark-orange border-opacity-60 ' >

        <div className="w-32 h-12 -ml-4 xl:h-16 xl:w-44 ">
          <img src={Logo} alt="" className="object-cover w-full h-full" />
        </div>
      </section>

      <section className="flex flex-col justify-start w-full space-y-1 ">
        <div className={menustyle}>

          <SlHome className='' />
          <span className="">Home</span>
        </div>

        <div className={menustyle}>
          <AiOutlineFileSync className='' />
          <span className="">History</span>
        </div>

        <div className={menustyle}>
          <LuFileEdit className='' />
          <span className="">Article Writer</span>
        </div>

        <div className={menustyle}>
          <LuFileEdit className='' />
          <span className="">Article Rewriter</span>
        </div>
      </section>

      <section className="w-full px-2 py-5 space-y-2 border rounded-lg xl:space-y-5 xl:px-4 border-custom-dark-orange border-opacity-60 ">

        <div className="flex flex-col space-y-1 text-white">
          <span className="font-medium ">Superior words</span>
          <span className="text-sm">123,456</span>
        </div>

        <div className="flex flex-col space-y-1 text-white">
          <span className="font-medium ">Premium Credits</span>
          <span className="text-sm">123</span>
        </div>

        <button className="flex items-center justify-center max-xl:text-sm rounded-sm w-full py-1 xl:py-1.5 text-white hover:bg-hover-button-color  bg-custom-dark-orange "><GrUploadOption className='mr-1' />Upgrade</button>

      </section>


      <section className='w-full py-4 text-white border rounded-lg xl:py-8 border-custom-dark-orange border-opacity-60 ' >

        <div onClick={()=>setIsProfilePopup(true)} className="flex items-center justify-between px-2 cursor-pointer xl:px-4 ">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full max-lg:text-sm xl:w-8 xl:h-8 bg-custom-dark-orange">M</div>
            <span className="text-base xl:text-lg">MakTal</span>
          </div>

          <IoMenuOutline className='text-3xl text-stone-200'  />

        </div>
      </section>


    </div>
  )
}

export default Sidebar