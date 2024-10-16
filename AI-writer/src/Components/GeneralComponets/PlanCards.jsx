import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";
import SliderComponets from './SliderComponets';



function PlanCards({IsCustomPlanSelected, selectedPlan, PricePlans, HandleArticleWordsForCustomPlan, CustomContentWords, HandlePlagiarismWordsForCustomPlan, CustomPlagiarisedWords }) {
    const featuresLineStyle = 'text-sm text-center text-[#3E3E3E]  flex  space-x-1'

   


    
    return (

        <div className='flex flex-col items-center justify-center pb-32 space-y-6 border xl:space-y-8 rounded-xl border-slate-300'>
            <div className="flex items-center justify-center w-full py-5 rounded-t-xl" style={{ backgroundColor: PricePlans[selectedPlan].cardColor }}>

                <span className={`flex mr-3  items-center border duration-500 border-custom-dark-orange justify-center  w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-custom-dark-orange`}>
                    <VscCheck className='-mt-1.5 -mr-1 text-xl' />
                </span>

                <h6 className="font-semibold text-center ">{PricePlans[selectedPlan].name}</h6>
            </div>

          <div className="w-11/12 space-y-4 ">
                <h6 className="text-center text-[#808080] "><span className="text-3xl text-custom-dark-orange">${PricePlans[selectedPlan].price}</span>/month</h6>
                <p className="text-center text-[#808080] text-sm ">(Charged monthly)</p>

                {IsCustomPlanSelected && (    <div className="pt-4 space-y-7 ">
                    <h5 className="text-center ">Content Generation:</h5>
                    <div className="relative flex items-center justify-center w-full px-10 ">

                        <div className="absolute flex justify-between w-full px-10 -mt-6 ">
                            <span className="text-xs ">10,000</span>
                            <span className="text-xs ">3,00,000</span>

                        </div>
                        <SliderComponets
                            Handlefunction={HandleArticleWordsForCustomPlan}
                            WordsCount={CustomContentWords}
                        />
                    </div>
                </div>)}

                {IsCustomPlanSelected && (    <div className="pt-5 space-y-7 ">
                    <h5 className="text-center ">Plagiarism checker:</h5>
                    <div className="relative flex items-center justify-center w-full px-10 ">

                        <div className="absolute flex justify-between w-full px-10 -mt-6 ">
                            <span className="text-xs ">15,000</span>
                            <span className="text-xs ">3,00,000</span>

                        </div>
                        <SliderComponets
                            Handlefunction={HandlePlagiarismWordsForCustomPlan}
                            WordsCount={CustomPlagiarisedWords}
                        />
                    </div>
                </div>)}


                <div className="w-full border-b pt-2 border-[#CFCFCF]"></div>
            </div>



            <div className="flex flex-col w-9/12 space-y-3">
                <h6 className="font-semibold text-center ">Plan Details</h6>
                {PricePlans[selectedPlan].details.map((details, index) => (
                    <div className={featuresLineStyle}><VscCheck className='font-semibold shrink-0 mt-1 text-[#44AA55]' /><p className="">{details}</p></div>
                ))}
            </div>
        </div>
    )
}

export default PlanCards