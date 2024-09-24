import React from 'react'
import ButtonComponent from './SmallComponents/ButtonComponent';
import { useSelector } from 'react-redux';


function GenerateOutline({ GenerateOutlines,Label }) {
    const { currentStep,selectedHeadline } = useSelector((state) => state.articleGeneration);

    return (

        <div className="w-full px-4 py-10 lg:tracking-wide max-lg:text-sm lg:w-11/12 xl:px-16 space-y-7 ">
            <div className="flex justify-between">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Article Summary</h2>
            </div>
            <div className="">
                <h6 className="text-lg font-medium ">Title selected:</h6>
                <div className="w-full px-2 lg:px-6 py-2.5    mt-1 border rounded-md border-opacity-80 border-custom-dark-orange">
                    <span className="text-base ">{selectedHeadline}</span>
                </div>
            </div>
            <div className="">
                <h6 className="text-lg ">Article Structure:</h6>
                <p className=" mt-1 text-[#858585] text-sm">Now, Let’s generate the basic structure for the article/blog post </p>
                <div className="mt-5 ">
                <ButtonComponent
                    onClick={GenerateOutlines}
                    label={Label}
                    isVisible={currentStep === 4}
                />
                </div>
            </div>
        </div>
    )
}


export default GenerateOutline