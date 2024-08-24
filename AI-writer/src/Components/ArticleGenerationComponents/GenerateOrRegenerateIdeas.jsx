import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";


function GenerateOrRegenerateIdeas() {
    const [SelectedOutline, setSelectedOutline] = useState('')

    const HandleOutline = (outline) => {
        setSelectedOutline(outline)
    }


    const DummyData = [
        {
            title: "Unlocking Growth: The Crucial Importance of SEO for Small Businesses",
            words: 550,
            characters: 3200,
        },
        {
            title: "Maximizing Online Presence: Why SEO Matters for Local Businesses",
            words: 600,
            characters: 3400,
        },
        {
            title: "SEO Strategies: How Small Businesses Can Compete with Big Brands",
            words: 530,
            characters: 3100,
        },
        {
            title: "The Power of SEO: Driving Traffic and Sales for Small Businesses",
            words: 580,
            characters: 3300,
        },
        {
            title: "Why Every Small Business Needs SEO to Thrive in a Digital World",
            words: 610,
            characters: 3500,
        },

    ];


    return (
        <div className="w-full px-4 py-10 xl:px-16 space-y-7 ">
            <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose a Headline for your Article</h2>

            {DummyData.map((data, index) => (
                <div onClick={() => HandleOutline(index)} key={index} className={`w-full cursor-pointer max-xl:items-center flex ${SelectedOutline === index ? ' bg-custom-lighter-orange' : 'bg-white'}  py-4 lg:py-8 px-4 space-x-4 duration-150  rounded-md hover:shadow-xl shadow-lg`}>

                    <div className="relative xl:p-1.5 ">
                        {SelectedOutline === index && (<VscCheck className='absolute duration-500 -top-0.5 -right-0.5  xl:text-xl xl:top-1 xl:right-1 ' />)}
                        <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${SelectedOutline === index ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                    </div>

                    <div className="">
                        <h2 className="mb-2 text-sm font-semibold lg:mb-4 lg:text-base">{data.title}</h2>
                        <span className=" text-sm  lg:text-base text-[#7D7D7D] ">{data.words} words / {data.characters} characters</span>
                    </div>
                </div>))}

                <div className="flex justify-center w-full pt-6 ">
                    <button className="px-4 py-2 tracking-wider text-white rounded-md max-sm:text-sm bg-custom-dark-orange">Regenerate Ideas</button>
                </div>
        </div>
    )
}

export default GenerateOrRegenerateIdeas