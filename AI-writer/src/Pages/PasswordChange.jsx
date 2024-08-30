import React, { useState } from 'react'
import Logo from '../assets/Images/Logo.png'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Axiosinstance from '../Axios/Axiosinstance'
import { Toaster, toast } from 'sonner';

import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';
import PulseLoader from 'react-spinners/PulseLoader';


function PasswordChange() {
  const [isPasswordVisible, setisPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setisConfirmPasswordVisible] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)

  const [password, setpassword] = useState('')
  const [newpassword, setNewpassword] = useState('')

  const [isPoorPassword, setisPoorPassword] = useState(false)


  const togglePasswordVisible = () => {
    setisPasswordVisible(() => !isPasswordVisible)
  }

  const toggleNewPasswordVisible = () => {
    setisConfirmPasswordVisible(() => !isConfirmPasswordVisible)
  }

  const HandlePassword = (e) => {


    const password = e.target.value.trim();

    setpassword(password)

  }

  const HandleConfirmPassword = (e) => {
    const moderateRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const Newpassword = e.target.value.trim();
    setNewpassword(Newpassword)
    const isPasswordStrong = moderateRegex.test(Newpassword)
    setisPoorPassword(isPasswordStrong)
  }

  const HandleChangePassword = async () => {

    if (!newpassword || !password || !isPoorPassword || IsLoading) {
      return
    }
    setIsLoading(true)

    const data = {
      'temp_password': newpassword,
      'password': password
    }

    try {
      const response = await Axiosinstance.post('api/change-password', data)
      setNewpassword('')
      setpassword('')
      SuccessToast(response.data.message)

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

        <span className="text-white ">Change password</span>

        <div className="relative ">
          {password && (

            <span
              onClick={togglePasswordVisible}
              className="absolute cursor-pointer text-custom-dark-orange right-5 bottom-4"
            >
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          )}

          <input onChange={HandlePassword} value={password} type={isPasswordVisible ? 'text' : 'password'} className="p-1 mt-8 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Current Password' />
        </div>


        <div className="relative flex flex-col ">
          {newpassword && (

            <span
              onClick={toggleNewPasswordVisible}
              className="absolute cursor-pointer text-custom-dark-orange right-5 bottom-4"
            >
              {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          )}

          <input onChange={HandleConfirmPassword} value={newpassword} type={isConfirmPasswordVisible ? 'text' : 'password'} className="p-1 mt-8 text-white focus:text-custom-dark-orange bg-transparent border-b border-white outline-none focus:border-custom-dark-orange transition duration-300 w-72 sm:w-[360px]" placeholder='Current Password' />
          {(!isPoorPassword && newpassword) && (<span className="w-11/12 mt-1 text-sm ">Please use 8+ characters with letters and digits.</span>)}
        </div>


        {/* {IsLoading}  <button onClick={HandleChangePassword} className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange ">CHANGE PASSWORD</button> */}


        <button onClick={HandleChangePassword} className="w-full py-2 mt-12 text-white rounded-md bg-custom-dark-orange">{IsLoading ? (
          <div className="flex items-center justify-center">
            <span>Requesting</span>
            <PulseLoader color="#ffffff" size={6} margin={4} />
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <span>CHANGE PASSWORD</span>

          </div>

        )}
        </button>


      </div>
      <Toaster position="bottom-right" />

    </div>
  )

}


export default PasswordChange