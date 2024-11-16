import React, { useState, useEffect, useRef } from 'react'
import { setLogout } from '../../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Axiosinstance from '../../Axios/Axiosinstance';
import {ResetWordsCount} from '../../Redux/Slices/AssetsSlice'



function ProfileDetails({ setIsProfilePopup }) {
const { IsAuthenticated, Username, Email  } = useSelector(state => state.auth);
    
  const navigate = useNavigate()
    const profileRef = useRef(null)
    const dispatch = useDispatch()

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfilePopup(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [setIsProfilePopup])

    const data = 'logout'



    const handleLogout = async() => {

        try {
            const response = await Axiosinstance.post('api/logout',data)
            dispatch(setLogout())
            dispatch(ResetWordsCount())
            setIsProfilePopup(false)
           
            
            navigate('/login')
        }

        catch (error) {
            dispatch(setLogout())
           

        }
    }



    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
            <div ref={profileRef} className="w-[600px]  flex  justify-center  py-10 items-center  bg-custom-dark rounded-lg shadow-lg ">
                <div className="flex flex-col items-center justify-center space-y-8 text-white ">
                    <div className="flex flex-col items-center justify-center ">

                        <span className="flex items-center justify-center w-24 h-24 text-3xl text-white duration-300 border-2 rounded-full cursor-pointer hover:bg-custom-dark-orange border-custom-dark-orange border-opacity-65 bg-custom-dark">
                            {Username ? Username[0] : 'U'}
                        </span>

                        <span className="mt-2 text-2xl ">{Username}</span>
                        <span className="">{Email}</span>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-4 ">
                        <div className="">
                        <Link to='/password-change' className="px-4 py-2.5 text-sm duration-300 rounded-md bg-slate-500 hover:bg-custom-dark-orange">Change password</Link>
                        </div>
                        <button onClick={handleLogout} className="w-40 py-2 text-sm rounded-md bg-slate-500 hover:bg-custom-dark-orange">Logout</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProfileDetails