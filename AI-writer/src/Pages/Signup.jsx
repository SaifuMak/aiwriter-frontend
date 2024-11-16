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

import AdminNavbar from '../Components/Admin/AdminNavbar'

import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Toaster, toast } from 'sonner';

import LoginPopup from '../Components/LoginPopup'


import PlanCards from '../Components/GeneralComponets/PlanCards'

import AccordianComponent from '../Components/GeneralComponets/AccordianComponent'

import PayPalCheckout from '../Components/GeneralComponets/Payments/PayPalCheckout'
import StripeCheckout from '../Components/GeneralComponets/Payments/StripeCheckout'
import PaymentComponent from '../Components/GeneralComponets/Payments/PaymentComponent'

import { LuLoader } from 'react-icons/lu'

import { loadStripe } from '@stripe/stripe-js';

import { LuLoader2 } from "react-icons/lu";

import { RxCross2 } from "react-icons/rx";

import stripePromise from '../Stripe/Stripe'

import { HandleForbiddenGenericErrors } from '../Utils/ErrorMessageHandler'



// const stripePromise = loadStripe('pk_test_51QE1VQJN7jDpKSSQxJ8sJ6r7TRweKoTKY8bCwzwMRLmVTNenHhHFfi6QwDpS3I1raNNwo52VpQie8SrlDzx63Vjp00VIO5XxmF');

function Signup() {
    const [IsCountyDropdownOpened, setIsCountyDropdownOpened] = useState(false)
    const [SelectedCountry, setSelectedCountry] = useState('')
    const [selectedPlan, setselectedPlan] = useState('STARTER')
    const [selectedPreviousPlan, setselectedPreviousPlan] = useState('STARTER')

    const [ShowPlanLists, setShowPlanLists] = useState(false)
    const [CustomContentWords, setCustomContentWords] = useState(150000)
    const [CustomPlagiarisedWords, setCustomPlagiarisedWords] = useState(180000)
    const [IsCustomPlanSelected, setIsCustomPlanSelected] = useState(false)
    const [Action, setAction] = useState('signup')

    const [IsPasswordVisible, setIsPasswordVisible] = useState(false)
    const [IsConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)

    const [IsPasswordNotMatching, setIsPasswordNotMatching] = useState(false)

    const [IsLoginPopup, setIsLoginPopup] = useState(false)

    const [selectedPaymentMethod, setselectedPaymentMethod] = useState('STRIPE')

    const [IsLoading, setIsLoading] = useState(false)

    const [IsChangePlanAlert, setIsChangePlanAlert] = useState(false)





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
        phone_number: '',
        action: 'signup',

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

    const OuterContainerInputBoxStyle = 'flex  w-full space-x-10'

    const { IsAuthenticated, Username, Email } = useSelector(state => state.auth);

    const [emptyFields, setEmptyFields] = useState([]);

    const [IsPayButtonClicked, setIsPayButtonClicked] = useState(false)

    const [CustomPrice, setCustomPrice] = useState(100)


    const dispatch = useDispatch()



    const PricePlans = {
        STARTER: {
            name: 'STARTER',
            price: '2',
            cardColor: '#D9E5F1',

            description: 'This plan offers essential content generation services, including up to 15,000 words of original writing, a plagiarism checker for 10,000 words, and optional add-ons for customized solutions.',
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

            description: 'This plan offers essential content generation services, including up to 15,000 words of original writing, a plagiarism checker for 10,000 words, and optional add-ons for customized solutions.',


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

            description: 'This plan offers essential content generation services, including up to 15,000 words of original writing, a plagiarism checker for 10,000 words, and optional add-ons for customized solutions.',

            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },
        CUSTOM: {
            name: 'CUSTOM',
            price: CustomPrice,
            cardColor: '#FFF2C9',

            details: [
                'Content Generation - 15,000 words',
                'Plagiarism Checker - 10,000 words',
                'Buy Addons when needed'
            ]
        },

    }


    const countryNames = Object.values(countries).map(country => country.name).sort((a, b) => a.localeCompare(b)); // Sort alphabetically;






    // this calculates the custom price upon the slider change 
    const calculateCustomPrice = (contentWords = CustomContentWords, plagiarismWords = CustomPlagiarisedWords) => {
        // HandleFillSelectedPlanDetails()

        const contentWordPrice = 0.00031; // Cost per content word
        const plagiarismWordPrice = 0.0003; // Cost per plagiarism word

        // Calculate additional price based on word counts
        const contentWordsCost = contentWords * contentWordPrice;
        const plagiarismWordsCost = plagiarismWords * plagiarismWordPrice;

        return Math.round(contentWordsCost + plagiarismWordsCost);
    };



    const HandleArticleWordsForCustomPlan = (event, newWordsValue) => {

        if (newWordsValue < 150000) {
            setCustomContentWords(150000); // Set to minimum value
        } else {
            setCustomContentWords(newWordsValue); // Update state with the new value
            setCustomPrice(calculateCustomPrice(newWordsValue, CustomPlagiarisedWords))

        }
    }

    const HandlePlagiarismWordsForCustomPlan = (event, newPlagiarisedValue) => {

        if (newPlagiarisedValue < 180000) {
            setCustomPlagiarisedWords(180000); // Set to minimum value
        } else {
            setCustomPlagiarisedWords(newPlagiarisedValue); // Update state with the new value
            setCustomPrice(calculateCustomPrice(CustomContentWords, newPlagiarisedValue))

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

    // const HandleFillSelectedPlanDetails = (plan = selectedPlan) => {

    //     const selectedPlan = PricePlans[plan];
    //     console.log(selectedPlan, 'this is the selected plan----------')



    //     if (selectedPlan) {
    //         setSelectedPlanDetails({
    //             PlanName: selectedPlan.name,
    //             PlanPrice: selectedPlan.price,
    //             PlanDetails: selectedPlan.description,
    //             ContentWords: selectedPlan.ContentWords,
    //             PlagWords: selectedPlan.PlagWords,
    //         });
    //     }

    // }


    const GetSelectedPlanDetails = (Is_willing_to_change_plan) => {

        let PlanDetails = {}

        if (selectedPlan) {

            const PlanSelected = PricePlans[selectedPlan];
            console.log(PlanSelected, 'this is the selected plan----------')

            if (selectedPlan !== 'CUSTOM') {

                PlanDetails = {
                    PlanName: PlanSelected.name,
                    PlanPrice: PlanSelected.price,
                    PlanDetails: PlanSelected.description,
                    ContentWords: PlanSelected.ContentWords,
                    PlagWords: PlanSelected.PlagWords,
                    IsPlanChanging: Is_willing_to_change_plan,
                };
            }

            else {

                PlanDetails = {
                    PlanName: PlanSelected.name,
                    PlanPrice: CustomPrice,
                    PlanDetails: `This plan offers essential content generation services, including up to ${CustomContentWords} words of original writing, a plagiarism checker for ${CustomPlagiarisedWords} words, and optional add-ons for customized solutions.`,
                    ContentWords: CustomContentWords,
                    PlagWords: CustomPlagiarisedWords,
                    IsPlanChanging: Is_willing_to_change_plan,
                };
            }
        }

        return PlanDetails

    }

    const handleChangePlanAlert = () => {
        setIsChangePlanAlert(false)
    }


    const HandlePlanSelection = (plan) => {
        // HandleFillSelectedPlanDetails(plan)
        setselectedPlan(plan)
    }


    const CustomPlanEnabled = () => {
        setselectedPlan('CUSTOM')
        setselectedPreviousPlan(selectedPlan)
        setIsCustomPlanSelected(true)
        // HandleFillSelectedPlanDetails('CUSTOM')

    }


    const CustomPlanDisabled = () => {
        setselectedPlan(selectedPreviousPlan)
        // HandleFillSelectedPlanDetails(selectedPreviousPlan)
        setIsCustomPlanSelected(false)
    }

    const togglePassword = () => {
        setIsPasswordVisible(!IsPasswordVisible)
    }


    const toggleConfirmPassword = () => {
        setIsConfirmPasswordVisible(!IsConfirmPasswordVisible)
    }





    const HandleOpenLoginPopup = () => {
        setIsPayButtonClicked(false)
        setEmptyFields([])
        setIsLoginPopup(true)
    }

    const HandleCloseLoginPopup = () => {
        setIsLoginPopup(false)
    }


    const HandleSelectedPaymentOption = (PaymentMethod) => {
        setselectedPaymentMethod(PaymentMethod)

    }



    const HasAnAccount = () => {
        setAction('login')

        setFormData({
            ...formData,
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            action: 'login'

        });
        setAlreadyHasAccount(true)
    }


    const isPasswordStrong = (password) => {
        // Regular expression to check if the password is at least 8 characters long,
        // and contains both letters and numbers.
        const strongPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        // Test the password against the regex
        return strongPasswordRegex.test(password);
    };

    const handleClearInputs = () => {
        setFormData(prevFormData => {
            const newFormData = { action: 'signup' }; // Start with action
            Object.keys(prevFormData).forEach(key => {
                if (key !== 'action') {
                    newFormData[key] = ''; // Clear other fields
                } else {
                    newFormData[key] = prevFormData[key]; // Keep action
                }
            });
            return newFormData;
        });

    }




    const RevokeHasAnAccount = () => {
        setAction('signup')

        setFormData({
            ...formData,
            email: '',
            name: '',
            password: '',
            confirmPassword: '',
            action: 'signup'

        });

        setAlreadyHasAccount(false)
    }


    const checkEmptyFields = (formData) => {
        if (!IsPayButtonClicked) {
            return
        }
        const emptyFieldsArray = [];

        Object.keys(formData).forEach((field) => {

            if (formData[field] == null || typeof formData[field] !== 'string' || !formData[field].trim()) {
                emptyFieldsArray.push(field);  // Push field name to the array if empty
            }

            // if (!formData[field].trim()) {
            //     emptyFieldsArray.push(field);  // Push field name to the array if empty
            // }
        });

        // if(formData.password !== formData.confirmPassword){

        //     setIsPasswordNotMatching(true)
        // }

        setEmptyFields(emptyFieldsArray);  // Update the state with empty fields
        return emptyFieldsArray.length > 0;
    };


    const GetLoginStatus = async (CheckBillingStatus = true) => {

        try {
            const response = await Axiosinstance.get('api/check_login_status')

            // setEmail(response.data.email)
            // setName(response.data.name)

            const email = response.data.email
            const username = response.data.name

            dispatch(loginSuccess({ username, email }));
            setFormData({
                ...formData,
                action: 'logged',
                email: email,

            });

            //   dispatch(loginSuccess({ username, email }));

            setIsCheckingAuthStatus(false)
            // setIsAuthenticated(true)
            if (CheckBillingStatus) {
                GetBillingInfo(email)
            }

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
            setFormData({
                ...formData,
                action: 'signup',

            });

            // window.location.reload();
            setIsPayButtonClicked(false)
            GetLoginStatus()
            RevokeHasAnAccount()
            handleClearInputs()

        }


        catch (error) {
            dispatch(setLogout())
            console.log(error)

        }
    }




    const GetBillingInfo = async (email = null) => {

        // const data ={
        //     'email' : Email
        // }
        try {
            const response = await Axiosinstance.get(`api/register-login-payment/${email}`,)
            const {
                firstName,
                lastName,
                city,
                state,
                country,
                zipCode,
                company,
                taxId,
                phone_number,
            } = response.data;

            // Populate the formData with the response
            setFormData(prevData => ({
                ...prevData,
                firstName,
                lastName,
                city,
                state,
                country,
                zipCode,
                company,
                taxId,
                phone_number,
            }));

        }
        catch (error) {
            console.log(error.response.data)
           


        }

    }



    const SignupPayment = async () => {


        setIsPayButtonClicked(true)

        toast.dismiss()

        checkEmptyFields(formData)

        const emptyFieldsArray = [];

        Object.keys(formData).forEach((field) => {
            console.log(field)

            if (formData.action === 'login' && (field === 'name' || field === 'confirmPassword')) {
                return;  // Skip these fields
            }
            if (formData.action === 'logged' && (field === 'name' || field === 'confirmPassword' || field === 'email' || field === 'password')) {
                return;  // Skip these fields
            }
            if (!formData[field].trim()) {
                emptyFieldsArray.push(field);  // Push field name to the array if empty
            }
        });

        console.log(emptyFieldsArray)

        if (emptyFieldsArray.length > 0) {
            ErrorToast('Please fill the required fields')
            await GetLoginStatus()
            return
        }

        if (formData.action === 'signup') {
            if (formData.password !== formData.confirmPassword || !isPasswordStrong(formData.password)) {
                return
            }
        }



        if (formData.phone_number.length > 15) {
            ErrorToast('Phone number must not exceed 15 characters.')
            return
        }


        if (formData.zipCode.length > 20) {
            ErrorToast('ZipCode must not exceed 20 characters.')
            return
        }


        console.log(formData)

        let email

        if (Email === '' && formData.email !== '') {
            email = formData.email
        }
        else {
            email = Email
        }

        setIsLoading(true)



        try {
            const response = await Axiosinstance.post(`api/register-login-payment/${email}`, formData)
            await GetLoginStatus()
            // await handleStripePayment()
            HandlePayment()

        }


        catch (error) {
            await GetLoginStatus(false)
            ErrorToast(Object.values(error.response.data)[0][0])
            setIsLoading(false)


        }
    }




    const handleStripePayment = async (Is_willing_to_change_plan = false) => {

        const PlanDetails = GetSelectedPlanDetails(Is_willing_to_change_plan)

        const stripe = await stripePromise;
        setIsLoading(true)


        try {

            // Create a checkout session by calling the Django backend
            const response = await Axiosinstance.post(`payment/stripe-checkout`, PlanDetails)

            console.log(response)
            // setIsLoading(false)

            const { sessionId } = response.data;
            // Redirect to Stripe Checkout
            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) console.error('Stripe Checkout error');
            setIsChangePlanAlert(false)


        } catch (error) {

            setIsLoading(false)

            if (error.response) {
                if (error.response.status === 409) {
                    setIsChangePlanAlert(true)
                    return
                }
                if (error.response.status === 403) {
                    ErrorToast('Your session is over please login')
                    return
                }
                else {
                    ErrorToast(error.response.data.error)

                }

            }

        }
    };


    // user agreed to change the existing plan 
    const RetryStripePayment = () => {
        setIsLoading(true)
        if (IsLoading) {
            return
        }
        handleStripePayment(true)
    }

    const HandlePayment = async () => {
        toast.dismiss()
        if (selectedPaymentMethod === 'STRIPE') {
            await handleStripePayment()
        }
        else {
            ErrorToast('paypal payment is not allowed')
            setTimeout(() => {
            setIsLoading(false)
                
            }, 300);

        }
    }




    useEffect(() => {
        setCustomPrice(calculateCustomPrice())
        checkEmptyFields(formData)

    }, [formData])



    useEffect(() => {
        console.log(formData)
        GetLoginStatus()

    }, [IsLoginPopup])


    return (
        <>
        <AdminNavbar />
        <div className="flex items-center justify-center pb-20 font-poppins">
            <div className="flex py-10 mt-10 max-md:flex-col max-md:justify-center max-md:items-center xl:w-11/12 2xl:w-10/12 md:space-x-6 xl:space-x-16 2xl:space-x-28 max-xl:px-10 ">

                <div className="w-full max-md:justify-center max-md:flex-col max-md:items-center max-md:px-10 md:mt-10 md:w-3/12 ">
                    <h3 className="mb-4 text-2xl text-center ">You are subscribing for:</h3>



                    {/* <PlanCards
                        PricePlans={PricePlans}
                        selectedPlan={selectedPlan}
                        HandleArticleWordsForCustomPlan={HandleArticleWordsForCustomPlan}
                        CustomContentWords={CustomContentWords}
                        HandlePlagiarismWordsForCustomPlan={HandlePlagiarismWordsForCustomPlan}
                        CustomPlagiarisedWords={CustomPlagiarisedWords}
                        IsCustomPlanSelected={IsCustomPlanSelected}
                    /> */}


                    <AccordianComponent

                        PricePlans={PricePlans}
                        selectedPlan={selectedPlan}
                        HandlePlanSelection={HandlePlanSelection}
                        HandleArticleWordsForCustomPlan={HandleArticleWordsForCustomPlan}
                        CustomContentWords={CustomContentWords}
                        HandlePlagiarismWordsForCustomPlan={HandlePlagiarismWordsForCustomPlan}
                        CustomPlagiarisedWords={CustomPlagiarisedWords}
                        IsCustomPlanSelected={IsCustomPlanSelected}
                        ShowPlanLists={ShowPlanLists}
                        CustomPrice={CustomPrice}
                    />

                    {!ShowPlanLists && (<div className="px-6 ">
                        <button onClick={ShowPlans} className="w-full py-2 mt-5 font-semibold text-white rounded-md bg-custom-dark-orange">CHOOSE ANOTHER PLAN</button>
                    </div>)}



                    {/* {(ShowPlanLists && !IsCustomPlanSelected) && (
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
                    )} */}


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
                                        <InputBox placeholder='Email' name='email' value={formData.email} onchange={HandleInputchange} is_null={emptyFields.includes('email')} />
                                        <InputBox placeholder='Name' name='name' value={formData.name} onchange={HandleInputchange} is_null={emptyFields.includes('name')} />
                                    </div>

                                    <div className='flex w-full space-x-10 '>
                                        <InputBox placeholder='Password' name='password' value={formData.password} onchange={HandleInputchange} is_password_field={true} HandlePasswordVisibility={togglePassword} isPasswordVisible={IsPasswordVisible} Is_password_null={!formData.password.trim()} IsPasswordStrong={isPasswordStrong(formData.password)} Is_check_password={true} is_null={emptyFields.includes('password')} />
                                        <InputBox placeholder='Confirm Password' name='confirmPassword' value={formData.confirmPassword} onchange={HandleInputchange} is_password_field={true} HandlePasswordVisibility={toggleConfirmPassword} Is_password_null={!formData.confirmPassword.trim()} isPasswordVisible={IsConfirmPasswordVisible} IsPasswordNotMatching={formData.password !== formData.confirmPassword} is_null={emptyFields.includes('confirmPassword')} />
                                    </div>

                                    <p onClick={HandleOpenLoginPopup} className="w-1/2 cursor-pointer text-custom-dark-orange">Already have an account? Log In</p>

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
                                        <InputBox placeholder='Email' name='email' value={formData.email} onchange={HandleInputchange} is_null={emptyFields.includes('email')} />
                                        <InputBox placeholder='Password' name='password' value={formData.password} onchange={HandleInputchange} HandlePasswordVisibility={togglePassword} is_password={true} is_null={emptyFields.includes('password')} />
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
                                        <div className="flex items-center text-4xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-16 lg:h-16 text-custom-dark-orange bg-[#213343]">{Username ? Username[0] : 'U'}</div>
                                        <div className="flex flex-col mt-1">
                                            <span className="text-base font-semibold">{Username ? Username : 'User'}</span>
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
                                <InputBox placeholder='First Name' name='firstName' value={formData.firstName} onchange={HandleInputchange} is_null={emptyFields.includes('firstName')} />
                                <InputBox placeholder='Last Name' name='lastName' value={formData.lastName} onchange={HandleInputchange} is_null={emptyFields.includes('lastName')} />
                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='City' name='city' value={formData.city} onchange={HandleInputchange} is_null={emptyFields.includes('city')} />
                                <InputBox placeholder='State/Suburb' name='state' value={formData.state} onchange={HandleInputchange} is_null={emptyFields.includes('state')} />
                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <DropDown
                                    options={countryNames}
                                    Toggle={HandleCountrydropdown}
                                    IsOpened={IsCountyDropdownOpened}
                                    HandleCountrySelection={HandleCountrySelection}
                                    SelectedCountry={formData.country}
                                    is_null={emptyFields.includes('country')}
                                />
                                <InputBox placeholder='Zip Code' name='zipCode' value={formData.zipCode} onchange={HandleInputchange} is_null={emptyFields.includes('zipCode')} />
                            </div>


                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='Company' name='company' value={formData.company} onchange={HandleInputchange} is_null={emptyFields.includes('company')} />
                                <InputBox placeholder='VAT/Tax ID' name='taxId' value={formData.taxId} onchange={HandleInputchange} is_null={emptyFields.includes('taxId')} />


                            </div>

                            <div className={OuterContainerInputBoxStyle}>
                                <InputBox placeholder='Phone Number' name='phone_number' value={formData.phone_number} onchange={HandleInputchange} is_null={emptyFields.includes('phone_number')} />

                                <span className="w-1/2"></span>

                            </div>
                        </div>

                        <div className="flex items-center justify-center px-20 pt-4">
                            <p className="text-center  text-[#333333] text-sm">We respect your privacy. We store your data securely and used for accessing account
                                related information. You may also get promotional Emails from Sembytes.</p>
                        </div>
                    </div>

                    <PaymentComponent
                        HandleSelectedPaymentOption={HandleSelectedPaymentOption}
                        selectedPaymentMethod={selectedPaymentMethod}
                        HandlePayment={SignupPayment}
                        IsLoading={IsLoading}
                    />
                </div>

            </div>

            <Toaster />

            {IsChangePlanAlert && (<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
                <div className="relative flex flex-col items-center justify-center h-auto px-4 py-8 rounded-md bg-custom-black-text max-sm:-mt-56 sm:py-12 sm:px-16">
                    <span onClick={handleChangePlanAlert} className="absolute p-1 text-2xl text-white cursor-pointer top-1 right-1 hover:bg-slate-700 rounded-2xl"><RxCross2 /></span>
                    <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold text-white">You already have an active plan.</h2>
                        <h4 className="text-lg font-semibold text-white">Do you want to change the plan ?</h4>

                        <div className="flex justify-center w-full mt-6 space-x-12">
                            <button onClick={handleChangePlanAlert} className="flex items-center justify-center w-24 h-10 text-lg font-semibold rounded-md bg-slate-300 ">cancel</button>
                            {IsLoading ? (
                                <button className="flex items-center justify-center w-24 h-10 text-lg font-semibold text-white rounded-md bg-custom-dark-orange "><LuLoader2 className='text-xl animate-spin' /></button>

                            ) : (
                                <button onClick={RetryStripePayment} className="flex items-center justify-center w-24 h-10 text-lg font-semibold text-white rounded-md bg-custom-dark-orange ">confirm</button>
                            )}

                        </div>
                        <p className="mt-10 text-sm text-slate-300">*A refund may be issued based on your remaining credits balance.</p>
                    </div>
                </div>
            </div>)}

            {IsLoginPopup && <LoginPopup HandleCloseLoginPopup={HandleCloseLoginPopup} setIsPayButtonClicked={setIsPayButtonClicked} />}

        </div>
        </>
    )
}

export default Signup