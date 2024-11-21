import React, { useState } from 'react'
import InputComponent from './SmallComponents/InputComponent';
import { MdOutlineKeyboardBackspace } from "react-icons/md";


function ManageUsers({ userDetails, formData, setIsUserDetailsPopup }) {


    const HandleGoBack = () => {
        setIsUserDetailsPopup(false)
    }


    return (
        <div className="absolute inset-0 flex items-center justify-center bg-white ">
            <div className="w-full p-6 bg-white min:h-full ">
                <div className="flex space-x-6">
                    <h2 className="text-2xl font-semibold tracking-wider "> User Profile</h2>
                    <button onClick={HandleGoBack} className="px-4 py-1.5 bg-slate-100 rounded-2xl font-semibold border flex group items-center border-custom-dark-orange"><MdOutlineKeyboardBackspace className='mr-1 text-xl transition-transform duration-300 ease-in-out group-hover:-translate-x-1.5' />Go back</button>
                </div>
                <div className="flex w-full mt-6 space-x-12">




                    <div className="w-4/12 px-8 py-10 border rounded-lg h-96">
                        <div className="flex flex-col">
                            <div className="flex items-center text-4xl justify-center shadow-custom-dark-orange border-2  border-custom-dark-orange w-12 h-12 rounded-full max-lg:text-2xl lg:w-16 lg:h-16 text-custom-dark-orange bg-[#213343]">{userDetails.name ? userDetails.name[0] : 'U'}</div>
                            <div className="flex flex-col pl-1">
                                <span className="text-xl mt-1 text-[#3D3D3D] font-semibold">{formData.name}</span>
                            </div>
                            <hr className="my-4 border-t opacity-60 border-custom-dark-orange" />
                        </div>

                        <div className="space-y-3 ">

                            <div className="">
                                <p className="">Email address</p>
                                <p className="font-semibold text-[#3D3D3D] ">{formData.email}</p>
                            </div>

                            <div className="">
                                <p className="">Phone</p>
                                <p className="font-semibold text-[#3D3D3D] ">{formData.email}</p>
                            </div>
                        </div>
                    </div>




                    <div className="w-full space-y-5">
                        <div className="w-full px-8 py-10 border rounded-lg">
                            <h3 className="text-2xl font-semibold tracking-wide ">Account Information</h3>
                            <InputComponent label='Name:' value={formData.name} isInline={true} />
                            <InputComponent label='Email address:' value={formData.email} isInline={true} />
                            <InputComponent label='Plan details:' value={formData.name_of_plan} isInline={true} />
                            <InputComponent label='Join Date:' value={formData.created_at} span={formData.amount} isInline={true} />
                            <InputComponent label='Renewal Date:' value={formData.renewal_date} isInline={true} />
                        </div>

                        <div className="w-full px-8 py-10 space-y-5 border rounded-lg ">
                            <h2 className="text-2xl font-semibold tracking-wider">Billing Information</h2>

                            <div className="flex justify-between ">
                                <InputComponent label='First Name' value={formData.firstName} />
                                <InputComponent label='Last Name' value={formData.lastName} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent label='City' value={formData.city} />
                                <InputComponent label='State/Suburb' value={formData.state} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent label='Country' value={formData.country} />
                                <InputComponent label='Zip Code' value={formData.zipCode} />
                            </div>
                            <div className="flex justify-between ">
                                <InputComponent label='Company' value={formData.company} />
                                <InputComponent label='VAT/Tax ID' value={formData.taxId} />
                            </div>

                            <div className="flex justify-between ">

                                <InputComponent label='Phone' value={formData.phone_number} />

                            </div>

                            <div className=""> 
                                <button className="bg-[#44AA55] hover:bg-green-600 rounded-md px-9 py-1.5 text-white">Edit details</button>
                            </div>


                        </div>
                    </div>




                </div>

            </div>
        </div>
    )
}

export default ManageUsers