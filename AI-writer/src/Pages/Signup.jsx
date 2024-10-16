import React, { useState } from 'react'
import InputBox from '../Components/ArticleGenerationComponents/SmallComponents/InputBox'
import stripeImg from '../assets/Images/stripe.png'
import paypalImg from '../assets/Images/paypal.png'
import DropDown from '../Components/ArticleGenerationComponents/SmallComponents/DropDown'
import { countries } from 'countries-list';
import { VscCheck } from "react-icons/vsc";

import PlanCards from '../Components/GeneralComponets/PlanCards'


function Signup() {
    const [IsCountyDropdownOpened, setIsCountyDropdownOpened] = useState(false)
    const [SelectedCountry, setSelectedCountry] = useState('')
    const [selectedPlan, setselectedPlan] = useState('STARTER')
    const [selectedPreviousPlan, setselectedPreviousPlan] = useState('STARTER')

    const [ShowPlanLists, setShowPlanLists] = useState(false)
    const [CustomContentWords, setCustomContentWords] = useState(150000)
    const [CustomPlagiarisedWords, setCustomPlagiarisedWords] = useState(180000)
    const [IsCustomPlanSelected, setIsCustomPlanSelected] = useState(false)

    const OuterContainerInputBoxStyle = 'flex items-end w-full space-x-10'


    
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


    const countryNames = Object.values(countries).map(country => country.name).sort((a, b) => a.localeCompare(b)); // Sort alphabetically;

    const HandleArticleWordsForCustomPlan = (event, newValue) => {

        if (newValue < 150000) {
            setCustomContentWords(150000); // Set to minimum value
        } else {
            setCustomContentWords(newValue); // Update state with the new value
        }

    }

    const HandlePlagiarismWordsForCustomPlan = (event, newValue) => {

        if (newValue < 180000) {
            setCustomPlagiarisedWords(180000); // Set to minimum value
        } else {
            setCustomPlagiarisedWords(newValue); // Update state with the new value
        }

    }


    const HandleCountrydropdown = () => {
        setIsCountyDropdownOpened(!IsCountyDropdownOpened)
    }


    const HandleCountrySelection = (option) => {
        setSelectedCountry(option)
        setIsCountyDropdownOpened(false)
    }

    const ShowPlans = () => {
        setShowPlanLists(true)
    }

    const HandlePlanSelection = (plan) => {
        setselectedPlan(plan)
    }

    const CustomPlanEnabled = ()=>{
        setselectedPreviousPlan(selectedPlan)
        setIsCustomPlanSelected(true)
        setselectedPlan('CUSTOM')

    }

    const CustomPlanDisabled = ()=>{
        setselectedPlan(selectedPreviousPlan)
        setIsCustomPlanSelected(false)
    }


    
    return (
        <div className="flex items-center justify-center pb-20 font-poppins">
            <div className="flex py-10 mt-10 max-md:flex-col max-md:justify-center max-md:items-center xl:w-11/12 2xl:w-10/12 md:space-x-6 xl:space-x-16 2xl:space-x-28 max-xl:px-10 ">

                <div className="w-full max-md:justify-center max-md:flex-col max-md:items-center max-md:px-10 md:mt-10 md:w-3/12 ">
                    <h3 className="mb-4 text-2xl text-center ">You are subscribing for:</h3>
                 
                 
                    <PlanCards
                        PricePlans={PricePlans}
                        selectedPlan={selectedPlan}
                        HandleArticleWordsForCustomPlan={HandleArticleWordsForCustomPlan}
                        CustomContentWords={CustomContentWords}
                        HandlePlagiarismWordsForCustomPlan={HandlePlagiarismWordsForCustomPlan}
                        CustomPlagiarisedWords={CustomPlagiarisedWords}
                        IsCustomPlanSelected={IsCustomPlanSelected}

                    />

                    {!ShowPlanLists && (<div className="px-6 ">
                        <button onClick={ShowPlans} className="w-full py-2 mt-5 font-semibold text-white rounded-md bg-custom-dark-orange">CHOOSE ANOTHER PLAN</button>
                    </div>)}



                    {(ShowPlanLists && !IsCustomPlanSelected) &&  (
                        <>
                            {Object.keys(PricePlans).filter((plan) => plan !== selectedPlan && plan !== 'CUSTOM' ).map((plan) => (
                                <div key={plan} onClick={() => HandlePlanSelection(PricePlans[plan].name)} className="mt-5 rounded-md cursor-pointer " style={{ backgroundColor: PricePlans[plan].cardColor }}>
                                    <div className="flex items-center justify-between px-3 py-5 xl:px-5">
                                        <span className={`flex max-lg:hidden shrink-0 items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full bg-white`}></span>
                                        <h6 className="lg:font-semibold ">{PricePlans[plan].name}</h6>
                                        <p className=" text-[#808080] max-lg:text-sm"><span className="font-semibold text-custom-dark-orange">${PricePlans[plan].price}</span>/month</p>
                                    </div>
                                </div>

                            ))}

                        </>
                    )}

                    {(ShowPlanLists && !IsCustomPlanSelected) && (<div className="px-6 ">
                        <button onClick={CustomPlanEnabled} className="w-full py-2 mt-8 font-semibold text-white rounded-md bg-custom-dark-orange">CHOOSE CUSTOM PLAN</button>
                    </div>)}


                    {IsCustomPlanSelected && (<div className="px-6 ">
                        <button onClick={CustomPlanDisabled} className="w-full py-2 mt-4 font-semibold text-white rounded-md bg-custom-dark-orange">CHOOSE DIFFERENT PLAN</button>
                    </div>)}
                </div>



                <div className="w-full max-md:px-10 md:w-8/12 max-md:mt-10 max-md:justify-center max-md:flex-col max-md:items-center ">

                    <div className="w-full px-8 py-16 space-y-10 border rounded-lg border-slate-300">

                        <div className="">
                            <h2 className="text-2xl font-semibold tracking-wide ">Account Information</h2>
                            <p className="mt-3 ">These details will be used to login to your account.</p>
                        </div>


                        <div className="space-y-6 ">
                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder={'Email'} />
                                <InputBox placeholder={'Password'} />
                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder={'Confirm Password'} />
                                <p className="w-1/2 text-custom-dark-orange">Already have an account? Log In</p>

                            </div>
                        </div>

                        <div className="">
                            <h2 className="text-2xl font-semibold tracking-wide ">Billing Information</h2>
                            <p className="mt-3 ">These details will be used to provide invoices for your purchases. Please make sure you are entering
                                right details.</p>
                        </div>


                        <div className="space-y-6 ">

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder={'First Name'} />
                                <InputBox placeholder={'Last Name'} />
                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder={'City'} />
                                <InputBox placeholder={'State/Suburb'} />
                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <DropDown
                                    options={countryNames}
                                    Toggle={HandleCountrydropdown}
                                    IsOpened={IsCountyDropdownOpened}
                                    HandleCountrySelection={HandleCountrySelection}
                                    SelectedCountry={SelectedCountry}
                                />
                                <InputBox placeholder={'Zip Code'} />
                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder={'Company'} />
                                <InputBox placeholder={'VAT/Tax ID'} />
                            </div>

                            <div className={OuterContainerInputBoxStyle}>

                                <InputBox placeholder={'Phone Number'} />
                                <span className="w-1/2"></span>

                            </div>
                        </div>

                        <div className="flex items-center justify-center px-20 pt-4">
                            <p className="text-center  text-[#333333] text-sm">We respect your privacy. We store your data securely and used for accessing account
                                related information. You may also get promotional Emails from Sembytes.</p>

                        </div>
                    </div>


                    <div className="flex flex-col items-center justify-center w-full px-8 py-16 mt-16 space-y-10 border rounded-lg border-slate-300">
                        <div className="flex flex-col items-center justify-center space-y-8 ">
                            <h2 className="text-2xl font-semibold ">Payment</h2>

                            <div className="flex items-center justify-center space-x-8 ">
                                <button className="flex items-center justify-center px-8 py-2 space-x-4 border rounded-lg border-custom-dark-orange">
                                    <span className="text-[#6366F1] font-semibold text-xl">Stripe</span>
                                    <div className="w-9 h-9 ">
                                        <img src={stripeImg} alt="" className="object-cover w-full h-full " />
                                    </div>
                                </button>


                                <button className="flex items-center justify-center px-8 py-2 space-x-4 border rounded-lg border-[#B0B0B0]">
                                    <span className="text-[#2563EB] font-semibold text-xl">Paypal</span>
                                    <div className="w-9 h-9 ">
                                        <img src={paypalImg} alt="" className="object-cover w-full h-full " />
                                    </div>
                                </button>
                            </div>
                            <button className="bg-[#44AA55] text-lg rounded-md  text-white font-semibold py-3 w-full">SIGN UP & PAY</button>

                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default Signup