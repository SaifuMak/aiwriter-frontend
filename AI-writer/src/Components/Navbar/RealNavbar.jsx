import React, { useState, useRef,useEffect } from 'react'
import CompleteLogo from '../../assets/Logo/CompleteLogo'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../Utils/AuthService';
import { useSelector } from 'react-redux';
import user from '../../assets/Images/user.png'
import { RiArrowDropDownLine } from "react-icons/ri";


function RealNavbar({ isFullWidth = false, isDashboard = true }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const options = ['Home', 'Settings', 'Plan details', 'Logout']
    const { IsAuthenticated, Username } = useSelector(state => state.auth);
    const [IsNavbarMenu, setIsNavbarMenu] = useState(false)
    const dropdownref = useRef()

    const LogoutConfirm = () => {
        handleLogout(dispatch, navigate)

    }

    const handleToggleDropdown = () => {
        setIsNavbarMenu(!IsNavbarMenu)
    }

    useEffect(() => {

        const handleCloseDropdown = (e) => {
            if (dropdownref.current &&
                !dropdownref.current.contains(e.target)) {
                setSortByDropdown(false);

            }
        }

        document.addEventListener('mousedown', handleCloseDropdown)
        return () => document.removeEventListener('mousedown', handleCloseDropdown)

    }, [])


    return (
        <div className="flex items-center justify-center w-full py-3 sm:px-10 bg-[#14212C]">
            <div className={`flex items-center justify-between ${isFullWidth ? 'w-full' : 'w-11/12'}  `}>
                <div className="flex items-center justify-center ">

                    <div className="w-32 max-sm:hidden xl:w-44">
                        <Link to='/' className='cursor-pointer '>
                            <CompleteLogo />
                        </Link>
                    </div>
                    {isDashboard && (<div className="flex items-center justify-center ml-6 cursor-pointer group ">
                        <span className="transition-transform duration-300 ease-in-out text-custom-dark-orange group-hover:-translate-x-1"><IoIosArrowBack /></span>


                        <Link to='/' className='cursor-pointer '>
                            <span className="text-white ">Back to dashboard</span>
                        </Link>
                    </div>)}
                </div>

                {IsAuthenticated ? (
                    <>
                        <div ref={dropdownref} onClick={handleToggleDropdown} className="relative flex justify-center group ">
                            {/* <h6 className="text-xl text-white capitalize">{Username ? Username : 'User'}</h6> */}
                            <div className="flex cursor-pointer  items-center justify-center shadow-custom-dark-orange border-2   w-10 h-10 rounded-full text-xl text-custom-dark-orange bg-[#213343]">
                                <img src={user} alt="" className="w-full h-full rounded-full bg-slate-200" />
                            </div>
                            <span className="absolute -bottom-1 left-9 "><RiArrowDropDownLine className='text-3xl text-white ' /></span>

                        </div>
                        {IsNavbarMenu && (<ul className={`absolute  right-2 py-2     z-10  top-[66px] shadow-2xl  mt-1 overflow-auto  bg-white    rounded-md  w-[150px]  scrollbar-hide`}>
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`block text-nowrap px-2 hover:text-custom-dark-orange duration-150  text-lg cursor-pointer mt-1  hover:bg-slate-50  `}

                                >
                                    {option}
                                </li>
                            ))}
                        </ul>)}
                    </>

                ) : (
                    <button onClick={LogoutConfirm} className="w-24 h-8 font-bold text-custom-dark hover:bg-gradient-to-r hover:from-orange-300 hover:to-orange-500 bg-custom-dark-orange rounded-2xl">Logout</button>
                )}

                {/* {IsAuthenticated &&  <button onClick={LogoutConfirm} className="w-24 h-8 font-bold text-custom-dark hover:bg-gradient-to-r hover:from-orange-300 hover:to-orange-500 bg-custom-dark-orange rounded-2xl">Logout</button>} */}
            </div>
        </div>
    )
}


export default RealNavbar