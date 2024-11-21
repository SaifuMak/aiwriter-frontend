import React, { useEffect, useState } from 'react'
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader'
import ManageUsers from './ManageUsers'
import Axiosinstance from '../../Axios/Axiosinstance'


function UserList({ GetUsersList, UsersData, IsLoading, setIsLoading }) {
    const cellStyle = '2xl:py-4 text-center  py-2 px-4'
    const [IsUserDetailsPopup, setIsUserDetailsPopup] = useState(false)
    const [userDetails, setuserDetails] = useState(null)

    const TableColumns = ['ID', 'Name', 'Email', 'Country', 'Join date', 'Plan', 'Renewal date', 'Last login', 'View details']


    const [formData, setFormData] = useState({

        email: '',
        name: '',
        name_of_plan: '',
        created_at: '',
        renewal_date: '',
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



    useEffect(() => {
        GetUsersList()
    }, [])


    const GetUserDetails = async (email) => {
        setIsLoading(true)

        try {
            const response = await Axiosinstance.get(`app-admin/user-details/${email}`)
            // setIsUserDetailsPopup(true)
            // setuserDetails(user)
            const user = response.data
            setFormData({
                email: user.email ? user.email : 'nill',
                name: user.name ? user.name : 'nill',
                name_of_plan: user.subscriptions.length > 0 ? user.subscriptions[0].name_of_plan : 'nill',
                created_at: user.subscriptions.length > 0 ? user.subscriptions[0].created_at : 'nill',
                renewal_date: user.subscriptions.length > 0 ? user.subscriptions[0].renewal_date : 'nill',
                firstName: user.billing_details?.firstName ? user.billing_details.firstName : 'nill',
                lastName: user.billing_details?.lastName ? user.billing_details.lastName : 'nill',
                city: user.billing_details?.city ? user.billing_details.city : 'nill',
                state: user.billing_details?.state ? user.billing_details.state : 'nill',
                country: user.billing_details?.country ? user.billing_details.country : 'nill',
                zipCode: user.billing_details?.zipCode ? user.billing_details.zipCode : 'nill',
                company: user.billing_details?.company ? user.billing_details.company : 'nill',
                taxId: user.billing_details?.taxId ? user.billing_details.taxId : 'nill',
                phone_number: user.billing_details?.phone_number ? user.billing_details.phone_number : 'nill',
            })
            setIsUserDetailsPopup(true)
            setuserDetails(user)
            setIsLoading(false)

        }
        catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <div className="relative w-full">
            {IsLoading ? (

                <div className="flex items-center justify-center h-screen ">
                    <GeneralLoader isLoaderColor={true} LoaderSize='5xl' />
                </div>

            ) : (
                <div className="p-2 overflow-x-auto   min-h-[380px] " >
                    <table className="min-w-full mt-6 bg-white ">
                        <thead >
                            <tr className="border-t border-b border-slate-400">
                                {TableColumns.map((column, index) => (
                                    <th key={index} className='px-4 py-6 font-semibold text-center text-gray-800 uppercase max-2xl:text-sm'>{column}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add multiple rows as needed */}
                            {UsersData && UsersData.map((user, index) => (

                                <tr key={index} className="border-b hover:bg-stone-50">
                                    <td className={cellStyle}>{index + 1}</td>
                                    <td className={cellStyle}>{user.name ? user.name : '_'}</td>
                                    <td className={cellStyle}>{user.email ? user.email : '_'}</td>
                                    <td className={cellStyle}>{user.details?.country ? user.details.country : '_'}</td>
                                    <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].created_at : '_'}</td>
                                    <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].name_of_plan : '_'}</td>
                                    <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].renewal_date : '_'}</td>
                                    <td className={cellStyle}>{user.last_login ? user.last_login : '_'}</td>
                                    <td onClick={() => GetUserDetails(user.email)} className='px-4 py-2 text-center cursor-pointer hover:underline 2xl:py-4 text-custom-dark-orange'>View details</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div >
            )

            }

            {IsUserDetailsPopup && <ManageUsers userDetails={userDetails} formData={formData} setIsUserDetailsPopup={setIsUserDetailsPopup} />}


        </div>


    )

}

export default UserList