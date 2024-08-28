import React, { useState } from 'react'
import Logo from '../assets/Images/Logo.png'
import LongArrow from '../assets/Icons/LongArrow'

import Axiosinstance from '../Axios/Axiosinstance'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from 'sonner';

import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';



function Login() {
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [isPasswordVisible, setisPasswordVisible] = useState(false)

    const handleEmail = (e) => {
        setEmail(e.target.value.trim())
    }

    const handlePassword = (e) => {
        setPassword(e.target.value.trim())
    }

    const togglePasswordVisible = () => {
        setisPasswordVisible(() => !isPasswordVisible)
    }

    const loginSubmit = async() => {
        if(!Password || !Email){
            ErrorToast('Fields cannot be empty ')
            return
        }

        const data = {
            'email': Email,
            'password': Password
        }

        try {
            const response = await Axiosinstance.post('api/login', data)
            // navigate('/cashplus-dashboard')
        SuccessToast('success')



        }

        catch (error) {
            // toast.error('Wrong credentials.');

        }

        console.log(Email, Password)

    }

    return (
        <div className="flex items-center justify-center h-screen bg-custom-dark font-poppins">
            <div className="bg-[#42515F] flex flex-col justify-center h-auto  max-sm:-mt-56  items-center py-8 sm:py-12 px-4 sm:px-10 rounded-md    ">

                <div className="h-12 w-36 xl:h-16 xl:w-48 ">
                    <img src={Logo} alt="" className="object-cover w-full h-full " />
                </div>

                <span className="text-white ">Login to your account</span>


                <input onChange={handleEmail} type="text" className="p-1 mt-16 text-white bg-transparent border-b focus:text-custom-dark-orange border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Email address' />
                <div className="relative ">
                    {Password && (
                        
                        <span
                            onClick={togglePasswordVisible}
                            className="absolute cursor-pointer text-custom-dark-orange right-5 bottom-4"
                        >
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>

                    )}
                    <input onChange={handlePassword} type={isPasswordVisible ? 'text' : 'password'} className="p-1 mt-8 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Password' />
                </div>
                <button onClick={loginSubmit} className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange ">Login</button>

                <p className="mt-8 cursor-pointer text-custom-dark-orange ">Forgot password?</p>

            </div>
            <Toaster position="bottom-right" />
        </div>


    )
}

export default Login