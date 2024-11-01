import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import Lottie from 'lottie-react';
import animationData from '../assets/LottieFiles/GreyTick.json'
import { LuMoveRight } from "react-icons/lu";
import { Link } from 'react-router-dom';




function PaymentSuccessPage() {
    const { width, height } = useWindowSize();
    return (

        <div className="z-10 flex items-center justify-center w-full h-screen bg-custom-dark">

            <Confetti width={width} height={height} numberOfPieces={30} gravity={0.05} />


            <div className="z-50 flex flex-col items-center justify-center p-20 rounded-2xl opacity-90 ">

                <div className="h-[300px] ">
                    <Lottie animationData={animationData} className="w-full h-full" />
                </div>

                <div className="flex flex-col items-center justify-center -mt-7 ">

                    <h3 className="text-5xl text-white ">Thank you!</h3>
                    <h3 className="mt-8 text-4xl font-semibold text-center text-white ">Your payment was successfully processed!</h3>
                    <Link to='/'>
                    <button className="flex items-center justify-center px-6 py-2 mt-4 text-white duration-150 rounded-lg group hover:bg-slate-700">back to home page  <LuMoveRight className="mt-1 text-lg transition-transform duration-300 translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-3" /> </button>
                    </Link>
                    {/* <LuMoveRight className="ml-2 text-lg transition-transform duration-200 translate-x-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-1" /> */}
                </div>

              
            </div>
        </div>
    )
}

export default PaymentSuccessPage