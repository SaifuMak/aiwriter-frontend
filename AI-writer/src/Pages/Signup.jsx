import React, { useState, useEffect } from 'react'
import InputBox from '../Components/ArticleGenerationComponents/SmallComponents/InputBox'
import stripeImg from '../assets/Images/stripe.png'
import paypalImg from '../assets/Images/paypal.png'
import DropDown from '../Components/ArticleGenerationComponents/SmallComponents/DropDown'
import { countries } from 'countries-list';
import { VscCheck } from "react-icons/vsc";
import Axiosinstance from '../Axios/Axiosinstance'
import { setLogout, loginSuccess } from '../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';

import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';


import { LuLoader2 } from 'react-icons/lu'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster, toast } from 'sonner';


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



    const [formData, setFormData] = useState({

        email: '',
        name: '',
        password: '',
        confirmPassword: '',


        firstName: '',
        lastName: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        company: '',
        taxId: '',
        phNo: '',

    });


    const HandleInputchange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }


    const [Name, setName] = useState('')
    // const [Email, setEmail] = useState('')
    const [isCheckingAuthStatus, setIsCheckingAuthStatus] = useState(true)
    // const [IsAuthenticated, setIsAuthenticated] = useState(false)

    const [AlreadyHasAccount, setAlreadyHasAccount] = useState(false)

    const OuterContainerInputBoxStyle = 'flex items-end w-full space-x-10'

    const { IsAuthenticated, Username, Email } = useSelector(state => state.auth);




    const dispatch = useDispatch()



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
        setFormData({
            ...formData,
            country: option

        });
        setSelectedCountry(option)
        setIsCountyDropdownOpened(false)
    }

    const ShowPlans = () => {
        setShowPlanLists(true)
    }

    const HandlePlanSelection = (plan) => {
        setselectedPlan(plan)
    }

    const CustomPlanEnabled = () => {
        setselectedPreviousPlan(selectedPlan)
        setIsCustomPlanSelected(true)
        setselectedPlan('CUSTOM')

    }

    const CustomPlanDisabled = () => {
        setselectedPlan(selectedPreviousPlan)
        setIsCustomPlanSelected(false)
    }

    const HasAnAccount = () => {
        setFormData({
            ...formData,
            email: '',
            name: '',
            password: '',
            confirmPassword: ''

        });
        setAlreadyHasAccount(true)
    }

    const RevokeHasAnAccount = () => {
        setFormData({
            ...formData,
            email: '',
            name: '',
            password: '',
            confirmPassword: ''

        });

        setAlreadyHasAccount(false)
    }




    const GetLoginStatus = async () => {
        try {
            const response = await Axiosinstance.get('api/check_login_status')


            // setEmail(response.data.email)
            // setName(response.data.name)

            const email = response.data.email
            const username = response.data.name

            dispatch(loginSuccess({ username, email }));

            //   dispatch(loginSuccess({ username, email }));

            setIsCheckingAuthStatus(false)
            // setIsAuthenticated(true)
        }

        catch (error) {

            console.log(error, '&&&&&&&&&&&&&')
            //   dispatch(setLogout())
            //   navigate('/login')
            setIsCheckingAuthStatus(false)
        }
    }

    const handleLogout = async () => {
        const data = null

        try {
            const response = await Axiosinstance.post('api/logout', data)
            dispatch(setLogout())
            // window.location.reload();
            GetLoginStatus()


        }

        catch (error) {
            dispatch(setLogout())
            console.log(error)

        }
    }



    useEffect(() => {
        GetLoginStatus()
    }, [])



    const CheckData = async () => {
        console.log(formData)
        try {
            const response = await Axiosinstance.post('api/register', formData)
        }
        catch (error) {
            ErrorToast(Object.values(error.response.data)[0][0]
        )
        }
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



                    {(ShowPlanLists && !IsCustomPlanSelected) && (
                        <>
                            {Object.keys(PricePlans).filter((plan) => plan !== selectedPlan && plan !== 'CUSTOM').map((plan) => (
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

                    <div className="w-full px-8 py-16 space-y-10 border rounded-lg ">

                        {/* signup component  */}
                        {(!IsAuthenticated && !isCheckingAuthStatus && !AlreadyHasAccount) && (
                            <div className=" min-h-52">
                                <div className="">
                                    <h2 className="text-2xl font-semibold tracking-wide ">Account Information</h2>
                                    <p className="mt-3 ">These details will be used to login to your account.</p>
                                </div>


                                <div className="mt-3 space-y-6 ">

                                    <div className={OuterContainerInputBoxStyle}>
                                        <InputBox placeholder='Email' name='email' value={formData.email} onchange={HandleInputchange} />
                                        <InputBox placeholder='Name' name='name' value={formData.name} onchange={HandleInputchange} />
                                    </div>

                                    <div className={OuterContainerInputBoxStyle}>
                                        <InputBox placeholder='Password' name='password' value={formData.password} onchange={HandleInputchange} />
                                        <InputBox placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onchange={HandleInputchange} />
                                    </div>

                                    <p onClick={HasAnAccount} className="w-1/2 cursor-pointer text-custom-dark-orange">Already have an account? Log In</p>

                                </div>
                            </div>
                        )}

                        {/* Login component  */}

                        {(!IsAuthenticated && !isCheckingAuthStatus && AlreadyHasAccount) && (


                            <div className="min-h-52 ">
                                <div className="">
                                    <h2 className="text-2xl font-semibold tracking-wide ">Login To Your Account</h2>
                                    <p className="mt-3 ">You can  login to your existing account.</p>
                                </div>

                                <div className="mt-6 space-y-6">
                                    <div className={OuterContainerInputBoxStyle}>
                                        <InputBox placeholder='Email' name='email' value={formData.email} onchange={HandleInputchange} />
                                        <InputBox placeholder='Password' name='password' value={formData.password} onchange={HandleInputchange} />
                                    </div>




                                    <p onClick={RevokeHasAnAccount} className="cursor-pointer text-custom-dark-orange">Create a new account? Sign Up</p>


                                </div>
                            </div>
                        )}


                        {/* Authenticated user  component  */}
                        {(!isCheckingAuthStatus && IsAuthenticated) && (
                            <div className=" min-h-52">
                                <div className="">
                                    <h2 className="text-2xl font-semibold tracking-wide ">Account Information</h2>
                                    <p className="mt-3 ">You are logged into the following account.</p>
                                </div>
                                <div className="flex items-center justify-between mt-8 cursor-pointer ">
                                    <div className="flex items-center justify-center space-x-4">
                                        <div className="flex items-center text-4xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-16 lg:h-16 text-custom-dark-orange bg-[#213343]">{Username[0]}</div>
                                        <div className="flex flex-col mt-1">
                                            <span className="text-base font-semibold">{Username}</span>
                                            <span className="text-base ">{Email}</span>
                                            <span onClick={handleLogout} className="text-custom-dark-orange ">signout</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}




                        {isCheckingAuthStatus && (<div className="min-h-52 ">
                            <h2 className="text-2xl font-semibold tracking-wide ">Account Information</h2>
                            <div className="flex items-center w-full mt-16 ">
                                {/* <LuLoader2 className='text-4xl animate-spin text-custom-dark-orange' /> */}
                                <Skeleton circle={true} height={70} width={70} />
                                <Skeleton className='mt-2 ml-6' width={200} height={12} count={3} />
                            </div>
                        </div>)}


                        <div className="">
                            <h2 className="text-2xl font-semibold tracking-wide ">Billing Information</h2>
                            <p className="mt-3 ">These details will be used to provide invoices for your purchases. Please make sure you are entering
                                right details.</p>
                        </div>


                        <div className="space-y-6 ">

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='First Name' name='firstName' value={formData.firstName} onchange={HandleInputchange} />
                                <InputBox placeholder='Last Name' name='lastName' value={formData.lastName} onchange={HandleInputchange} />


                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='City' name='city' value={formData.city} onchange={HandleInputchange} />
                                <InputBox placeholder='State/Suburb' name='state' value={formData.state} onchange={HandleInputchange} />

                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <DropDown
                                    options={countryNames}
                                    Toggle={HandleCountrydropdown}
                                    IsOpened={IsCountyDropdownOpened}
                                    HandleCountrySelection={HandleCountrySelection}
                                    SelectedCountry={formData.country}
                                />
                                <InputBox placeholder='Zip Code' name='zipCode' value={formData.zipCode} onchange={HandleInputchange} />
                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='Company' name='company' value={formData.company} onchange={HandleInputchange} />
                                <InputBox placeholder='VAT/Tax ID' name='taxId' value={formData.taxId} onchange={HandleInputchange} />


                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='Phone Number' name='phNo' value={formData.phNo} onchange={HandleInputchange} />

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
                            <button onClick={CheckData} className="bg-[#44AA55] text-lg rounded-md  text-white font-semibold py-3 w-full">SIGN UP & PAY</button>

                        </div>

                    </div>
                </div>
            </div>
            <Toaster />


        </div>
    )
}

export default Signup