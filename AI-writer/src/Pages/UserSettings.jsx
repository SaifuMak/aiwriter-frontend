import React, { useState, useRef, useEffect } from 'react'
import { GoTriangleRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { LiaEditSolid } from "react-icons/lia";
import Navbar from '../Components/Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { isValidEmail } from '../Utils/Helperfunctions';
import { isPasswordStrong } from '../Utils/Helperfunctions';
import Axiosinstance from '../Axios/Axiosinstance';
import ErrorToast from '../Utils/ErrorToast';
import SuccessToast from '../Utils/SuccessToast';
import { Toaster, toast } from 'sonner';
import { GetLoginStatus, handleLogout } from '../Utils/AuthService';
import { useNavigate } from 'react-router-dom';
import { LuLoader2 } from "react-icons/lu";

import AdminNavbar from '../Components/Admin/AdminNavbar';
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { loginSuccess } from '../Redux/Slices/AuthSlice';
import ProfileSettings from '../Components/Profile/ProfileSettings';
import AvatarDisplay from '../Components/Avatar/AvatarDisplay';




function UserSettings() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const emailRef = useRef()
    const { IsAuthenticated, Username, Email } = useSelector(state => state.auth);

    const [IsEmailEditable, setIsEmailEditable] = useState(false)
    const [isEmailTypingStarted, setIsEmailTypingStarted] = useState(false)
    const [emailError, setEmailError] = useState('')
    const [Loading, setLoading] = useState(false)
    const [PasswordApiLoading, setPasswordApiLoading] = useState(false)

    const [IsPasswordVisible, setIsPasswordVisible] = useState(false)
    const [IsConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')

    const [confirmPassword, setConfirmPassword] = useState('')

    const [IsPasswordNotMatching, setIsPasswordNotMatching] = useState(false)
    // const Username = 'Richard'

    const [ShowAvatars, setShowAvatars] = useState(false)

    const ToggleAvatar = () => {
        setShowAvatars(!ShowAvatars)
    }

    const HandleEmail = (e) => {
        if (!isEmailTypingStarted) {
            setIsEmailTypingStarted(true)

        }
        setEmail(e.target.value)

    }



    const HandlePassword = (e) => {
        if (!isPasswordStrong(e.target.value)) {
            setPasswordError('Password must be 8+ characters with at least one letter and one number.')

        }
        else {
            setPasswordError('')
        }

        setPassword(e.target.value)

    }



    const HandleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value !== password) {
            setConfirmPasswordError('passwords are not matching')
        }
        else {
            setConfirmPasswordError('')

        }
    }

    const HandleEmailEditable = () => {
        setIsEmailEditable(true)
        if (emailRef.current) {
            emailRef.current.focus();

        }

    }

    const ChangeEmailApi = async () => {
        toast.dismiss()
        setEmailError('')


        if (!isEmailTypingStarted) {
            return
        }
        if (!isValidEmail(email)) {
            setEmailError('please enter a valid email')
            return

        }

        const data = {
            'email': email
        }
        setLoading(true)

        try {
            const response = await Axiosinstance.post('api/change-email', data)
            console.log(response.data)
            SuccessToast(response.data.message)
            setLoading(false)
            setIsEmailTypingStarted(false)
            setIsEmailEditable(false)

            GetLoginStatus(dispatch, setLoading)
        }

        catch (error) {
            ErrorToast(error.response.data.error)
            setLoading(false)
        }
    }


    const ChangePasswordApi = async () => {

        toast.dismiss()

        if (!password.trim() || confirmPassword !== password) {
            return
        }

        const data = {
            'password': password,
            'confirm_password': confirmPassword
        }
        setPasswordApiLoading(true)

        try {
            const response = await Axiosinstance.post('api/change-password', data)
            console.log(response.data)
            SuccessToast(response.data.message)
            setConfirmPassword('')
            setPassword('')
            setPasswordApiLoading(false)

        }

        catch (error) {
            ErrorToast(error.response.data.error)
            setPasswordApiLoading(false)
        }
    }

    const LogoutConfirm = () => {
        handleLogout(dispatch, navigate)
    }


    useEffect(() => {
        const passwordCheckTimeout = setTimeout(() => {
            if (confirmPassword) {
                if (confirmPassword !== password) {
                    setConfirmPasswordError('passwords are not matching')
                }
                else {
                    setConfirmPasswordError('')

                }
            }
        }, 500);

        return () => clearTimeout(passwordCheckTimeout)

    }, [confirmPassword, password])


    useEffect(() => {
        if (IsEmailEditable && emailRef.current) {
            emailRef.current.focus();
        }
    }, [IsEmailEditable]);



    return (

        <>

            <AdminNavbar LogoutConfirm={LogoutConfirm} />


            <div className="relative flex items-center justify-center w-full mt-24 font-poppins">


                <div className="w-11/12 lg:flex lg:space-x-12 ">

                    {/* this is navigation for the mobile screen */}
                    <div className="flex items-center justify-center w-full px-2 py-2 my-4 space-x-2 lg:hidden bg-red-50 ">
                        <Link to='#' className="flex items-center "><span className="text-sm lg:text-lg ">Profile Settings</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Plan Details</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Billing</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Help</span></Link>
                        <Link to='#' className="flex items-center"><span className="lg:text-lg text-sm  text-[#EB1E1E]">Logout</span></Link>
                    </div>

                    <ProfileSettings LogoutConfirm={LogoutConfirm} ToggleAvatar={ToggleAvatar} />



                    <div className="lg:w-9/12 max-lg:mt-6 ">
                        <div className=" border rounded-2xl border-[#CBCBCB] px-6  lg:px-12 py-16 ">

                            <>
                                <h5 className="text-xl font-semibold lg:text-2xl">Account Information</h5>
                                <h6 className="mt-2 lg:text-lg">These details will be used to login to your account.</h6>
                                {/* {emailError && (<h6 className="mt-2 lg:text-lg">These details will be used to login to your account.</h6>)} */}
                            </>

                            <div className="mt-10 space-y-10 lg:mt-16">
                                <div className="flex space-x-6 ">
                                    <div className="w-1/2 ">
                                        <input ref={emailRef} onChange={HandleEmail} type="text" value={isEmailTypingStarted ? email : Email} disabled={!IsEmailEditable} className={`w-1/2 ${IsEmailEditable ? '' : 'cursor-not-allowed'} pb-2 bg-transparent border-b-2 outline-none focus:border-opacity-65 w-full border-opacity-35 border-slate-500`} />
                                        {emailError && <span className="text-sm text-red-500 ">{emailError}</span>}

                                    </div>

                                    <div className="flex w-1/2 space-x-8">
                                        <button onClick={HandleEmailEditable} className="flex items-center justify-center w-24 font-semibold text-white rounded-md h-9 bg-custom-dark-orange "><LiaEditSolid className='mr-1 text-lg lg:text-2xl' /><span className="">Edit</span></button>
                                        {(email && email !== Email) && <button onClick={ChangeEmailApi} className="flex items-center justify-center w-24 h-9 font-semibold text-white rounded-md bg-[#213343] ">Save</button>}
                                    </div>
                                </div>

                                <div className="flex space-x-2 lg:space-x-6">

                                    <div className="relative w-1/2">
                                        <input onChange={HandlePassword} value={password} type={IsPasswordVisible ? 'text' : 'password'} placeholder='New password' className="w-full pb-2 duration-150 border-b-2 outline-none focus:border-opacity-65 border-opacity-35 border-slate-500" />
                                        {password && <span onClick={() => setIsPasswordVisible(!IsPasswordVisible)} className="absolute right-2">{IsPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>}
                                        {(passwordError && password) && <span className="text-sm text-red-500 ">{passwordError}</span>}
                                    </div>

                                    <div className="relative w-1/2">
                                        <input onChange={HandleConfirmPassword} value={confirmPassword} type={IsConfirmPasswordVisible ? 'text' : 'password'} placeholder='Confirm password' className="w-full pb-2 duration-150 border-b-2 outline-none focus:border-opacity-65 border-opacity-35 border-slate-500" />
                                        {confirmPassword && <span onClick={() => setIsConfirmPasswordVisible(!IsConfirmPasswordVisible)} className="absolute right-2">{IsConfirmPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>}
                                        {(confirmPasswordError && confirmPassword) && <span className="text-sm text-red-500 ">{confirmPasswordError}</span>}
                                    </div>
                                </div>
                                <button onClick={ChangePasswordApi} className="bg-[#213343] flex justify-center items-center font-semibold text-white w-48 h-10 rounded-md text-nowrap">{PasswordApiLoading ? <LuLoader2 className='text-2xl animate-spin ' /> : 'Change Password'}</button>
                            </div>
                        </div>
                    </div>

                    {/*                     
                    {ShowAvatars && (<div className="absolute ">
                        <AvatarDisplay />
                    </div>)} */}

                </div>
            </div>
            <Toaster />


        </>
    )
}

export default UserSettings