import React from 'react'
import { GoAlert } from "react-icons/go";



function SessionExpiredPopup() {

    return (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="flex flex-col relative items-center justify-center w-[350px] sm:w-[550px] py-8 sm:py-12 rounded-lg shadow-lg bg-custom-dark">

                <div className="flex justify-center w-8/12 ">

                    {/* <div className="flex items-center justify-center w-10 h-10 p-2 rounded-full shrink-0 opacity-95 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500"><GoAlert className='text-2xl font-bold shrink-0 text-custom-dark-orange' /></div> */}
                    <GoAlert className='mt-1 text-2xl font-bold shrink-0 text-custom-dark-orange' />

                    <div className="flex flex-col items-center justify-center ml-2 ">
                        <h2 className="text-2xl font-semibold text-nowrap text-slate-200 ">Your session has expired</h2>
                        <h6 className="mt-1 text-slate-300">please log in to continue </h6>
                    </div>
                    

                </div>
                <div className="flex items-center justify-center w-8/12 mt-5 ">
                    <button className="px-10 py-1.5  rounded-md bg-gradient-to-r from-slate-500 via-slate-600 to-slate-500 text-slate-100">Login</button>
                </div>



            </div>
        </div>

    )
}

export default SessionExpiredPopup