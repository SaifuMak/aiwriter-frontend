import React, { useState,useEffect } from 'react'
import InputComponent from './SmallComponents/InputComponent';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { ValidateAccountBillingForm } from '../../Utils/Validations';
import ErrorToast from '../../Utils/ErrorToast';
import SuccessToast from '../../Utils/SuccessToast';
import { Toaster, toast } from 'sonner';
import Axiosinstance from '../../Axios/Axiosinstance';
import { formControlClasses } from '@mui/material';



function ManageUsers({ userDetails, formData, setIsUserDetailsPopup, setFormData,setUserUpdated }) {


    const [Iseditable, setIseditable] = useState(false)
    const [HasAPlan, setHasAPlan] = useState(false)
  const [Email, setEmail] = useState('')


    const HandleGoBack = () => {
        setIsUserDetailsPopup(false)
    }

    const handleIseditable = (state) => {
        if (formData.name_of_plan) {
            setHasAPlan(true)
        }
        setIseditable(state)
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Field: ${name}, Value: ${value}`); // Debugging
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    const confirmUpdate = async () => {

        toast.dismiss()
        
        const error = ValidateAccountBillingForm(formData)
        if (error) {
            ErrorToast(error)
            return
        }
       

        try {
            const response = await Axiosinstance.post(`app-admin/user-details/${Email}`, formData)

            setUserUpdated(true)
        setIsUserDetailsPopup(false)


        }
        catch (error) {
            console.log(error)
        }


        console.log(formData)
    }


    useEffect(() => {
        setEmail(formData.email)
    }, [])
    


    return (
        <div className="flex items-center justify-center w-full bg-white ">
            <div className={`w-full py-10  ${Iseditable ? 'px-16' : 'px-6'} `}>
                <div className="flex space-x-6">
                    <h2 className="text-2xl font-semibold tracking-wider "> User Profile</h2>
                    <button onClick={HandleGoBack} className="px-4 py-1.5 duration-150 hover:bg-slate-100 rounded-2xl font-semibold border flex group items-center border-custom-dark-orange"><MdOutlineKeyboardBackspace className='mr-1 text-xl transition-transform duration-300 ease-in-out group-hover:-translate-x-1.5' />Go back</button>
                </div>

                <div className={`flex w-full mt-6 ${Iseditable ? '' : 'space-x-12'} `}>


                    <div className={` px-8 py-10 ${Iseditable ? 'hidden' : 'w-4/12'} border rounded-lg h-96`}>
                        <div className="flex flex-col">
                            <div className="flex items-center text-4xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-16 lg:h-16 text-custom-dark-orange bg-[#213343]">{formData.name ? formData.name[0] : 'U'}</div>
                            <div className="flex flex-col ">
                                <span className="text-xl mt-1 text-[#3D3D3D] font-semibold">{formData.name ? formData.name : 'N/A'}</span>
                            </div>
                            <hr className="my-4 border-t opacity-60 border-custom-dark-orange" />
                        </div>

                        <div className="space-y-3 ">

                            <div className="">
                                <p className="">Email address</p>
                                <p className="font-semibold text-[#3D3D3D] ">{formData.email ? formData.email : 'N/A'}</p>
                            </div>

                            <div className="">
                                <p className="">Phone</p>
                                <p className="font-semibold text-[#3D3D3D] ">{formData.phone_number ? formData.phone_number : 'N/A'}</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-full space-y-5">
                        <div className="w-full px-8 py-6 border rounded-lg">
                            <h3 className="text-2xl font-semibold tracking-wide ">Account Information</h3>

                            {Iseditable && (<div className="flex flex-col my-6">
                                <div className="flex items-center text-4xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-16 lg:h-16 text-custom-dark-orange bg-[#213343]">{userDetails.name ? userDetails.name[0] : 'U'}</div>
                                <div className="flex flex-col ">
                                    <span className="text-xl mt-1 text-[#3D3D3D] font-semibold">{formData.name ? formData.name : 'N/A'}</span>
                                    <span className="text-[#3D3D3D]">Last login : {formData.last_login ? formData.last_login : 'N/A'}</span>
                                </div>
                            </div>)}



                            {!Iseditable && <InputComponent handleInputChange={handleInputChange} name='name' label='Name:' value={formData.name} isInline={true} />}
                            <InputComponent handleInputChange={handleInputChange} name='email' label='Email address:' value={formData.email} isInline={true} Iseditable={Iseditable} />
                            <InputComponent handleInputChange={handleInputChange} name='name_of_plan' label='Plan name:' value={formData.name_of_plan} isInline={true} />
                            <InputComponent handleInputChange={handleInputChange} name='created_at' label='Join Date:' value={formData.created_at} span={formData.amount} isInline={true} />
                            <InputComponent handleInputChange={handleInputChange} name='renewal_date' label='Renewal Date:' value={formData.renewal_date} isInline={true} />

                            <InputComponent handleInputChange={handleInputChange} name='words_count' label='Words credits:' value={formData.words_count} isInline={true} Iseditable={Iseditable && HasAPlan} />
                            <InputComponent handleInputChange={handleInputChange} name='plaigarism_words' label='Plaigarism credits:' value={formData.plaigarism_words} isInline={true} Iseditable={Iseditable && HasAPlan} />
                            <InputComponent handleInputChange={handleInputChange} name='add_on_words_count' label='Add-on words credits:' value={formData.add_on_words_count} isInline={true} Iseditable={Iseditable && HasAPlan} />
                            <InputComponent handleInputChange={handleInputChange} name='add_on_plaigarism_words' label='Add-on plaigarism credits:' value={formData.add_on_plaigarism_words} isInline={true} Iseditable={Iseditable && HasAPlan} />
                        </div>


                        <div className="w-full px-8 py-6 space-y-5 border rounded-lg ">
                            <h2 className="text-2xl font-semibold tracking-wider">Billing Information</h2>
                            {Iseditable && <p className="">These details will be used to provide invoices for your purchases. Please make sure you are entering
                                right details. If you change the below details, new invoices will reflect new data.</p>}

                            <div className="flex justify-between ">
                                <InputComponent handleInputChange={handleInputChange} name='firstName' label='First Name' value={formData.firstName} Iseditable={Iseditable} />
                                <InputComponent handleInputChange={handleInputChange} name='lastName' label='Last Name' value={formData.lastName} Iseditable={Iseditable} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent handleInputChange={handleInputChange} name='city' label='City' value={formData.city} Iseditable={Iseditable} />
                                <InputComponent handleInputChange={handleInputChange} name='state' label='State/Suburb' value={formData.state} Iseditable={Iseditable} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent handleInputChange={handleInputChange} name='country' label='Country' value={formData.country} Iseditable={Iseditable} />
                                <InputComponent handleInputChange={handleInputChange} name='zipCode' label='Zip Code' value={formData.zipCode} Iseditable={Iseditable} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent handleInputChange={handleInputChange} name='company' label='Company' value={formData.company} Iseditable={Iseditable} />
                                <InputComponent handleInputChange={handleInputChange} name='taxId' label='VAT/Tax ID' value={formData.taxId} Iseditable={Iseditable} />
                            </div>

                            <div className="flex justify-between ">
                                <InputComponent handleInputChange={handleInputChange} name='phone_number' label='Phone' value={formData.phone_number} Iseditable={Iseditable} />
                            </div>

                            <div className="">
                                {Iseditable ? (
                                    <div className="flex justify-between">
                                        <button onClick={confirmUpdate} className="bg-[#44AA55] mt-4 hover:bg-green-600 rounded-md px-9 py-1.5 text-white">Save changes</button>
                                        <button onClick={() => handleIseditable(false)} className="bg-[#181B18] mt-4  rounded-md px-9 py-1.5 text-white">Cancel</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleIseditable(true)} className="bg-[#44AA55] hover:bg-green-600 mt-6 rounded-md px-9 py-1.5 text-white">Edit details</button>

                                )}
                            </div>
                        </div>

                        {!Iseditable && (<div className="flex justify-end ">
                            <button className="bg-[#F20000] text-white w-36 h-9 rounded-md">suspend</button>
                        </div>)}
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default ManageUsers