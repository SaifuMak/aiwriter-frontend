import React from 'react'
import { RxCross2 } from "react-icons/rx";


function AlertPopUp({handleIgnoreContinue,HandleClosePopUp}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
            <div className="flex relative items-center justify-center w-[350px] sm:w-[600px] py-10 sm:py-16 rounded-lg shadow-lg bg-custom-dark">
                <span onClick={HandleClosePopUp} className="absolute p-1 text-2xl text-white cursor-pointer top-1 right-1 hover:bg-slate-500 rounded-2xl"><RxCross2 /></span>
                <div className="flex flex-col items-center justify-center px-6 ">
                    <span className="text-xl text-center text-white sm:text-2xl ">Your word quota would be reduced. Do you wish to continue?</span>
                    <div className="flex justify-around w-full px-6 mt-10 ">
                        <button onClick={HandleClosePopUp} className="px-4 py-1 text-lg text-white rounded-md sm:px-6 sm:py-2 bg-slate-400">Cancel</button>

                        <button onClick={handleIgnoreContinue} className="px-4 py-1 text-lg text-white rounded-md sm:px-6 sm:py-2 bg-custom-dark-orange">Continue</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AlertPopUp