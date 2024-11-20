import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminNavbar from '../../Components/Admin/AdminNavbar'
import Dashboard from '../../Components/Admin/Dashboard'
import { useSelector } from 'react-redux'
import UserList from '../../Components/Admin/UserList'
import Settings from '../../Components/Admin/Settings'
import Moderators from '../../Components/Admin/Moderators'
import Subscriptions from '../../Components/Admin/Subscriptions'
import { useEffect,useState } from 'react'
import Axiosinstance from '../../Axios/Axiosinstance'


function Admin() {

    const { currentPageOfAdmin } = useSelector(state => state.Adminslice);

    const [UsersData, setUsersData] = useState([])
    const [IsLoading, setIsLoading] = useState(true)


    const GetUsersList = async () => {

        try {

            const response = await Axiosinstance.get('app-admin/get-users-list')
            console.log(response.data)
            setUsersData(response.data)
            setIsLoading(false)
        }
        catch (error){
            console.log(error)
            setIsLoading(false)

        
        }
    }

   

    return (
        <>
            <AdminNavbar isFullWidth={true} isDashboard={false} />
            <div className='flex items-center justify-center w-full '>
                <div className="relative flex w-full ">

                    <div className="2xl:w-[260px] w-2/12 min:h-screen  pt-6 2xl:pt-8 bg-[#213343]">

                        <AdminSidebar />

                    </div>

                    <div className="w-10/12 ">
                        {currentPageOfAdmin === 'Dashboard' && <Dashboard />}
                        {currentPageOfAdmin === 'Manage Users' && <UserList GetUsersList={GetUsersList} UsersData={UsersData} IsLoading={IsLoading}  />}
                        {currentPageOfAdmin === 'Settings' && <Settings />}
                        {currentPageOfAdmin === 'Moderators' && <Moderators />}
                        {currentPageOfAdmin === 'Dashboard' && <Dashboard />}
                        {currentPageOfAdmin === 'Subscriptions' && <Subscriptions />}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin