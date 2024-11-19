import React from 'react'
import { RxCross2 } from "react-icons/rx";
import { Navigate, useNavigate } from 'react-router-dom';



function Popup({ message, actionLabel, cancelLabel, ShowPopUp, isButtons = true, actionLink }) {
    const navigate = useNavigate()

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
            <div className="flex relative items-center justify-center w-[350px] sm:w-[600px] py-10 sm:py-16 rounded-lg shadow-lg bg-custom-dark">
                <span onClick={() => ShowPopUp(false)} className="absolute p-1 text-2xl text-white cursor-pointer top-1 right-1 hover:bg-slate-500 rounded-2xl"><RxCross2 /></span>
                <div className="flex flex-col items-center justify-center px-6 ">
                    <span className="text-xl text-center text-white sm:text-2xl ">{message}</span>
                    {isButtons && (<div className="flex justify-center space-x-10 w-full px-6 mt-10 ">
                        <button onClick={() => ShowPopUp(false)} className="px-4 py-1 text-lg text-white rounded-md sm:px-6 sm:py-2 bg-slate-400">{cancelLabel}</button>

                        <button onClick={() => navigate(`${actionLink}`)} className="px-4 py-1 text-lg text-white rounded-md sm:px-6 sm:py-2 bg-custom-dark-orange">{actionLabel}</button>
                    </div>)}
                    {!isButtons && (
                        <div className="flex items-center justify-center w-full mt-4 ">
                            <button onClick={() => ShowPopUp(false)} className="flex items-center justify-center w-24 h-10 text-lg text-white duration-150 rounded-md hover:bg-slate-400 sm:px-6 sm:py-2 bg-slate-500">ok</button>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default Popup