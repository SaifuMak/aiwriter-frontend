import React from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import { Link } from 'react-router-dom'
import ProfileSettings from '../Components/Profile/ProfileSettings'
import { Toaster, toast } from 'sonner';




function PaymentandBillingInfo() {

    return (

        <>

            <AdminNavbar />


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

                    <ProfileSettings />

                    <div className="lg:w-9/12 max-lg:mt-6 ">
                        <div className="p-8 space-y-10 border rounded-lg border-slate-300">
                            <div className="flex justify-between ">
                                <div className="">
                                    <h6 className="text-xl font-semibold ">Your Plan:Starter</h6>
                                    <p className="text-[#808080] text-xl"><span className=" text-custom-dark-orange">$9</span>/month</p>
                                </div>
                                <div className="">
                                    <h6 className="text-xl font-semibold">Renewal Date:</h6>
                                    <p className="text-[#808080] text-lg">28 October 2025</p>
                                </div>
                                <div className="">
                                    <button className="px-4 py-1.5 font-semibold text-white rounded-md bg-custom-dark-orange">UPGRADE NOW</button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between ">
                                <div className="">
                                    <h6 className="text-lg font-semibold ">Plan Details:</h6>
                                    <div className="flex">
                                    <p className="text-lg ">Content Generation:  <span className="text-custom-dark-orange">15,000 words</span></p>
                                    <span className="ml-1 mr-2">,</span>
                                    <p className="text-lg ">Content Generation: <span className="text-custom-dark-orange">15,000 words</span></p>
                                    </div>
                                </div>

                               
                                <div className="">
                                    <Link to='#'><span className="text-lg underline text-custom-dark-orange">Buy Addons</span></Link>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
            <Toaster />


        </>
    )
}

export default PaymentandBillingInfo