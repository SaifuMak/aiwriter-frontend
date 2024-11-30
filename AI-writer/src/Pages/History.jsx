import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
// import Axiosinstance from '../Axios/Axiosinstance'
// import { FaRegBookmark } from "react-icons/fa";
// import { FaRegStar } from "react-icons/fa6";
// import { RxCross2 } from "react-icons/rx";
// import OpacityLoader from '../Components/GeneralComponets/Loaders/OpacityLoader';
// import FileViewer from '../Components/GeneralComponets/FileViewer/FileViewer';
// import { getPageNumber, getTotalPagesCount } from '../Utils/Helperfunctions';
// import Pagination from '../Components/GeneralComponets/Pagination';
import { Toaster, toast } from 'sonner';
// import SuccessToast from '../Utils/SuccessToast';
// import ErrorToast from '../Utils/ErrorToast';
// import CustomToolTip from '../Components/ArticleGenerationComponents/SmallComponents/CustomToolTip';
// import DropdownComponent from '../Components/DropdownComponent';
import _ from 'lodash';  // Import Lodash
import ArticleHistory from '../Components/ArticleHistory';
import PlagiarismHistory from '../Components/PlagiarismHistory';
import { useDispatch, useSelector } from 'react-redux';
import SessionExpiredPopup from '../Components/ArticleGenerationComponents/SmallComponents/SessionExpiredPopup';


function History() {
    const { HistoryTab } = useSelector(state => state.Navigation);
    const { IsSessionExpired } = useSelector((state) => state.Navigation);

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    

    return (
        <>
            {/* <AdminNavbar isDashboard={false} isFullWidth={true} /> */}
            <div className="flex justify-center h-full font-poppins ">
                <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
                    <Sidebar setIsProfilePopup={setIsProfilePopup} />
                </div>
        
                {HistoryTab === 'Article' && <ArticleHistory/>  }
                {HistoryTab === 'Plagiarism' && <PlagiarismHistory/>  }

                <Toaster />
            </div>

            {IsSessionExpired && <SessionExpiredPopup />}
        </>
    )
}

export default History