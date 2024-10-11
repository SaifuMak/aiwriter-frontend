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

import { setContentForRewriting, setKeywordsForRewriting } from '../Redux/Slices/ArticleRewriterSlice'
import { useDispatch, useSelector } from 'react-redux';

import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'
import { motion } from 'framer-motion';
import AlertPopUp from '../Components/ArticleGenerationComponents/SmallComponents/AlertPopUp'
import { showGenericError } from '../Utils/ErrorMessages'
import TextareaAutosize from 'react-textarea-autosize';
import { countWords } from '../Utils/Helperfunctions'




function ArticleRewriter() {

    const dispatch = useDispatch()

    const { ContentForRewriting, KeywordsForRewriting ,selectedToneOfVoiceArticleRewriter, selectedPointOfViewArticleRewriter, ArticleRewriterStep,selectedWordlimitArticleRewriter, } = useSelector((state) => state.ArticleRewriter);




    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [AlertPopup, setAlertPopup] = useState(false)
    const [apiToCall, setApiToCall] = useState(null);

    const [article, setarticle] = useState('')
    const [keywords, setkeywords] = useState('')

    const [wordsCount, setwordsCount] = useState(0)




    const showPopupAndCallAPI = (apiFunction) => {
        setAlertPopup(true);
        setApiToCall(() => apiFunction); // Store the API function to be called later
    }

    const handleArticle = (e) => {
        const article = e.target.value
        setwordsCount(countWords(article))
        setarticle(article)
        // dispatch(setSubmittedArticle(article))
        // dispatch(SetrequestedArticleForArticleRewrite(article))
        dispatch(setContentForRewriting(article))
    }


    const handleKeywords = (e) => {
        const Enteredkeywords = e.target.value
        setkeywords(Enteredkeywords)
        dispatch(setKeywordsForRewriting(Enteredkeywords))
    }


    const HandleRewriteArticle = async () => {
        toast.dismiss()
        if (!ContentForRewriting) {
            console.log('no content ')
            return
        }
        if (wordsCount > 3000) {
            ErrorToast('The content has exceeded the allowed word limit.')
            return
        }
        const data = {
            'Article': ContentForRewriting,
            'Keywords': KeywordsForRewriting,
            'Tone_of_voice' : selectedToneOfVoiceArticleRewriter,
            'Point_of_view' : selectedPointOfViewArticleRewriter,
            'Word_limit' : selectedWordlimitArticleRewriter,


        }

        try {
            const response = await Axiosinstance.post('api/rewrite-your-article', data)
            console.log(response)

        }
        catch {

        }
    }


    useEffect(() => {
        if (ContentForRewriting) {
            setwordsCount(countWords(ContentForRewriting))
        }

    }, [])



    return (
        <>
            <Navbar Label='Article Rewriter 1.0' IsSidedbarOpened={IsSidedbarOpened} setIsSidedbarOpened={setIsSidedbarOpened} setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} IsMobileArticleSidebarOpened={IsMobileArticleSidebarOpened} />
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
                    <div className="p-8 lg:p-20 sm:p-12">

                        <div className="">

                            <h1 className="text-2xl ">Paste your existing article:</h1>
                            <textarea onChange={handleArticle} value={ContentForRewriting} name="" id="" className='w-full p-4 mt-6 border border-opacity-50 rounded-md outline-none sm:p-8 min-h-96 border-slate-600' placeholder='Paste content here or Type...'></textarea>
                            <p className={`${wordsCount > 3000 ? 'text-red-500' : ''}`}>Words limitsss: {wordsCount}/3000</p>

                        </div>

                        <div className="mt-6 lg:mt-20 sm:mt-10 ">

                            <h1 className="text-lg ">Enter Keywords (optional):</h1>
                            <TextareaAutosize onChange={handleKeywords} value={KeywordsForRewriting} name="" id="" className='w-full p-4 mt-3 border border-opacity-50 rounded-md outline-none resize-none border-slate-600' placeholder='Paste content here or Type...' />


                        </div>


                        <button onClick={HandleRewriteArticle} className="px-12 py-2 mt-8 tracking-wider text-white rounded-md bg-custom-dark-orange">Rewrite</button>



                    </div>



                </div>
                <Toaster />



            </div>
        </>
    )
}

export default ArticleRewriter