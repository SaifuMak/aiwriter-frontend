import React, { useState } from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import ArticleLoader from '../Components/ArticleGenerationComponents/ArticleLoader'
import KeywordsForArticle from '../Components/ArticleGenerationComponents/KeywordsForArticle'
import GenerateOrRegenerateIdeas from '../Components/ArticleGenerationComponents/GenerateOrRegenerateIdeas'
import GenerateOutline from '../Components/ArticleGenerationComponents/GenerateOutline'
import Worksheet from '../Components/ArticleGenerationComponents/Worksheet'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import MobileSidebar from '../Components/Sidebar/MobileSidebar'
import MobileArticleSidebar from '../Components/ArticleSidebar/MobileArticleSidebar'
import StructureOfArticle from '../Components/ArticleGenerationComponents/StructureOfArticle'
import ArticleSummary from '../Components/ArticleGenerationComponents/ArticleSummary'

import FinalArticle from '../Components/FinalArticle/FinalArticle'
import { Toaster, toast } from 'sonner';
import { SlCloudUpload } from "react-icons/sl";
import { LuUploadCloud } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";

import Axiosinstance from '../Axios/Axiosinstance'
import { useDispatch, useSelector } from 'react-redux';
import { setResponse ,setContents} from '../Redux/Slices/PlagiarismSlice'

import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'
import CustomToolTip from '../Components/ArticleGenerationComponents/SmallComponents/CustomToolTip'



import { motion } from 'framer-motion';
import { IoMenuOutline } from "react-icons/io5";


function Plagiarism() {

    const dispatch = useDispatch()

    const { selectedKeywords, title, currentStep, selectedOutlines, ReorderedSelectedOutlines, selectedToneOfVoice, selectedPointOfView, selectedHeadline, refTitle, loading } = useSelector((state) => state.articleGeneration);

   

    // This is the selected outlines  data 
    const [items, setItems] = useState([]);
    const [IsSidebarVisible, setIsSidebarVisible] = useState(false)




    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)
    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [tempTitle, setTempTitle] = useState('')

    const [Content, setContent] = useState('')
    

    
     
        const splitTextIntoSentences = (text) => {
          // Split the text based on common sentence-ending punctuation
          return text.split(/(?<=[.!?])\s+/);
        };


    const handlePlagiarismContent = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 3000) {
            setContent(newValue)
           
            // setselectedTopicOrKeywords(newValue);
        }
        else{
            ErrorToast('content limit crossed')
        }
    }

    const handleClearContent = ()=>{
        setContent('')


    }

    const ConfirmPlagiarismCheck = async()=>{
        return
        if(!Content || Content.length > 3000){
            return
        }
        const data = {
            'content': Content,
           
        }
      

        try {
            const response = await Axiosinstance.post('api/plagiarism-check', data)
            console.log(response.data.results )
            dispatch(setContents(response.data.results))
          

        }
        catch (error) {
            console.log(error)
            
            // ErrorToast('Limit reached! Please try after 20 seconds')

        }
    }


  
      
        






    return (
        <>
            <div className="flex justify-center bg-[#FEF2E8] font-poppins ">
                <div className="2xl:w-2/12 lg:w-3/12 max-lg:hidden ">
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




                <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">

                    <div className="flex justify-between w-full rounded-xl ">

                        <div className="flex items-center justify-center space-x-3 lg:hidden ">
                            <IoMenuOutline onClick={() => setIsSidebarVisible(!IsSidebarVisible)} className='text-2xl md:text-3xl' />
                            <h4 className="text-base md:text-xl xl:text-2xl "> Welcome MakTal</h4>
                        </div>


                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-10/12 mt-10">
                            <h2 className="text-2xl font-medium tracking-wide ">Plagiarism Checker</h2>
                            <div className="p-10 mt-6 space-y-2 bg-white rounded-lg shadow-xl ">
                                <h5 className="font-semibold ">Paste (Ctrl + V) your article below then click for Plagiarism!</h5>
                                <textarea onChange={handlePlagiarismContent} value={Content} className='w-full resize-none min-h-[400px] outline-none p-8 rounded-lg  bg-slate-50 border border-slate-200' name="" id="" placeholder='Enter text here to check plagiarism...'>
                                </textarea>
                                
                                <div className="flex items-center justify-between w-full ">
                                    <p className="">Words limit/Search: {Content.length}/3000</p>
                                    <CustomToolTip title='Clear content'>
                                    <div onClick={handleClearContent}  className="flex items-center cursor-pointer justify-center rounded-md   w-8 h-9 bg-[#FF0000] ">
                                        <RiDeleteBin7Line className='text-xl text-white' />
                                    </div>
                                    </CustomToolTip>
                                </div>

                                <div className="flex flex-col py-6 ">
                                    <p className="text-sm ">Select a file: (.docx/.txt)</p>
                                    <button className="bg-[#213343] font-semibold tracking-wide  max-sm:text-sm mt-1 w-[130px]  lg:w-[150px] xl:w-[160px] 2xl:w-[180px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white"><span className="mr-2 text-xl shrink-0"><LuUploadCloud /></span> Select file</button>
                                </div>
                                <button onClick={ConfirmPlagiarismCheck} className=" max-sm:text-sm font-semibold tracking-wide  bg-custom-dark-orange w-[160px] lg:w-[170px] xl:w-[200px] 2xl:w-[220px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white"> Check Plagiarism</button>


                            </div>
                        </div>
                    </div>



                </div>
                <Toaster position="bottom-right" />

            </div>
        </>
    )
}

export default Plagiarism