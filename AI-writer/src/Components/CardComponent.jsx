import React from 'react'
import { Link } from 'react-router-dom';


function CardComponent({ title, description, buttonText, LinkTo, FunctionToCall, buttonAction, footer }) {

    return (
        <div className="relative w-full px-6 py-5 space-y-3 border border-black cursor-pointer rounded-xl xl:px-8 xl:py-6 2xl:py-8 xl:space-y-6 border-opacity-30">
            <h5 className="text-xl font-semibold xl:text-2xl ">{title}</h5>

            <div className="flex flex-col h-[90px] sm:h-[102px] xl:h-[112px]   2xl:h-[100px] max-md:text-sm xl:text-lg ">
                {description.map((feature, index) => (
                    <span key={index} className=" text-custom-black-text">{feature}</span>
                ))}
            </div>

            <div className="">
                <Link to={LinkTo} className="px-4 py-1.5 text-center text-white rounded-md max-xl:text-sm sm:py-2 sm:px-6 2xl:py-2.5 hover:bg-hover-button-color bg-custom-dark-orange">{buttonText}</Link>
            </div>
            {/* <h6 className="max-xl:text-sm">{footer}</h6> */}
        </div>
    )
}

export default CardComponent