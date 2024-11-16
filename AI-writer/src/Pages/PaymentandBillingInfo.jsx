import React, { useEffect, useState } from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import { Link } from 'react-router-dom'
import ProfileSettings from '../Components/Profile/ProfileSettings'
import { Toaster, toast } from 'sonner';
import Table from '../Components/GeneralComponets/Layouts/Table';
import BillingDetails from '../Components/Profile/BillingDetails';
import Axiosinstance from '../Axios/Axiosinstance';
import { useDispatch, useSelector } from 'react-redux';
import { getPlanDetails } from '../Utils/AuthService';
import ErrorToast from '../Utils/ErrorToast';
import SuccessToast from '../Utils/SuccessToast';
import { useNavigate } from 'react-router-dom';
import { HandleForbiddenGenericErrors } from '../Utils/ErrorMessageHandler';



function PaymentandBillingInfo() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);

    const TableColumns = ['Date', 'Invoice number', 'Item description', 'Amount', 'Download Invoice']

    const BillingDescription = 'These details will be used to provide invoices for your purchases. Please make sure you are entering right details. If you change the below details, new invoices will reflect new data.'

    const [PaymentHistoryData, setPaymentHistoryData] = useState(null)
    const [IsTableLoading, setIsTableLoading] = useState(true)
    const [IsBillingLoading, setIsBillingLoading] = useState(false)


    const { ArticleWords, PlagiarisedWords,AddOnArticleWords,AddOnPlagiarisedWords, PlanName, PlanAmount, PlanPurchasedDate, RenewalDate } = useSelector(state => state.Assets);




    const [emptyFields, setEmptyFields] = useState([]);
    const [IsCountyDropdownOpened, setIsCountyDropdownOpened] = useState(false)
    const [SelectedCountry, setSelectedCountry] = useState('')
    const [IsBillingDataEdited, setIsBillingDataEdited] = useState(false)



    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        city: '',
        state: '',
        country: '',
        zipCode: '',
        company: '',
        taxId: '',
        phone_number: '',

    });

    const checkEmptyFields = (formData) => {
        // if (!IsPayButtonClicked) {
        //     return
        // }
        const emptyFieldsArray = [];

        Object.keys(formData).forEach((field) => {

            if (formData[field] == null || typeof formData[field] !== 'string' || !formData[field].trim()) {
                emptyFieldsArray.push(field);  // Push field name to the array if empty
            }


        });



        setEmptyFields(emptyFieldsArray);  // Update the state with empty fields
        return emptyFieldsArray.length > 0;
    };






    const getPaymentHistory = async (page = 1) => {



        try {
            const response = await Axiosinstance.get(`payment/payment-history?page=${page}`)
            if (response.data) {
                setPaymentHistoryData(response.data.results)

                if (response.data.next) {
                    // Parse the URL using the URL constructor
                    const nextUrl = new URL(response.data.next);

                    // Extract the page parameter from the URL's query string
                    const nextPageNumber = nextUrl.searchParams.get('page');
                    console.log('Next page:', nextPageNumber);
                    setNextPage(nextPageNumber)



                    // Optionally, you can use this page number to update other state or UI
                }

                else {
                    setNextPage(response.data.next)

                }



                if (response.data.previous) {
                    // Parse the URL using the URL constructor
                    const PrevUrl = new URL(response.data.previous);

                    // Extract the page parameter from the URL's query string
                    const prevPageNumber = PrevUrl.searchParams.get('page');

                    console.log('prev page:', prevPageNumber);
                    setPreviousPage(prevPageNumber)

                    // Optionally, you can use this page number to update other state or UI
                }
                else {
                    setPreviousPage(response.data.previous)
                    console.log('prev page:', prevPageNumber);


                }


            }
            setIsTableLoading(false)

        }
        catch (error) {
            setIsTableLoading(false)

        }
    }



    const GetBillinginfo = async () => {

        setIsBillingLoading(true)

        try {
            const response = await Axiosinstance.get('payment/get-billing-details')
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
            setIsBillingLoading(false)


        }
        catch (error) {
            setIsBillingLoading(false)
        }
    }




    const ConfirmBillinginfo = async () => {
        toast.dismiss()

        if (!IsBillingDataEdited) {
            return
        }

        checkEmptyFields(formData)

        const emptyFieldsArray = [];

        Object.keys(formData).forEach((field) => {
            console.log(field)


            if (!formData[field].trim()) {
                emptyFieldsArray.push(field);  // Push field name to the array if empty
            }
        });


        if (emptyFieldsArray.length > 0) {
            ErrorToast('Please fill the required fields')
            // await GetLoginStatus()
            return
        }

        if (formData.phone_number.length > 15) {
            ErrorToast('Phone number must not exceed 15 characters.')
            return
        }


        if (formData.zipCode.length > 20) {
            ErrorToast('ZipCode must not exceed 20 characters.')
            return
        }

        try {
            const response = await Axiosinstance.post('payment/get-billing-details', formData)
            console.log(response.data, '++++++++++++++++++/////////////////////////////////')
            SuccessToast(response.data.message)
            setIsBillingDataEdited(false)

        }
        catch (error) {
            setIsBillingLoading(false)
            setIsBillingDataEdited(false)

        }

    }


    const HandleAddonCreditsEligibility =  async() =>{
        try{
            const response = await Axiosinstance.get('payment/add-on-credits')
            navigate('/buy-more-credits')
        }
        catch(error){
            HandleForbiddenGenericErrors(error)

        }

    }


    useEffect(() => {
        GetBillinginfo()
        getPlanDetails(dispatch)
        getPaymentHistory()

    }, [])



    return (

        <>

            <AdminNavbar />


            <div className="flex items-center justify-center w-full my-24 font-poppins">


                <div className="w-11/12 lg:flex lg:space-x-12 ">

                    {/* this is navigation for the mobile screen */}
                    <div className="flex items-center justify-center w-full px-2 py-2 my-4 space-x-2 lg:hidden bg-red-50 ">
                        <Link to='#' className="flex items-center "><span className="text-sm lg:text-lg ">Profile Settings</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Plan Details</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Billing</span></Link>
                        <Link to='#' className="flex items-center"><span className="text-sm lg:text-lg ">Help</span></Link>
                        <Link to='#' className="flex items-center"><span className="lg:text-lg text-sm  text-[#EB1E1E]">Logout</span></Link>
                    </div>

                    <ProfileSettings HandleAddonCreditsEligibility={HandleAddonCreditsEligibility} />

                    <div className="space-y-20 lg:w-9/12 max-lg:mt-6 ">
                        <div className="p-8 space-y-10 border rounded-lg border-slate-300">
                            <div className="flex justify-between ">
                                <div className="">
                                    <h6 className="text-xl font-semibold ">Your Plan:{PlanName}</h6>
                                    <p className="text-[#808080] text-xl"><span className=" text-custom-dark-orange">${PlanAmount / 100}</span>/month</p>
                                </div>
                                <div className="">
                                    <h6 className="text-xl font-semibold">Renewal Date:</h6>
                                    <p className="text-[#808080] text-lg">{RenewalDate}</p>
                                </div>
                                
                                <div className="">
                                    {PlanAmount === 0 ? (
                                   <Link to='/purchase-plan'><button className="px-4 py-1.5 font-semibold text-white rounded-md bg-custom-dark-orange">PURCHASE PLAN</button></Link> 

                                    ):(
                                        <Link to='/purchase-plan'><button className="px-4 py-1.5 font-semibold text-white rounded-md bg-custom-dark-orange">UPGRADE NOW</button></Link>

                                    )}
                                </div>
                            </div>


                            <div className="flex items-center justify-between w-full ">
                                <div className="w-full space-y-3 ">
                                    <h6 className="text-lg font-semibold ">Plan Details:</h6>
                                    <div className="flex ">
                                        <p className="w-1/2 ">Content Generation:  <span className="text-custom-dark-orange">{ArticleWords} words</span></p>
                                        <p className="w-1/2 ml-4">Plagiarism Checker: <span className="text-custom-dark-orange">{PlagiarisedWords} words</span></p>
                                    </div>
                                    <div className="flex ">
                                        <p className="w-1/2 ">Add-On Content Generation:  <span className="text-custom-dark-orange">{ArticleWords} words</span></p>
                                        <p className="w-1/2 ml-4 ">Add-On Plagiarism Generation: <span className="text-custom-dark-orange">{PlagiarisedWords} words</span></p>
                                    </div> 
                                </div>

                              {PlanAmount !== 0 && (<div className="">
                                 <span onClick={HandleAddonCreditsEligibility} className="text-lg cursor-pointer hover:underline text-nowrap text-custom-dark-orange">Buy Addons</span>
                                </div>)}
                            </div>
                        </div>



                        <div className="">
                            <h5 className="text-2xl ">Payments History</h5>
                            <div className="mt-4">
                                <Table TableColumns={TableColumns} PaymentHistoryData={PaymentHistoryData} IsTableLoading={IsTableLoading} isLoaderColor={true} LoaderSize='4xl' />
                                <div className="flex justify-end w-full mt-2 ">
                                    <div className="flex justify-between w-1/2">
                                        {nextPage && <button onClick={() => getPaymentHistory(nextPage)} className="px-6 py-1 font-semibold text-white rounded-md bg-custom-dark-orange">Next{nextPage}</button>}
                                        {previousPage && <button onClick={() => getPaymentHistory(previousPage)} className="px-6 py-1 font-semibold text-white rounded-md bg-custom-dark-orange">prev{previousPage}</button>}
                                        {/* <div className="flex ">
                                            <span className="">pages</span>
                                            <p className="text-center "><span className="px-2 ml-2 text-center rounded-sm bg-slate-200">1</span> of 10</p>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="px-6 py-10 border rounded-lg border-slate-300">
                            <BillingDetails setIsBillingDataEdited={setIsBillingDataEdited} ConfirmBillinginfo={ConfirmBillinginfo} isLoading={IsBillingLoading} BillingDescription={BillingDescription} formData={formData} setFormData={setFormData} setSelectedCountry={setSelectedCountry} SelectedCountry={SelectedCountry} setIsCountyDropdownOpened={setIsCountyDropdownOpened} emptyFields={emptyFields} IsCountyDropdownOpened={IsCountyDropdownOpened} />

                        </div>


                    </div>

                </div>
            </div>
            <Toaster />


        </>
    )
}

export default PaymentandBillingInfo