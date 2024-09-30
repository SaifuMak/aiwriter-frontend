import React from 'react'
import { Link } from 'react-router-dom';
import { VscCheck } from "react-icons/vsc";



function SelectionCard({ title, description,setSelectedArticleWriter,isSelected, buttonText, LinkTo, FunctionToCall, buttonAction, footer }) {
     
    const HandleArticleSelection =(LinkTo)=>{
        setSelectedArticleWriter(LinkTo)
     }


    return (
        <div onClick={()=>HandleArticleSelection(LinkTo)} className="flex w-full px-4 py-4 space-x-2 space-y-3 border border-black cursor-pointer rounded-xl xl:px-4 2xl:px-8 xl:py-6 2xl:py-8 xl:space-y-6 border-opacity-30">
            <div className="py-5 xl:py-6 ">
                <div className="relative xl:p-1.5     ">
                   {isSelected &&<VscCheck className='absolute -top-0.5 -right-0.5 duration-500 xl:text-xl xl:top-1 xl:right-1 ' /> } 
                    <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${isSelected ? 'bg-custom-dark-orange': 'bg-transparent'} `} ></span>
                </div>
            </div>

            <div className="">
                <h5 className="text-xl font-semibold xl:text-2xl ">{title}</h5>

                <div className="flex flex-col h-[90px] justify-center sm:h-[102px] xl:h-[112px] max-xl:mt-2   2xl:h-[100px] max-md:text-sm xl:text-lg ">
                    {description.map((feature, index) => (
                        <span key={index} className=" text-custom-black-text">{feature}</span>
                    ))}
                </div>
                <div className="mt-4">
                    <span className="font-medium  max-lg:text-sm xl:text-lg">{footer}</span>
                </div>

                {/* <div className="">
                    <Link to={LinkTo} className="px-4 py-1.5 text-center text-white rounded-md max-xl:text-sm sm:py-2 sm:px-6 2xl:py-2.5 hover:bg-hover-button-color bg-custom-dark-orange">{buttonText}</Link>
                 
                </div> */}
            </div>
            {/* <h6 className="max-xl:text-sm">{footer}</h6> */}
        </div>
    )
}

export default SelectionCard