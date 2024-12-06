import React, { useEffect } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminNavbar from '../../Components/Admin/AdminNavbar'
import Dashboard from '../../Components/Admin/Dashboard'
import UserList from '../../Components/Admin/UserList'
import Settings from '../../Components/Admin/Settings'
import Moderators from '../../Components/Admin/Moderators'
import Subscriptions from '../../Components/Admin/Subscriptions'
import { useState } from 'react'
import Axiosinstance from '../../Axios/Axiosinstance'
import SessionExpiredPopup from '../../Components/ArticleGenerationComponents/SmallComponents/SessionExpiredPopup'
import { HandleForbiddenGenericErrors } from '../../Utils/ErrorMessageHandler'
import { useSelector, useDispatch } from 'react-redux'
import OpacityLoader from '../../Components/GeneralComponets/Loaders/OpacityLoader'
import { getPageNumber } from '../../Utils/Helperfunctions'
import { getTotalPagesCount } from '../../Utils/Helperfunctions'
import { useNavigate } from 'react-router-dom'



function Admin() {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { IsSessionExpired } = useSelector((state) => state.Navigation);

    const { currentPageOfAdmin } = useSelector(state => state.Adminslice);

    const [UsersData, setUsersData] = useState([])
    const [SubscriptionsData, setSubscriptionsData] = useState([])
    const [IsLoading, setIsLoading] = useState(true)

    const [nextPageUserslist, setNextPageUserslist] = useState(null); // Next page URL
    const [prevPageUserslist, setPrevPageUserslist] = useState(null); // Previous page URL
    const [currentPageUserList, setCurrentPageUserList] = useState(1)
    const [TotalPagesUserList, setTotalPagesUserList] = useState(null)


    const [nextPageSubcriptionList, setNextPageSubscriptionList] = useState(null); // Next page URL
    const [prevPageSubcriptionList, setPrevPageSubscriptionList] = useState(null); // Previous page URL
    const [currentPageSubcriptionList, setCurrentPageSubcriptionList] = useState(1)
    const [TotalPagesSubcriptionList, setTotalPagesSubcriptionList] = useState(null)


    const GetLoginStatus = async () => {
        try {
          const response = await Axiosinstance.get('api/check_login_status')
    
         
          const IsAdmin = response.data.is_staff
          
          if(!IsAdmin){
            navigate('/')
          }
          
          setIsLoading(false)
        }
    
        catch (error) {
    
            setIsLoading(false)
    
    
        }
      }

    const GetUsersList = async (page = 1) => {
        try {

            const response = await Axiosinstance.get(`app-admin/get-users-list?page=${page}`);

            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)

            setCurrentPageUserList(page)
            setUsersData(response.data.results)
            setNextPageUserslist(nextpage)
            setPrevPageUserslist(previous)

            const totalPages = getTotalPagesCount(response.data.count, 10)
            setTotalPagesUserList(totalPages)
            setIsLoading(false)
        }

        catch (error) {
            console.log(error)
            setIsLoading(false)
            HandleForbiddenGenericErrors(error, dispatch)
        }
    }


    const GetSubscriptionsListofUsers = async (page = 1,fromDate=null, toDate=null,search=null) => {

        try {
            const response = await Axiosinstance.get(`app-admin/get-users-subscriptions?page=${page}&fromDate=${fromDate}&toDate=${toDate}&search=${search}`)
            console.log(response.data)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)

            setCurrentPageSubcriptionList(page)
            setSubscriptionsData(response.data.results)
            setNextPageSubscriptionList(nextpage)
            setPrevPageSubscriptionList(previous)

            const totalPages = getTotalPagesCount(response.data.count, 10)
            setTotalPagesSubcriptionList(totalPages)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
            HandleForbiddenGenericErrors(error, dispatch)
        }
    }


    useEffect(() => {
        GetLoginStatus()
    }, [])
    


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
                        {currentPageOfAdmin === 'Manage Users' && <UserList GetUsersList={GetUsersList} UsersData={UsersData} IsLoading={IsLoading} setIsLoading={setIsLoading} nextPage={nextPageUserslist} prevPage={prevPageUserslist} currentPage={currentPageUserList} TotalPages={TotalPagesUserList} />}
                        {currentPageOfAdmin === 'Settings' && <Settings />}
                        {currentPageOfAdmin === 'Moderators' && <Moderators />}
                        {currentPageOfAdmin === 'Dashboard' && <Dashboard />}
                        {currentPageOfAdmin === 'Subscriptions' && <Subscriptions GetSubscriptionsListofUsers={GetSubscriptionsListofUsers} setIsLoading={setIsLoading} IsLoading={IsLoading} SubscriptionsData={SubscriptionsData} nextPage={nextPageSubcriptionList} prevPage={prevPageSubcriptionList} currentPage={currentPageSubcriptionList} TotalPages={TotalPagesSubcriptionList} />}
                    </div>
                </div>
            </div>
            {IsSessionExpired && <SessionExpiredPopup />}
            {/* {IsLoading && <OpacityLoader />} */}
        </>
    )
}

export default Admin