import React from 'react'
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { VscCheck } from "react-icons/vsc";
import SliderComponets from './SliderComponets';
import PlanCards from './PlanCards';
import { useEffect } from 'react';


function AccordianComponent({ HandlePlanSelection, selectedPlan, HandleArticleWordsForCustomPlan, CustomContentWords, HandlePlagiarismWordsForCustomPlan, CustomPlagiarisedWords, ShowPlanLists, IsCustomPlanSelected }) {
    const [expanded, setExpanded] = useState(false);
    const featuresLineStyle = 'text-sm text-center text-[#3E3E3E]  flex  space-x-1'



    const handleExpansion = (index) => (event, isExpanded) => {
        // setExpanded(isExpanded ? index : false);
        if (!isExpanded) {
            setExpanded(index); // Set the accordion to expanded only if it's not already expanded
        }
    };



    const PricePlans = {

        STARTER: {
            name: 'STARTER',
            price: '9',
            cardColor: '#D9E5F1',
            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },
        PROFESSIONAL: {
            name: 'PROFESSIONAL',
            price: '29',
            cardColor: '#FFEFE9',

            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },
        ENTERPRISE: {
            name: 'ENTERPRISE',
            price: '99',
            cardColor: '#FFF2C9',

            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },
        CUSTOM: {
            name: 'CUSTOM',
            price: '100',
            cardColor: '#FFF2C9',

            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },
    }

    useEffect(() => {

        console.log(selectedPlan, CustomContentWords, CustomPlagiarisedWords, ShowPlanLists, IsCustomPlanSelected)

        const selectedPlanIndex = Object.keys(PricePlans).indexOf(selectedPlan);
        console.log(selectedPlanIndex, 'this is the index of the selected  plan ')


        if (IsCustomPlanSelected) {
            setExpanded(0);
            return
        }

        if (selectedPlanIndex !== -1) {
            setExpanded(selectedPlanIndex);
            // handleExpansion(selectedPlanIndex)
        }




    }, [selectedPlan]);


    return (
        <>

            {Object.keys(PricePlans)
                .filter(plan => {
                    // Show the custom plan if custom is selected
                    if (IsCustomPlanSelected) {
                        return plan === 'CUSTOM';
                    }
                    // Otherwise, show other plans excluding custom
                    return plan !== 'CUSTOM';
                })
                .map((plan, index) => (
                    <div key={index} className="">

                        {ShowPlanLists || selectedPlan === PricePlans[plan].name ? (
                            <div className="mb-5 ">

                                <Accordion
                                    key={index}
                                    expanded={expanded === index}
                                    onChange={handleExpansion(index)}
                                    slotProps={{ transition: { timeout: 400 } }}
                                    style={{ border: expanded === index ? '0.5px solid #edede9' : '', borderRadius: '10px' }}

                                    sx={{
                                        boxShadow: "none",
                                        padding: "0px",
                                        margin: "0px",
                                        '&:before': {
                                            display: 'none',

                                        },
                                    }}

                                >
                                    <AccordionSummary

                                        // expandIcon={index === expanded ? 'plus' : 'minus'}

                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                        sx={{

                                            padding: "0px", // Remove padding
                                            margin: "0px", // Optionally, remove margin if needed
                                        }}
                                    >


                                        {/* <Typography style={{ fontWeight: index === expanded ? 600 : 400, font: '18px', color: '#4F4F4F' }} >{obj.question}</Typography> */}

                                        {(ShowPlanLists || PricePlans[plan].name === selectedPlan) && (

                                            <div key={plan} onClick={() => HandlePlanSelection(PricePlans[plan].name)} className={`w-full -mt-5  ${selectedPlan === PricePlans[plan].name ? 'rounded-t-md border-t ' : 'rounded-md'}   cursor-pointer `} style={{ backgroundColor: PricePlans[plan].cardColor }}>
                                                <div className={`flex items-center  px-3 py-5 xl:px-5 ${selectedPlan === PricePlans[plan].name ? ' justify-center' : 'justify-between'} `}>

                                                    {PricePlans[plan].name === selectedPlan ? (
                                                        <>
                                                            <span className={`flex mr-3  items-center border duration-100 border-custom-dark-orange justify-center  w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-custom-dark-orange`}>
                                                                <VscCheck className='-mt-1.5 -mr-1 text-xl' />
                                                            </span>
                                                            <h6 className="lg:font-semibold ">{PricePlans[plan].name}</h6>
                                                        </>

                                                    ) : (
                                                        <>

                                                            <span className={`flex max-lg:hidden shrink-0 items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-white`}></span>
                                                            <h6 className="lg:font-semibold ">{PricePlans[plan].name}</h6>
                                                            <p className=" text-[#808080] max-lg:text-sm"><span className="font-semibold text-custom-dark-orange">${PricePlans[plan].price}</span>/month</p>

                                                        </>
                                                    )}


                                                </div>
                                            </div>

                                        )}

                                    </AccordionSummary>

                                    <AccordionDetails
                                        sx={{
                                            padding: "0px", // Remove padding
                                            margin: "0px", // Optionally, remove margin if needed
                                        }}

                                    >
                                        <Typography>


                                            <div className='flex flex-col items-center justify-center pb-32 space-y-6 xl:space-y-8 rounded-b-xl '>
                                                {/* <div className="flex items-center justify-center w-full py-5 rounded-t-xl" style={{ backgroundColor: PricePlans[selectedPlan].cardColor }}>

                                        <span className={`flex mr-3  items-center border duration-500 border-custom-dark-orange justify-center  w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-custom-dark-orange`}>
                                            <VscCheck className='-mt-1.5 -mr-1 text-xl' />
                                        </span>

                                        <h6 className="font-semibold text-center ">{PricePlans[selectedPlan].name}</h6>
                                    </div> */}

                                                <div className="w-11/12 mt-10 space-y-4 ">
                                                    <h6 className="text-center text-[#808080] "><span className="text-3xl text-custom-dark-orange">${PricePlans[selectedPlan].price}</span>/month</h6>
                                                    <p className="text-center text-[#808080] text-sm ">(Charged monthly)</p>

                                                    {IsCustomPlanSelected && (<div className="pt-4 space-y-7 ">
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


                                                    {IsCustomPlanSelected && (<div className="pt-5 space-y-7 ">
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
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ) : null}
                    </div>

                ))}







        </>
    )
}

export default AccordianComponent