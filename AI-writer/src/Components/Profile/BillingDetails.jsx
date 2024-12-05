import React, { useState, useEffect } from 'react'
import InputBox from '../ArticleGenerationComponents/SmallComponents/InputBox';
import DropDown from '../ArticleGenerationComponents/SmallComponents/DropDown';
import { countries } from 'countries-list';
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader';
import SearchableDropdown from '../ArticleGenerationComponents/SmallComponents/SearchableDropdown';

function BillingDetails({IsBold = false, BillingDescription, setIsBillingDataEdited, ConfirmBillinginfo, isLoading = true, formData, setFormData, setSelectedCountry, SelectedCountry, setIsCountyDropdownOpened, emptyFields, IsCountyDropdownOpened }) {
    const OuterContainerInputBoxStyle = 'flex  w-full space-x-10'

    const [searchQuery, setSearchQuery] = useState("");



    const countryNames = Object.values(countries).map(country => country.name).sort((a, b) => a.localeCompare(b)); // Sort alphabetically;



    const HandleInputchange = (e) => {
        setIsBillingDataEdited(true)
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

    }


    const HandleCountrydropdown = () => {
        setIsCountyDropdownOpened(!IsCountyDropdownOpened)
    }


    const HandleCountrySelection = (option) => {
        setIsBillingDataEdited(true)
        setFormData({
            ...formData,
            country: option

        });
        setSelectedCountry(option)
        setSearchQuery(option)
        setIsCountyDropdownOpened(false)
    }

    return (
        <div>

            <div className="">
                <h2 className={`text-2xl ${IsBold ? 'font-semibold': ''} tracking-wide `}>Billing Information</h2>
                <p className="mt-3 ">{BillingDescription}</p>
            </div>


            <div className="mt-12 space-y-6 ">

                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='First Name' name='firstName' value={formData.firstName} onchange={HandleInputchange} is_null={emptyFields.includes('firstName')} />
                    <InputBox placeholder='Last Name' name='lastName' value={formData.lastName} onchange={HandleInputchange} is_null={emptyFields.includes('lastName')} />
                </div>

{/* 
                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='City' name='city' value={formData.city} onchange={HandleInputchange} is_null={emptyFields.includes('city')} />
                    <InputBox placeholder='State/Suburb' name='state' value={formData.state} onchange={HandleInputchange} is_null={emptyFields.includes('state')} />
                </div> */}


                <div className={OuterContainerInputBoxStyle}>
                <InputBox placeholder='Address' name='address' value={formData.address} onchange={HandleInputchange} is_null={emptyFields.includes('address')} />
                  
                    <SearchableDropdown
                        options={countryNames}
                        Toggle={HandleCountrydropdown}
                        IsOpened={IsCountyDropdownOpened}
                        HandleCountrySelection={HandleCountrySelection}
                        SelectedCountry={formData.country}
                        is_null={emptyFields.includes('country')}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                </div>


                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='State/Suburb' name='state' value={formData.state} onchange={HandleInputchange} is_null={emptyFields.includes('state')} />
                    <InputBox placeholder='City' name='city' value={formData.city} onchange={HandleInputchange} is_null={emptyFields.includes('city')} />
                </div>


                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='Zip Code' name='zipCode' value={formData.zipCode} onchange={HandleInputchange} is_null={emptyFields.includes('zipCode')} />
                    <InputBox placeholder='Phone Number' name='phone_number' value={formData.phone_number} onchange={HandleInputchange} is_null={emptyFields.includes('phone_number')} />
                </div>

                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='Company' name='company' value={formData.company} onchange={HandleInputchange} is_null={emptyFields.includes('company')} />
                    <InputBox placeholder='VAT/Tax ID' name='taxId' value={formData.taxId} onchange={HandleInputchange} is_null={emptyFields.includes('taxId')} />
                </div>

{/* 
                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='Company' name='company' value={formData.company} onchange={HandleInputchange} is_null={emptyFields.includes('company')} />
                    <InputBox placeholder='VAT/Tax ID' name='taxId' value={formData.taxId} onchange={HandleInputchange} is_null={emptyFields.includes('taxId')} />
                </div>

                <div className={OuterContainerInputBoxStyle}>
                    <InputBox placeholder='Phone Number' name='phone_number' value={formData.phone_number} onchange={HandleInputchange} is_null={emptyFields.includes('phone_number')} />

                    <span className="w-1/2"></span>

                </div> */}
            </div>

            <div className="mt-9 ">
                <button onClick={ConfirmBillinginfo} className=" bg-[#44AA55] rounded-md flex justify-center items-center w-32 h-9 font-semibold text-white" disabled={isLoading}>{isLoading ? <GeneralLoader /> : 'SAVE'} </button>
            </div>

            <div className="flex items-center justify-center px-20 pt-10">
                <p className="text-center  text-[#333333] text-sm">We respect your privacy. We store your data securely and used for accessing account
                    related information. You may also get promotional Emails from Sembytes.</p>
            </div>
        </div>
    )
}

export default BillingDetails
