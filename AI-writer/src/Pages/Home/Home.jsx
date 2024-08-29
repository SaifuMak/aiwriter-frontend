import React, { useState, useEffect } from 'react'
import { IoMenuOutline } from "react-icons/io5";
import ProfileDetails from '../../Components/Profile/ProfileDetails';
import Axiosinstance from '../../Axios/Axiosinstance';
import { loginSuccess, setLogout } from '../../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


import Sidebar from '../../Components/Sidebar/Sidebar'
import ArticleCard from '../../Components/ArticleCard'
import { LuLoader2 } from "react-icons/lu";


function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
  const [IsProfilePopup, setIsProfilePopup] = useState(false)
  const [isloading, setLoading] = useState(true)
  const { IsAuthenticated } = useSelector(state => state.auth);



  const GetLoginStatus = async () => {


    try {
      const response = await Axiosinstance.get('api/check_login_status')


      console.log(response.data, '&&&&&&&&&&&&&&&&&&&&333333333333333333')
      const email = response.data.email
      const username = response.data.name

      dispatch(loginSuccess({ username, email }));

      setLoading(false)
    }

    catch (error) {

      console.log(error, '&&&&&&&&&&&&&')
      dispatch(setLogout())
      navigate('/login')
      setLoading(false)


    }
  }


  useEffect(() => {

    if (!IsAuthenticated) {
      navigate('/login')

    }
    else {
      GetLoginStatus();
    }

  }, [])


  return (
    <>

      {isloading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <LuLoader2 className='text-5xl text-custom-dark-orange animate-spin' />
        </div>

      ) : (
        <div className="flex justify-center font-poppins ">
          <div className="2xl:w-2/12 lg:w-3/12 max-lg:hidden ">
            <Sidebar setIsProfilePopup={setIsProfilePopup} />
          </div>

          {IsSidebarVisible && (<div className="fixed inset-0 z-50 bg-black bg-opacity-75">
            <div className="absolute top-0 left-0 w-8/12 h-full max-w-xs bg-white shadow-lg">
              <Sidebar />
              <button
                className="absolute text-xl text-white top-2 right-4"
                onClick={() => setIsSidebarVisible(false)}
              >
                ✕
              </button>
            </div>
          </div>)}

          {IsProfilePopup && (
            <ProfileDetails setIsProfilePopup={setIsProfilePopup} />
          )}



          <div className="w-full px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">

            <div className="flex justify-between w-full px-2 py-4 md:py-6 md:px-4 xl:py-8 bg-custom-light-orange rounded-xl ">

              <div className="flex items-center justify-center space-x-3 lg:hidden ">
                <IoMenuOutline onClick={() => setIsSidebarVisible(!IsSidebarVisible)} className='text-2xl md:text-3xl' />
                <h4 className="text-base md:text-xl xl:text-2xl "> Welcome MakTal</h4>
              </div>

              <h4 className="text-xl xl:text-2xl max-lg:hidden "> Welcome MakTal</h4>
              <button className="px-3 py-2 text-sm font-semibold md:px-6 rounded-3xl text-custom-black-text hover:bg-hover-button-color bg-custom-dark-orange">Plan Details</button>
            </div>


            <div className="grid grid-cols-1 gap-12 mt-6 md:grid-cols-2 2xl:gap-20">

              <ArticleCard
                title='Article Writer 1.0'
                description={[
                  "Use real references to create your articles.",
                  "Get inspired by top ranking competitors."
                ]}
                buttonText='START WRITING'
                footer={<span><span className="font-semibold">1000 words</span> per article</span>}
              />

              <ArticleCard
                title='Article Writer 1.0'
                description={[
                  "Use real references to create your articles.",
                  "Get inspired by top ranking competitors."
                ]}
                buttonText='REWRITE NOW'
                footer={<span className="font-semibold">Unlimited usage</span>}
              />
            </div>


          </div>
        </div>

      )}



    </>
  )
}

export default Home