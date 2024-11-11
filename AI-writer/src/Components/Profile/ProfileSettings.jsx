import React from 'react'
import { GoTriangleRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../Utils/AuthService';


function ProfileSettings() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { Username, Email } = useSelector(state => state.auth);

    const LogoutConfirm = () => {
        handleLogout(dispatch, navigate)
    }



    return (

        <div className="items-center justify-center w-full space-y-10 max-lg:justify-around max-lg:space-x-4 lg:w-3/12 max-lg:flex">
            <div className="flex flex-col items-center justify-center">
                <div className="flex items-center text-5xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-24 lg:h-24 text-custom-dark-orange bg-[#213343]">{Username ? Username[0] : 'U'}</div>
                <div className="flex flex-col items-center justify-center mt-4 max-lg:text-sm ">
                    <span className="font-semibold ">{Username}</span>
                    <span className=" max-lg:text-xs">{Email}</span>
                </div>
            </div>


            <div className="flex flex-col max-lg:text-sm items-center justify-center 2xl:px-10 px-6 text-center py-6 2xl:py-10 space-y-3 bg-[#F8F8F8]">
                <h6 className="font-semibold ">Your Credits:</h6>
                <p className="">Content Generation: 4500 words</p>
                <p className="">Plagiarism checker: 8500 words</p>
                <p className=" text-[#8C8888]">Renews: 29 Oct 2025</p>

                <div className="flex justify-between w-full ">
                    <p className="underline cursor-pointer text-custom-dark-orange decoration-custom-dark-orange ">Plan Details</p>
                    <p className="underline cursor-pointer text-custom-dark-orange decoration-custom-dark-orange ">Buy Addons</p>
                </div>
            </div>


            <div className="flex flex-col justify-center px-8 space-y-2 max-lg:hidden">
                <Link to='#' className="flex items-center "><GoTriangleRight className='lg:text-2xl ' /><span className="text-sm lg:text-lg ">Profile Settings</span></Link>
                <Link to='#' className="flex items-center"><GoTriangleRight className='lg:text-2xl' /><span className="text-sm lg:text-lg ">Plan Details</span></Link>
                <Link to='#' className="flex items-center"><GoTriangleRight className='lg:text-2xl' /><span className="text-sm lg:text-lg ">Billing</span></Link>
                <Link to='#' className="flex items-center"><GoTriangleRight className='lg:text-2xl' /><span className="text-sm lg:text-lg ">Help</span></Link>
                <span onClick={LogoutConfirm} className="flex items-center cursor-pointer"><GoTriangleRight className='lg:text-2xl' /><span className="lg:text-lg text-sm  text-[#EB1E1E]">Logout</span></span>
            </div>
        </div>
    )
}

export default ProfileSettings