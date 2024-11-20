import React, { useEffect, useState } from 'react'
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader'

function UserList({ GetUsersList, UsersData, IsLoading }) {
    const cellStyle = '2xl:py-4 text-center  py-2 px-4'

    const TableColumns = ['ID', 'Name', 'Email', 'Country', 'Join date', 'Plan', 'Renewal date', 'Last login', 'View details']


    useEffect(() => {
        GetUsersList()
    }, [])


    return (
        <>
            {IsLoading ? (

                <div className="flex items-center justify-center h-screen ">
                    <GeneralLoader isLoaderColor={true} LoaderSize='5xl'/>
                </div>

            ) : (
                <div className="p-2 overflow-x-auto  min-h-[380px] " >
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
                                    <td className='px-4 py-2 text-center cursor-pointer hover:underline 2xl:py-4 text-custom-dark-orange'>View details</td>
                                </tr>
                            ))}


                        </tbody>
                    </table>
                </div >
            )

            }
        </>


    )

}

export default UserList