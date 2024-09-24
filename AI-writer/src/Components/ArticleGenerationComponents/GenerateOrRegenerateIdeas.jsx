import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from './SmallComponents/ButtonComponent';
import { setSelectedHeadline } from '../../Redux/Slices/ArticleGenerationSlice'

import { countWords, countCharacters } from '../../Utils/Helperfunctions'



function GenerateOrRegenerateIdeas({ GenerateHeadlines,handleOutlineGeneration,showPopupAndCallAPI }) {



    const dispatch = useDispatch()

    const { headlines, currentStep, selectedHeadline } = useSelector((state) => state.articleGeneration);

    const [SelectedOutline, setSelectedOutline] = useState('')

    const handleSelectedheadline = (headline) => {
        dispatch(setSelectedHeadline(headline))
    }




    return (
        <div className="w-full px-4 py-10 xl:px-16 space-y-7 ">
            <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose a Headline for your Article</h2>

            {headlines.map((data, index) => (
                <div onClick={() => handleSelectedheadline(data)} key={index} className={`w-full cursor-pointer max-xl:items-center flex ${selectedHeadline === data ? ' bg-custom-lighter-orange' : 'bg-white'}  py-4 lg:py-8 px-4 space-x-4 duration-150  rounded-md hover:shadow-xl shadow-lg`}>

                    <div className="relative xl:p-1.5 ">
                        {selectedHeadline === data && (<VscCheck className='absolute duration-500 -top-0.5 -right-0.5  xl:text-xl xl:top-1 xl:right-1 ' />)}
                        <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedHeadline === data ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                    </div>


                    <div className="">
                        <h2 className="mb-2 text-sm font-semibold lg:mb-4 lg:text-base">{data}</h2>
                        <span className=" text-sm  lg:text-base text-[#7D7D7D] ">{countWords(data)} words / {countCharacters(data)} characters</span>
                    </div>
                </div>))}

            <div className="flex justify-between w-full pt-10 ">
              
                <ButtonComponent
                    onClick={()=>showPopupAndCallAPI(GenerateHeadlines)}
                    label="Regenerate Ideas"
                    isVisible={currentStep === 3}
                    isIcon={true}
                    color='#3A3937'
                />
                
                <ButtonComponent
                    onClick={handleOutlineGeneration}
                    label="Next"
                    isVisible={currentStep === 3}
                />

                {/* <button className="px-4 py-2 tracking-wider text-white rounded-md max-sm:text-sm bg-custom-dark-orange">Regenerate Ideas</button> */}
            </div>
        </div>
    )
}

export default GenerateOrRegenerateIdeas