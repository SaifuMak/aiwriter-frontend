import React, { useState, useEffect } from 'react'
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
import Axiosinstance from '../Axios/Axiosinstance'

import {setArticleRewriterStep,nextArticleRewriterStep,prevArticleRewriterStep,setToneOfVoiceArticleRewriter,setPointOfViewArticleRewriter} from '../Redux/Slices/ArticleRewriterSlice'
import { useDispatch, useSelector } from 'react-redux';

import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'
import { motion } from 'framer-motion';
import AlertPopUp from '../Components/ArticleGenerationComponents/SmallComponents/AlertPopUp'
import { showGenericError } from '../Utils/ErrorMessages'
import TextareaAutosize from 'react-textarea-autosize';


function ArticleRewriter() {

    const dispatch = useDispatch()

    const { selectedKeywords, finalArticle, title, currentStep, selectedOutlines, selectedWordLimit, ReorderedSelectedOutlines, selectedToneOfVoice, selectedPointOfView, selectedHeadline, refTitle, loading } = useSelector((state) => state.articleGeneration);




    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [AlertPopup, setAlertPopup] = useState(false)
    const [apiToCall, setApiToCall] = useState(null);

    const [article, setarticle] = useState('')
    const [keywords, setkeywords] = useState('')




    const showPopupAndCallAPI = (apiFunction) => {
        setAlertPopup(true);
        setApiToCall(() => apiFunction); // Store the API function to be called later
    }

    const handleArticle = (e) => {
        const article = e.target.value
        setarticle(article)
    }


    const handleKeywords = (e) => {
        const Enteredkeywords = e.target.value
        setkeywords(Enteredkeywords)
    }



    return (
        <>
            <Navbar IsSidedbarOpened={IsSidedbarOpened} setIsSidedbarOpened={setIsSidedbarOpened} setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} IsMobileArticleSidebarOpened={IsMobileArticleSidebarOpened} />
            <div className="relative flex font-poppins ">

                <motion.span
                    drag
                    dragConstraints={{ left: 0, top: 0, right: 0, bottom: 400 }} // Optional: constraints for drag area
                    //  initial={{ x: -20 }} // Move the initial position to the left
                    //  animate={{ x: -10 }} // Keep the element at the adjusted position
                    dragElastic={0.01}
                    onClick={() => setIsSidedbarOpened(true)} className="fixed flex items-center justify-center h-12 rounded-full -left-3 bg-stone-400 top-30 sm:hidden "><IoIosArrowDropright className='text-xl translate-x-2.5 bg-stone-200 rounded-full text-stone-500' /></motion.span>

                {IsSidedbarOpened && (<MobileSidebar IsProfilePopup={IsProfilePopup} setIsSidedbarOpened={setIsSidedbarOpened} setIsProfilePopup={setIsProfilePopup} />)}

                <div className="xl:w-[500px] sm:w-[200px] lg:w-[400px] max-sm:hidden ">
                    <ArticleSidebar Label='Article Rewriter 1.0' showPopupAndCallAPI={showPopupAndCallAPI} />
                </div>


                <div className="w-full ">
                    <div className="p-20">

                        <div className="">

                            <h1 className="text-2xl ">Paste your existing article:</h1>
                            <textarea onChange={handleArticle} value={article} name="" id="" className='w-full p-8 mt-6 border border-opacity-50 rounded-md outline-none min-h-96 border-slate-600' placeholder='Paste content here or Type...'></textarea>

                        </div>

                        <div className="mt-20 ">

                            <h1 className="text-lg ">Enter Keywords (optional):</h1>
                            <TextareaAutosize onChange={handleKeywords} value={keywords} name="" id="" className='w-full p-4 mt-3 border border-opacity-50 rounded-md outline-none resize-none border-slate-600' placeholder='Paste content here or Type...' />

                        </div>


                        <button className="px-12 rounded-md mt-8  tracking-wider py-1.5 text-white bg-custom-dark-orange">Rewrite</button>



                    </div>



                </div>
                {/* <Toaster  /> */}



            </div>
        </>
    )
}

export default ArticleRewriter