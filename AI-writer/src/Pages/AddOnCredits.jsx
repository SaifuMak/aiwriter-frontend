import React, { useState } from 'react'
import SliderComponets from '../Components/GeneralComponets/SliderComponets'
import PaymentComponent from '../Components/GeneralComponets/Payments/PaymentComponent'
import Navbar from '../Components/Navbar/Navbar'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import ErrorToast from '../Utils/ErrorToast'
import { Toaster, toast } from 'sonner';
import Axiosinstance from '../Axios/Axiosinstance'
import stripePromise from '../Stripe/Stripe'
import { HandleForbiddenGenericErrors } from '../Utils/ErrorMessageHandler'


function AddOnCredits() {

    const [CustomContentWords, setCustomContentWords] = useState(0)
    const [CustomPlagiarisedWords, setCustomPlagiarisedWords] = useState(0)
    const [FinalPrice, setFinalPrice] = useState(0)
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState('STRIPE')
    const [IsLoading, setIsLoading] = useState(false)





    const calculateCustomPrice = (contentWords = CustomContentWords, plagiarismWords = CustomPlagiarisedWords) => {
        // HandleFillSelectedPlanDetails()

        const contentWordPrice = 0.00031; // Cost per content word
        const plagiarismWordPrice = 0.0003; // Cost per plagiarism word

        // Calculate additional price based on word counts
        const contentWordsCost = contentWords * contentWordPrice;
        const plagiarismWordsCost = plagiarismWords * plagiarismWordPrice;

        return Math.round(contentWordsCost + plagiarismWordsCost);
    };



    const HandleArticleCredits = (event, newWordsValue) => {

        setCustomContentWords(newWordsValue); // Update state with the new value
        setFinalPrice(calculateCustomPrice(newWordsValue, CustomPlagiarisedWords))

    }

    const HandlePlagiarismCredits = (event, newPlagiarisedValue) => {


        setCustomPlagiarisedWords(newPlagiarisedValue); // Update state with the new value
        setFinalPrice(calculateCustomPrice(CustomContentWords, newPlagiarisedValue))



    }

    const HandleSelectedPaymentOption = (PaymentMethod) => {
        setselectedPaymentMethod(PaymentMethod)

    }



    const HandlePayment = async () => {
        toast.dismiss()

        if (selectedPaymentMethod === 'STRIPE') {
            await handleStripePayment()
        }
        else {
            ErrorToast('paypal payment is not allowed')

        }
    }

    const handleStripePayment = async () => {

        if (FinalPrice === 0) {
            ErrorToast('Payment amount must be greater than zero.')
            return
        }
        setIsLoading(true)


        const data = {
            'amount': FinalPrice,
            'content_words': CustomContentWords,
            'plagiarised_words': CustomPlagiarisedWords,
            'PlanName': 'TOPUP',
            'plan_details': `By opting for the top-up plan, you will receive ${CustomContentWords} content credits and ${CustomPlagiarisedWords} plagiarism credits, each with a one-month validity. This plan allows you to extend your access and make the most of your services without interruptions.`
        }

        console.log(data)
        const stripe = await stripePromise;
        try {
            const response = await Axiosinstance.post('payment/stripe-checkout', data)

            const { sessionId } = response.data;
            // Redirect to Stripe Checkout

            const { error } = await stripe.redirectToCheckout({ sessionId });
            if (error) console.error('Stripe Checkout error');
            
            setTimeout(() => {
                setIsLoading(false)

            }, 1000);

        }

        catch (error) {
            HandleForbiddenGenericErrors(error)
            setTimeout(() => {
            setIsLoading(false)
                
            }, 500);
        }
        

    }



    return (
        <>
            <AdminNavbar />

            <div className='flex items-center justify-center font-poppins'>

                <div className='justify-center w-11/12 p-4 my-12 rounded-lg lg:my-24 max-lg:space-y-6 max-lg:flex-col lg:flex lg:space-x-6 xl:space-x-12 2xl:space-x-16'>

                    <div className="relative flex flex-col items-center justify-center border rounded-lg lg:w-3/12 border-slate-200 ">

                        <div className="absolute top-0 flex items-center justify-center w-full h-16 rounded-t-lg bg-blue-50 ">
                            <p className="text-xl font-semibold ">Add-On Credits</p>
                        </div>

                        <div className="flex flex-col items-center justify-center w-full space-y-1 xl:pt-6">
                            <h6 className="text-center text-[#808080] "><span className="text-4xl text-custom-dark-orange">${FinalPrice}</span></h6>
                            <p className="text-center text-[#808080] text-sm ">Total cost</p>

                            <div className="w-full pt-6 xl:pt-10 ">

                                <h5 className="text-center ">Content Generation:</h5>
                                <p className="text-sm text-center ">({CustomContentWords} words)</p>

                                <div className="relative flex items-center justify-center w-full px-10 mt-4 ">

                                    <div className="absolute flex justify-between w-full px-9 -mt-9 ">
                                        <span className="text-xs ">0</span>
                                        <span className="text-xs ">3,00,000</span>
                                    </div>

                                    <SliderComponets
                                        Handlefunction={HandleArticleCredits}
                                        WordsCount={CustomContentWords}
                                        MinimumValue={0}
                                        Step={3000}
                                    />
                                </div>
                            </div>


                            <div className="w-full pt-6 xl:pt-10 ">
                                <h5 className="text-center ">Plagiarism checker:</h5>
                                <p className="text-sm text-center ">({CustomPlagiarisedWords} words)</p>


                                <div className="relative flex items-center justify-center w-full px-10 mt-4 ">

                                    <div className="absolute flex justify-between w-full px-9 -mt-9 ">
                                        <span className="text-xs ">0</span>
                                        <span className="text-xs ">3,00,000</span>
                                    </div>

                                    <SliderComponets
                                        Handlefunction={HandlePlagiarismCredits}
                                        WordsCount={CustomPlagiarisedWords}
                                        MinimumValue={0}
                                        Step={3000}
                                    />
                                </div>
                            </div>



                        </div>

                        {/* <div className="flex flex-col w-full px-10 mt-6 space-y-1 ">
                            <p className="font-semibold text-center text-custom-dark">Power Up Your Plan – Buy More Credits</p>
                            <p className="text-sm text-center text-custom-dark ">Add more credits to your current plan and continue enjoying uninterrupted access to all your services.
                                Simply choose the word count you need, pay instantly, and enjoy  <span className="font-semibold text-custom-dark-orange ">one-month validity</span> on the add-on credits.
                            </p>
                        </div> */}

                    </div>

                    <div className="p-5 border rounded-lg lg:w-9/12 bg-gradient-to-r from-stone-50 via-blue-50 to-stone-50 border-slate-200">
                        <div className="">
                            <h1 className="text-2xl font-semibold tracking-wider text-custom-dark">How Add-on Credits Works ?</h1>
                            <p className="mt-4 tracking-wide max-lg:text-sm text-custom-dark">Add more credits to your current plan and keep accessing all your services without interruptions. Choose the exact word count that fits your needs, make an instant payment, and enjoy the flexibility of a full month to use your add-on credits. With a  <span className="font-semibold text-custom-dark-orange ">one-month validity</span>  , you can maximize your services and stay productive, knowing that your credits are available whenever you need them. It’s a seamless way to ensure that you never miss out on the features and benefits you rely on.
                            </p>

                        </div>


                        <div className="rounded-lg 2xl:py-16 xl:py-12">

                            <PaymentComponent
                                HandleSelectedPaymentOption={HandleSelectedPaymentOption}
                                selectedPaymentMethod={selectedPaymentMethod}
                                HandlePayment={HandlePayment}
                                IsLoading={IsLoading}
                                isBorder={false}
                            />

                        </div>


                    </div>

                </div>
            </div>
            <Toaster />


        </>
    )
}

export default AddOnCredits