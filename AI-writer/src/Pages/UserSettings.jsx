import React,{useState, useRef} from 'react'
import { GoTriangleRight } from "react-icons/go";
import { Link } from 'react-router-dom';
import { LiaEditSolid } from "react-icons/lia";
import Navbar from '../Components/Navbar/Navbar';


function UserSettings() {
    const emailRef = useRef()
    const [IsEmailEditable, setIsEmailEditable] = useState(false)
    const Username = 'Richard'

    const HandleEmailEditable =()=>{
        setIsEmailEditable(true)
        if(emailRef.current){
            emailRef.current.focus();
        }
    }
    return (

        <>

            <div className="flex items-center justify-center w-full mt-24 font-poppins">


                <div className="w-11/12 lg:flex lg:space-x-12 ">

                    {/* this is navigation for the mobile screen */}
                    <div className="flex items-center justify-center w-full px-2 py-2 my-4 space-x-2 lg:hidden bg-red-50 ">
                        <Link to='#' className="flex items-center "><span className="text-sm lg:text-lg ">Profile Settings</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Plan Details</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Billing</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Help</span></Link>
                        <Link to='#' className="flex items-center"><span className="lg:text-lg text-sm  text-[#EB1E1E]">Logout</span></Link>
                    </div>


                    <div className="items-center justify-center w-full space-y-10 max-lg:justify-around max-lg:space-x-4 lg:w-3/12 max-lg:flex">


                        <div className="flex flex-col items-center justify-center">
                            <div className="flex items-center text-5xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-24 lg:h-24 text-custom-dark-orange bg-[#213343]">{Username ? Username[0] : 'U'}</div>
                            <div className="flex flex-col items-center justify-center mt-4 max-lg:text-sm ">
                                <span className="font-semibold ">{Username}</span>
                                <span className=" max-lg:text-xs">richardpaulson22@gmail.com</span>
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
                            <Link to='#' className="flex items-center"><GoTriangleRight className='lg:text-2xl' /><span className="lg:text-lg text-sm  text-[#EB1E1E]">Logout</span></Link>
                        </div>
                    </div>



                    <div className="lg:w-9/12 max-lg:mt-6 ">
                        <div className=" border rounded-2xl border-[#CBCBCB] px-6  lg:px-12 py-16 ">

                            <>
                                <h5 className="text-xl font-semibold lg:text-2xl">Account Information</h5>
                                <h6 className="mt-2 lg:text-lg">These details will be used to login to your account.</h6>
                            </>

                            <div className="mt-10 space-y-10 lg:mt-16">
                                <div className="flex space-x-6 ">
                                   
                                    <input ref={emailRef} type="text" value='b.davidson@northfalcon.com' disabled={!IsEmailEditable} className="w-1/2 pb-2 bg-transparent border-b-2 outline-none focus:border-opacity-65 border-opacity-35 border-slate-500" />
                                   
                                    <div className="flex w-1/2 space-x-8">
                                        <button onClick={HandleEmailEditable} className="flex items-center justify-center w-24 py-1 font-semibold text-white rounded-md bg-custom-dark-orange "><LiaEditSolid className='mr-1 text-lg lg:text-2xl' /><span className="">Edit</span></button>
                                        <button className="flex items-center justify-center w-24 py-1 font-semibold text-white rounded-md bg-[#213343] ">Save</button>
                                    </div>
                                </div>
                                <div className="flex space-x-2 lg:space-x-6">
                                    <input type="text" placeholder='New password' className="w-1/2 pb-2 border-b-2 outline-none focus:border-opacity-65 border-opacity-35 border-slate-500" />
                                    <input type="text" placeholder='Confirm password' className="w-1/2 pb-2 border-b-2 outline-none focus:border-opacity-65 border-opacity-35 border-slate-500" />

                                </div>
                                <button className="bg-[#213343] font-semibold text-white w-48 py-1.5 rounded-md text-nowrap">Change Password</button>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default UserSettings