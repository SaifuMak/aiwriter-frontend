import React, { useState, useEffect } from 'react'
import { IoMenuOutline } from "react-icons/io5";
import ProfileDetails from '../../Components/Profile/ProfileDetails';
import Axiosinstance from '../../Axios/Axiosinstance';
import { loginSuccess, setLogout } from '../../Redux/Slices/AuthSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { ResetArticleGenerator } from '../../Utils/Helperfunctions'
import CardComponent from '../../Components/CardComponent';
import { setSelectedPage } from '../../Redux/Slices/NavigationSlice'

import Sidebar from '../../Components/Sidebar/Sidebar'
import ArticleCard from '../../Components/ArticleCard'
import { LuLoader2 } from "react-icons/lu";
import Popup from '../../Components/ArticleGenerationComponents/SmallComponents/Popup';

function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
  const [IsProfilePopup, setIsProfilePopup] = useState(false)
  const [isloading, setLoading] = useState(false)
  const [ShowPopUp, setShowPopUp] = useState(false)


  const { IsAuthenticated } = useSelector(state => state.auth);
  const { PlanAmount } = useSelector(state => state.Assets);


  useEffect(() => {

    dispatch(setSelectedPage('Home'))
    
  }, [])


  const GetLoginStatus = async () => {
    try {
      const response = await Axiosinstance.get('api/check_login_status')

      const email = response.data.email
      const username = response.data.name
      const IsAdmin = response.data.is_staff
      console.log('called the check status---------------- ')

      dispatch(loginSuccess({ username, email, IsAdmin }));

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
      setLoading(true)

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
        <div className="flex justify-center h-full font-poppins ">
          <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
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



          <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">

            <div className="flex justify-between w-full px-2 py-4 md:py-6 md:px-4 xl:py-8 bg-custom-dark rounded-xl ">

              <div className="flex items-center justify-center space-x-3 lg:hidden ">
                <IoMenuOutline onClick={() => setIsSidebarVisible(!IsSidebarVisible)} className='text-2xl md:text-3xl' />
                <h4 className="text-base text-white md:text-xl xl:text-2xl "> Welcome MakTal</h4>
              </div>

              <h4 className="pl-4 text-xl text-white xl:text-2xl max-lg:hidden "> Welcome MakTal</h4>
              {PlanAmount === 0 ? (
                <Link to='/purchase-plan'><button className="px-3 py-2 text-sm font-semibold text-white md:px-6 rounded-3xl hover:bg-hover-button-color bg-custom-dark-orange">Purchase Plan </button></Link>

              ) : (

                <Link to='/plan-details'><button className="px-3 py-2 text-sm font-semibold text-white md:px-6 rounded-3xl hover:bg-hover-button-color bg-custom-dark-orange">Plan Details</button></Link>

              )}
            </div>


            <div className="grid grid-cols-1 gap-16 mt-10 md:grid-cols-2 2xl:gap-x-32">

              {/* <ArticleCard
                title='Article Writer 1.0'
                description={[
                  "Use real references to create your articles.",
                  "Get inspired by top ranking competitors."
                ]}
                buttonText='START WRITING'
                LinkTo='/article-generation'
                FunctionToCall={ResetArticleGenerator}

                footer={<span><span className="font-semibold">1000 words</span> per article</span>}
              />


              <ArticleCard
                title='Article Writer 2.0'
                description={[
                  "Use real references to create your articles.",
                  "Get inspired by top ranking competitors."
                ]}
                buttonText='REWRITE NOW'
                LinkTo='/quick-article-generation'
                FunctionToCall={ResetArticleGenerator}
                footer={<span className="font-semibold">Unlimited usage</span>}
              /> */}

              <CardComponent
                title='Article Writer '
                description={[
                  'Our most powerful Article Writer where you can plan entire structure of the content.'
                ]}
                buttonText='START WRITING'
                LinkTo='/choose-article-writer'
                EnablePopUp={setShowPopUp}

              // FunctionToCall={ResetArticleGenerator}
              />

              <CardComponent
                title='Article Rewriter '
                description={[
                  'Choose a topic and headline and our tool will do the remaining.',
                  'Recommended if you need only limited control over the content',
                ]}
                buttonText='REWRITE NOW'
                LinkTo='/quick-article-generation'
                EnablePopUp={setShowPopUp}

              // FunctionToCall={ResetArticleGenerator}
              />

              <CardComponent
                title='Plagiarism Checker '
                description={[
                  'Check your content for plagiarism and find if its unique or copied from anywhere.'
                ]}
                buttonText='CHECK NOW'
                LinkTo='/plagiarism-checker'
                EnablePopUp={setShowPopUp}
              // FunctionToCall={ResetArticleGenerator}
              />
            </div>

          </div>
        </div>

      )}

      {ShowPopUp && <Popup
        ShowPopUp={setShowPopUp}
        message='Oops! No active plan found. Please purchase a plan to proceed.'
        actionLabel='Purchase'
        cancelLabel='Cancel'
        actionLink='/purchase-plan'
      />}

    </>
  )
}

export default Home