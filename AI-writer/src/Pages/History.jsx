import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import { Toaster, toast } from 'sonner';
import _ from 'lodash';  // Import Lodash
import ArticleHistory from '../Components/ArticleHistory';
import PlagiarismHistory from '../Components/PlagiarismHistory';
import { useDispatch, useSelector } from 'react-redux';
import SessionExpiredPopup from '../Components/ArticleGenerationComponents/SmallComponents/SessionExpiredPopup';

import ProfileDetails from '../Components/Profile/ProfileDetails';
import Sidebar from '../Components/Sidebar/Sidebar';


function History() {
    
    const { HistoryTab } = useSelector(state => state.Navigation);
    const { IsSessionExpired } = useSelector((state) => state.Navigation);
    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
    const [SelectedTab, setSelectedTab] = useState('Article')


    const handleToggle = (option)=>{
      setSelectedTab(option)
        // setSelectedTab(option)
     }
     

    console.log(HistoryTab,'this is the selected tab for the history ')
 
    return (
        <>
           

           <div className="flex justify-center h-full font-poppins ">

                <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
                    <Sidebar setIsProfilePopup={setIsProfilePopup} />
                </div>

                {IsSidebarVisible && (<div className="fixed inset-0 z-50 bg-black bg-opacity-75">
                    <div className="absolute top-0 left-0 w-8/12 h-screen max-w-xs bg-white shadow-lg lg:h-full">
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

                {SelectedTab === 'Article' && <ArticleHistory handleToggle={handleToggle} SelectedTab={SelectedTab} />  }
                {SelectedTab === 'Plagiarism' && <PlagiarismHistory handleToggle={handleToggle} SelectedTab={SelectedTab} />  }

                <Toaster />
            </div>

            {IsSessionExpired && <SessionExpiredPopup />}
        </>
    )
}

export default History