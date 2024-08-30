import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom'
import Axiosinstance from '../Axios/Axiosinstance'
import { FiLoader } from "react-icons/fi";

import { setLogout } from '../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';


function EmailConfirmation() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation();
    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsloading] = useState(true)
    const [time, setTime] = useState(10)

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        setVerificationCode(code);
        if (code) {

            HandleVerifyEmail(code)
        }


    }, []);

    useEffect(() => {
        let countdownInterval;
        if (!isLoading) {
            countdownInterval = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime <= 1) {
                        clearInterval(countdownInterval);
                        navigate('/login');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => clearInterval(countdownInterval); // Clear interval on component unmount
    }, [isLoading, navigate]);


    const HandleVerifyEmail = async (code) => {

        try {
            const response = await Axiosinstance.post('api/verify-email', { code })
            dispatch(setLogout())

            setIsloading(false)

        }
        catch (error) {
            navigate('/login')
        }
    }


    return (
        <div className="flex items-center justify-center h-screen">
            {isLoading ? (
                <div className=""><FiLoader className='text-4xl text-custom-dark-orange animate-spin' /></div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full space-y-7 ">
                    <h2 className="text-2xl font-semibold text-center text-custom-dark-orange sm:text-5xl">Password change completed</h2>
                    <h2 className="text-lg text-center text-stone-600 sm:text-2xl"> You can now log in with your new password</h2>
                    <Link to='/login' className="px-4 py-2 font-semibold text-white duration-300 rounded-md hover:bg-stone-600 bg-stone-400">Back to Login</Link>

                    <h6 className="text-base sm:text-base text-stone-600">Redirecting to the login page in <span className="font-semibold ">{time}</span> seconds </h6>
                </div>
            )}



        </div>

    )
}

export default EmailConfirmation