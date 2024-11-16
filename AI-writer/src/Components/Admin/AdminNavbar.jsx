import React from 'react'
import CompleteLogo from '../../assets/Logo/CompleteLogo'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleLogout } from '../../Utils/AuthService';
import { useSelector } from 'react-redux';



function AdminNavbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { IsAuthenticated } = useSelector(state => state.auth);

 
    const LogoutConfirm =()=>{
        handleLogout(dispatch,navigate)

    }


    return (
        <div className="flex items-center justify-center w-full py-3 sm:px-10 bg-custom-dark">
            <div className='flex items-center justify-between w-11/12 '>
                <div className="flex items-center justify-center ">

                    <div className="w-32 max-sm:hidden xl:w-44">
                        <Link to='/' className='cursor-pointer '>
                            <CompleteLogo />
                        </Link>
                    </div>
                    <div className="flex items-center justify-center ml-6 cursor-pointer group ">
                        <span className="transition-transform duration-300 ease-in-out text-custom-dark-orange group-hover:-translate-x-1"><IoIosArrowBack /></span>


                        <Link to='/' className='cursor-pointer '>
                        <span className="text-white ">Back to dashboard</span>
                        </Link>


                    </div>
                </div>

              {IsAuthenticated &&  <button onClick={LogoutConfirm} className="w-24 h-8 font-bold text-custom-dark hover:bg-gradient-to-r hover:from-orange-300 hover:to-orange-500 bg-custom-dark-orange rounded-2xl">Logout</button>}
            </div>
        </div>
    )
}


export default AdminNavbar