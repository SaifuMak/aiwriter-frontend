import React, { useEffect, useState } from 'react'
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader'
import ManageUsers from './ManageUsers'
import Axiosinstance from '../../Axios/Axiosinstance'
import Dashboard from './Dashboard'
import Pagination from '../GeneralComponets/Pagination'

function UserList({ GetUsersList, UsersData, IsLoading, setIsLoading, nextPage, prevPage, currentPage, TotalPages }) {
    const cellStyle = '2xl:py-4 text-center  py-2 px-4'
    const [IsUserDetailsPopup, setIsUserDetailsPopup] = useState(false)
    const [userDetails, setuserDetails] = useState(null)
    const [ShowUserDetails, setShowUserDetails] = useState(false)
    const [UserUpdated, setUserUpdated] = useState(false)


    const TableColumns = ['ID', 'Name', 'Email', 'Country', 'Join date', 'Plan', 'Renewal date', 'Last login', 'View details']


    const [formData, setFormData] = useState({

        email: '',
        name: '',
        last_login: '',
        name_of_plan: '',
        words_count: '',
        plaigarism_words: '',
        add_on_words_count: '',
        add_on_plaigarism_words: '',
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
        GetUsersList(currentPage)
    }, [UserUpdated])


    const GetUserDetails = async (email) => {

        setIsLoading(true)

        try {
            const response = await Axiosinstance.get(`app-admin/user-details/${email}`)
            // setIsUserDetailsPopup(true)
            // setuserDetails(user)

            const user = response.data

            setFormData({
                email: user.email ? user.email : '',
                last_login: user.last_login ? user.last_login : '',
                name: user.name ? user.name : '',

                name_of_plan: user.subscriptions.length > 0 ? user.subscriptions[0].name_of_plan : '',
                created_at: user.subscriptions.length > 0 ? user.subscriptions[0].created_at : '',
                renewal_date: user.subscriptions.length > 0 ? user.subscriptions[0].renewal_date : '',
                words_count: user.subscriptions.length > 0 ? user.subscriptions[0].words_count : '',
                plaigarism_words: user.subscriptions.length > 0 ? user.subscriptions[0].plaigarism_words : '',
                add_on_words_count: user.subscriptions.length > 0 ? user.subscriptions[0].add_on_words_count : '',
                add_on_plaigarism_words: user.subscriptions.length > 0 ? user.subscriptions[0].add_on_plaigarism_words : '',

                firstName: user.billing_details?.firstName ? user.billing_details.firstName : '',
                lastName: user.billing_details?.lastName ? user.billing_details.lastName : '',
                city: user.billing_details?.city ? user.billing_details.city : '',
                state: user.billing_details?.state ? user.billing_details.state : '',
                country: user.billing_details?.country ? user.billing_details.country : '',
                zipCode: user.billing_details?.zipCode ? user.billing_details.zipCode : '',
                company: user.billing_details?.company ? user.billing_details.company : '',
                taxId: user.billing_details?.taxId ? user.billing_details.taxId : '',
                phone_number: user.billing_details?.phone_number ? user.billing_details.phone_number : '',
            })

            setuserDetails(user)
            setIsLoading(false)
            setIsUserDetailsPopup(true)

        }
        catch (error) {
            setIsLoading(false)
        }
    }


    return (
        <>
            {!IsUserDetailsPopup ? (

                <div className="relative w-full">
                    {IsLoading ? (

                        <div className="flex items-center justify-center h-screen ">
                            {/* <GeneralLoader isLoaderColor={true} LoaderSize='5xl' /> */}
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
                                            <td className={cellStyle}>{user.name ? user.name : 'N/A'}</td>
                                            <td className={cellStyle}>{user.email ? user.email : 'N/A'}</td>
                                            <td className={cellStyle}>{user.details?.country ? user.details.country : 'N/A'}</td>
                                            <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].created_at : 'N/A'}</td>
                                            <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].name_of_plan : 'N/A'}</td>
                                            <td className={cellStyle}>{user.subscriptions.length > 0 ? user.subscriptions[0].renewal_date : 'N/A'}</td>
                                            <td className={cellStyle}>{user.last_login ? user.last_login : 'N/A'}</td>
                                            <td onClick={() => GetUserDetails(user.email)} className='px-4 py-2 text-center cursor-pointer hover:underline 2xl:py-4 text-custom-dark-orange'>View details</td>
                                        </tr>
                                    ))}


                                </tbody>
                            </table>
                        </div >
                    )
                    }

                    {/* {IsUserDetailsPopup && <ManageUsers userDetails={userDetails} formData={formData} ShowUserDetails={ShowUserDetails} />} */}



                    <Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={GetUsersList}
                        currentPage={currentPage}
                        TotalPages={TotalPages}
                    />


                    {/* <div className="flex justify-end px-8 mt-8 space-x-4 ">
                        <div className="flex justify-between w-7/12">
                            <div className="space-x-2 ">
                                <button onClick={() => GetUsersList(prevPage)} disabled={prevPage < 1} className={`px-6 py-1 text-white rounded-md  ${prevPage > 0 ? ' bg-custom-dark-orange' : 'bg-custom-dark-orange opacity-40'} bg-custom-dark-orange `}>prev</button>

                                <button onClick={() => GetUsersList(nextPage)} disabled={nextPage == 1} className={`px-6 py-1 text-white rounded-md ${nextPage ? ' bg-custom-dark-orange' : 'bg-custom-dark-orange opacity-40'} `}>next</button>
                            </div>
                            <p className="flex items-center justify-center ">page <span className="flex items-center justify-center px-2 mx-1 rounded-sm bg-slate-200">{currentPage} </span>  of {TotalPages}</p>
                        </div>
                    </div> */}


                </div>
            ) : (
                <ManageUsers setUserUpdated={setUserUpdated} userDetails={userDetails} formData={formData} setIsUserDetailsPopup={setIsUserDetailsPopup} setFormData={setFormData} />

            )}


        </>


    )

}

export default UserList