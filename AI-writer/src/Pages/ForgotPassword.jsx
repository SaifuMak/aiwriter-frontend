import React, { useState } from 'react'
import Logo from '../assets/Images/Logo.png'
import Axiosinstance from '../Axios/Axiosinstance'
import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Toaster, toast } from 'sonner';

import PulseLoader from 'react-spinners/PulseLoader';



function ForgotPassword() {

    const [Email, setEmail] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [isPoorPassword, setisPoorPassword] = useState(false)
    const [isNewPasswordVisible, setisNewPasswordVisible] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)


    const handleEmail = (e) => {

        setEmail(e.target.value.trim())

    }

    const toggleNewPasswordVisible = () => {
        setisNewPasswordVisible(() => !isNewPasswordVisible)
    }


    const HandleConfirmPassword = (e) => {
        const moderateRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        const Newpassword = e.target.value.trim();
        setNewpassword(Newpassword)
        const isPasswordStrong = moderateRegex.test(Newpassword)
        setisPoorPassword(isPasswordStrong)
    }

    const HandleResetPassword = async () => {

        if (!newpassword || !Email || !isPoorPassword || IsLoading) {
            return
        }
        setIsLoading(true)


        const data = {
            'email': Email,
            'password': newpassword
        }


        try {
            const response = await Axiosinstance.post('api/reset-password', data)
            SuccessToast(response.data.message)
            setNewpassword('')
            setEmail('')
            setIsLoading(false)


        }


        catch (error) {
            if (error.response && error.response.status === 403) {
                // Handle session expired
                ErrorToast('Session expired. Please log in again.');
            }

            else {
                ErrorToast(error.response.data.message);
            }

            setIsLoading(false)

        }
    }


    return (
        <div className="flex items-center justify-center h-screen bg-custom-dark font-poppins">
            <div className="bg-[#42515F] flex flex-col justify-center h-auto max-sm:-mt-56   items-center py-8 sm:py-12 px-4 sm:px-10 rounded-md    ">

                <div className="h-12 w-36 xl:h-16 xl:w-48 ">
                    <img src={Logo} alt="" className="object-cover w-full h-full " />
                </div>

                <span className="text-white ">Reset password</span>

                <input onChange={handleEmail} value={Email} type="text" className="p-1 mt-16 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Email address' />
                <div className="relative flex flex-col ">
                    {newpassword && (

                        <span
                            onClick={toggleNewPasswordVisible}
                            className="absolute cursor-pointer text-custom-dark-orange right-5 bottom-7"
                        >
                            {isNewPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    )}

                    <input onChange={HandleConfirmPassword} value={newpassword} type={isNewPasswordVisible ? 'text' : 'password'} className="p-1 mt-8 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='New Password' />
                    {(!isPoorPassword && newpassword) && (<span className="w-11/12 mt-1 text-xs text-white ">Please use 8+ characters with letters and digits.</span>)}
                </div>



                <button onClick={HandleResetPassword} className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange">{IsLoading ? (
                    <div className="flex items-center justify-center">
                        <span>Requesting</span>
                        <PulseLoader color="#ffffff" size={6} margin={4} />
                    </div>
                ) : (
                    <div className="flex items-center justify-center ">
                        <span>RESET PASSWORD</span>

                    </div>
                )}
                </button>


            </div>
            <Toaster position="bottom-right" />

        </div>
    )
}

export default ForgotPassword