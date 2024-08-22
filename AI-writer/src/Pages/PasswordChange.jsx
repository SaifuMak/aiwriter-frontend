import React from 'react'
import Logo from '../assets/Images/Logo.png'


function PasswordChange() {
  return (
    <div className="flex items-center justify-center h-screen bg-custom-dark font-poppins">
    <div className="bg-[#42515F] flex flex-col justify-center h-auto max-sm:-mt-56   items-center py-8 sm:py-12 px-4 sm:px-10 rounded-md    ">
      
        <div className="h-12 w-36 xl:h-16 xl:w-48 ">
            <img src={Logo} alt="" className="object-cover w-full h-full " />
        </div>

        <span className="text-white ">Reset password</span>

        <input type="text" className="p-1 mt-16 text-white bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Email address' />


         <button className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange ">SEND RESET EMAIL</button>


    </div>
</div>
  )
}

export default PasswordChange