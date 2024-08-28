import React from 'react'
import { Link } from 'react-router-dom';


function ArticleCard({ title, description, buttonText, buttonAction, footer }) {
    return (
        <div className="w-full p-5 space-y-3 border rounded-md shadow-xl cursor-pointer xl:p-8 xl:space-y-6 border-custom-dark-orange border-opacity-40">
            <h5 className="text-xl font-semibold xl:text-2xl ">{title}</h5>
           
            <div className="flex flex-col max-xl:text-sm ">
                {description.map((feature, index)=>(
                    <span key={index} className=" text-custom-black-text">{feature}</span>
                ))}
            </div>

             <div className="">
            <Link to='/article-generation' className="px-10 py-1 text-center text-white rounded-md max-xl:text-sm xl:py-2 xl:px-16 hover:bg-hover-button-color bg-custom-dark-orange">{buttonText}</Link>
            </div>
            <h6 className="max-xl:text-sm">{footer}</h6>
        </div>
    )
}

export default ArticleCard