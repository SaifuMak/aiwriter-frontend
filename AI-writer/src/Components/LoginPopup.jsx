import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

import Axiosinstance from '../Axios/Axiosinstance'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from 'sonner';
import { loginSuccess } from '../Redux/Slices/AuthSlice'
import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import CompleteLogo from '../assets/Logo/CompleteLogo';
import GeneralLoader from './GeneralComponets/Loaders/GeneralLoader';



function LoginPopup({ HandleCloseLoginPopup, setIsPayButtonClicked }) {


    const { IsAuthenticated } = useSelector(state => state.auth);


    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [isPasswordVisible, setisPasswordVisible] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)


    const handleEmail = (e) => {
        setEmail(e.target.value.trim())
    }

    const handlePassword = (e) => {
        setPassword(e.target.value.trim())
    }

    const togglePasswordVisible = () => {
        setisPasswordVisible(() => !isPasswordVisible)
    }



    const loginSubmit = async () => {
        toast.dismiss()
        if (!Password || !Email) {
            ErrorToast('Fields cannot be empty  ', true, true)
            return
        }

        const data = {
            'email': Email,
            'password': Password
        }

        try {
            setIsLoading(true)
            const response = await Axiosinstance.post('api/login', data)
            // dispatch(loginSuccess({}));
            // setIsPayButtonClicked(false)
            HandleCloseLoginPopup()
            setIsLoading(false)


        }

        catch (error) {

            ErrorToast('Incorrect email or password', true, true)
        setIsLoading(false)
           

        }
        setIsLoading(false)

    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
            <div className="relative bg-[#42515F] flex flex-col justify-center h-auto  max-sm:-mt-56  items-center py-8 sm:py-12 px-4 sm:px-10 rounded-md">
                <span onClick={HandleCloseLoginPopup} className="absolute p-1 text-2xl text-white cursor-pointer top-1 right-1 hover:bg-slate-500 rounded-2xl"><RxCross2 /></span>
                <div className="h-12 w-36 xl:h-16 xl:w-48 ">
                    {/* <img src={Logo} alt="" className="object-cover w-full h-full " /> */}
                    <CompleteLogo />
                </div>

                <span className="text-lg text-white ">Login to your account</span>
                {IsAuthenticated && (
                    <span className="">still autheticated </span>
                )}


                <input onChange={handleEmail} value={Email} type="text" className="p-1 mt-16 text-white bg-transparent border-b focus:text-custom-dark-orange border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Email address' />
                <div className="relative ">
                    {Password && (

                        <span
                            onClick={togglePasswordVisible}
                            className="absolute cursor-pointer text-custom-dark-orange right-5 bottom-4"
                        >
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    )}

                    <input onChange={handlePassword} value={Password} type={isPasswordVisible ? 'text' : 'password'} className="p-1 mt-8 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Password' />
                </div>
                {/* <button onClick={loginSubmit} className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange ">Login</button> */}
                <button disabled={IsLoading} onClick={loginSubmit} className="w-full flex justify-center items-center h-10 mt-12 text-white rounded-md bg-custom-dark-orange ">{IsLoading ? <GeneralLoader /> : 'Login'}</button>

            </div>
            <Toaster />


        </div>
    )
}

export default LoginPopup