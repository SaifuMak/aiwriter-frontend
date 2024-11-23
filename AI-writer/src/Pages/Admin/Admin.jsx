import React from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminNavbar from '../../Components/Admin/AdminNavbar'
import Dashboard from '../../Components/Admin/Dashboard'
import UserList from '../../Components/Admin/UserList'
import Settings from '../../Components/Admin/Settings'
import Moderators from '../../Components/Admin/Moderators'
import Subscriptions from '../../Components/Admin/Subscriptions'
import { useEffect,useState } from 'react'
import Axiosinstance from '../../Axios/Axiosinstance'
import SessionExpiredPopup from '../../Components/ArticleGenerationComponents/SmallComponents/SessionExpiredPopup'
import { HandleForbiddenGenericErrors } from '../../Utils/ErrorMessageHandler'
import { useSelector, useDispatch } from 'react-redux'
import OpacityLoader from '../../Components/GeneralComponets/Loaders/OpacityLoader'

function Admin() {
    const dispatch = useDispatch()
    const { IsSessionExpired } = useSelector((state) => state.Navigation);

    const { currentPageOfAdmin } = useSelector(state => state.Adminslice);

    const [UsersData, setUsersData] = useState([])
     const [SubscriptionsData, setSubscriptionsData] = useState([])
    const [IsLoading, setIsLoading] = useState(true)


    const GetUsersList = async () => {

        try {

            const response = await Axiosinstance.get('app-admin/get-users-list')
            setUsersData(response.data)
            setIsLoading(false)
        }
        catch (error){
            console.log(error)
            setIsLoading(false)
            HandleForbiddenGenericErrors(error,dispatch)

        
        }
    }



    const GetSubscriptionsListofUsers = async () => {

        try {

            const response = await Axiosinstance.get('app-admin/get-users-subscriptions')
            console.log(response.data)
            setSubscriptionsData(response.data)
            setIsLoading(false)
        }
        catch (error){
            console.log(error)
            setIsLoading(false)
            HandleForbiddenGenericErrors(error,dispatch)
        }
    }

   

    return (
        <>
            <AdminNavbar isFullWidth={true} isDashboard={false} />
            <div className='flex items-center justify-center w-full font-poppins '>
                <div className="relative flex w-full ">

                    <div className=" w-2/12 min-h-screen  pt-6 2xl:pt-8 bg-[#213343]">

                        <AdminSidebar />

                    </div>

                    <div className="w-10/12 ">
                        {currentPageOfAdmin === 'Dashboard' && <Dashboard />}
                        {currentPageOfAdmin === 'Manage Users' && <UserList GetUsersList={GetUsersList} UsersData={UsersData} IsLoading={IsLoading} setIsLoading={setIsLoading}  />}
                        {currentPageOfAdmin === 'Settings' && <Settings />}
                        {currentPageOfAdmin === 'Moderators' && <Moderators />}
                        {currentPageOfAdmin === 'Dashboard' && <Dashboard />}
                        {currentPageOfAdmin === 'Subscriptions' && <Subscriptions GetSubscriptionsListofUsers={GetSubscriptionsListofUsers} setIsLoading={setIsLoading} IsLoading={IsLoading} SubscriptionsData={SubscriptionsData} />}
                    </div>
                </div>
            </div>
          {IsSessionExpired &&   <SessionExpiredPopup/>}
         {IsLoading && <OpacityLoader/> } 
        </>
    )
}

export default Admin