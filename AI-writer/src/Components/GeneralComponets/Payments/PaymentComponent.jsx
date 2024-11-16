import React from 'react'
import stripeImg from '../../../assets/Images/stripe.png'
import paypalImg from '../../../assets/Images/paypal.png'
import { LuLoader2 } from "react-icons/lu";
import {useSelector} from 'react-redux';





function PaymentComponent({ HandleSelectedPaymentOption, selectedPaymentMethod, HandlePayment, IsLoading,isBorder=true }) {

    const { IsAuthenticated} = useSelector(state => state.auth);

    return (
        <div className={`flex flex-col items-center justify-center w-full px-8  mt-16 space-y-10  ${isBorder ? 'border border-slate-300 py-16' : ''} rounded-lg `}>
            <div className="flex flex-col items-center justify-center space-y-8 ">
                <h2 className="text-2xl font-semibold ">Payment</h2>

                <div className="items-center justify-center max-lg:w-full max-lg:space-y-4 lg:space-x-8 lg:flex ">
                    <button onClick={() => HandleSelectedPaymentOption('STRIPE')} className={`flex items-center justify-center max-lg:w-[200px] lg:px-8 py-2 space-x-4 border rounded-lg ${selectedPaymentMethod === 'STRIPE' ? 'border-custom-dark-orange ' : 'border-[#B0B0B0]'} `} >
                        <span className="text-[#6366F1] font-semibold text-xl">Stripe</span>
                        <div className="w-9 h-9 ">
                            <img src={stripeImg} alt="" className="object-cover w-full h-full " />
                        </div>
                    </button>


                    <button onClick={() => HandleSelectedPaymentOption('PAYPAL')} className={`flex items-center justify-center max-lg:w-[200px] lg:px-8  py-2 space-x-4 border ${selectedPaymentMethod === 'PAYPAL' ? 'border-custom-dark-orange' : 'border-[#B0B0B0]'} rounded-lg border-[#B0B0B0]`}>
                        <span className="text-[#2563EB] font-semibold text-xl">Paypal</span>
                        <div className="w-9 h-9 ">
                            <img src={paypalImg} alt="" className="object-cover w-full h-full " />
                        </div>
                    </button>
                </div>

                {IsAuthenticated ? (
                    <button disabled={IsLoading} onClick={HandlePayment} className="bg-[#44AA55] flex  justify-center items-center text-lg rounded-md  text-white font-semibold  h-12 w-full"> {IsLoading ? <><span className="">Processing</span><LuLoader2 className='ml-2 text-2xl text-white animate-spin' /> </> : ' PAY'}</button>


                ) : (
                    <button disabled={IsLoading} onClick={HandlePayment} className="bg-[#44AA55] flex  justify-center items-center text-lg rounded-md  text-white font-semibold  h-12 w-full"> {IsLoading ? <><span className="">Processing</span><LuLoader2 className='ml-2 text-2xl text-white animate-spin' /> </> : 'SIGN UP & PAY'}</button>


                )}

            </div>
        </div>
    )
}

export default PaymentComponent