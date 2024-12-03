import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import { Toaster, toast } from 'sonner';
import _ from 'lodash';  // Import Lodash
import ArticleHistory from '../Components/ArticleHistory';
import PlagiarismHistory from '../Components/PlagiarismHistory';
import { useDispatch, useSelector } from 'react-redux';
import SessionExpiredPopup from '../Components/ArticleGenerationComponents/SmallComponents/SessionExpiredPopup';



function History() {
    
    const { HistoryTab } = useSelector(state => state.Navigation);
    const { IsSessionExpired } = useSelector((state) => state.Navigation);
    const [IsProfilePopup, setIsProfilePopup] = useState(false)

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

                {SelectedTab === 'Article' && <ArticleHistory handleToggle={handleToggle} SelectedTab={SelectedTab} />  }
                {SelectedTab === 'Plagiarism' && <PlagiarismHistory handleToggle={handleToggle} SelectedTab={SelectedTab} />  }

                <Toaster />
            </div>

            {IsSessionExpired && <SessionExpiredPopup />}
        </>
    )
}

export default History