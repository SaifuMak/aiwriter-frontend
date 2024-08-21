import React from 'react'
import Logo from '../assets/Images/Logo.png'

function Login() {

    return (
        <div className="flex items-center justify-center h-screen bg-custom-dark font-poppins">
            <div className="bg-[#42515F] flex flex-col justify-center h-auto  items-center py-16 px-5 rounded-md    ">
                <div className="w-32 h-12 xl:h-16 xl:w-44 ">
                    <img src={Logo} alt="" className="object-cover w-full h-full " />

                </div>
                <span className="text-white ">Login to your account</span>

                

                <input type="text" className="p-1 mt-20 text-white bg-transparent border-b border-white outline-none w-96" placeholder='Email address' />

                <input type="text" className="p-1 mt-8 text-white bg-transparent border-b border-white outline-none w-96" placeholder='Password' />

                 <button className="w-full py-2 mt-10 text-white rounded-md bg-custom-dark-orange ">Login</button>

                 <p className="mt-10 text-sm text-white ">Forgot<span className="ml-1 text-custom-dark-orange">password?</span></p>

            </div>
        </div>


    )
}

export default Login