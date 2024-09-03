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

import { Toaster, toast } from 'sonner';


import Axiosinstance from '../Axios/Axiosinstance'
import { setKeywords, previousStep, setTitle, setCurrentStep, setSelectedHeadline, setRefTitle, setHeadlines, resetArticleGeneration, setLoading } from '../Redux/Slices/ArticleGenerationSlice'
import { useDispatch, useSelector } from 'react-redux';

import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'


import { motion } from 'framer-motion';


function ArticleGeneration() {

    const dispatch = useDispatch()

    const { selectedKeywords, title, currentStep, selectedToneOfVoice, selectedPointOfView,selectedHeadline, refTitle, } = useSelector((state) => state.articleGeneration);

    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [tempTitle, setTempTitle] = useState('')



    // other  actions 

    const handleBackButtonClick = () => {  //  this decreases the count for the currentstate , allow users to go back 
        dispatch(previousStep())

    }

    const handleSidebarOptionsVisible = () => {
        // we are going to the step 2 after the selection of the keywords , if no keywords return 
        if (!selectedKeywords.trim()) {
            ErrorToast('Please select any keywords')

            return
        }
        //   side bar options are only visible  the currrentstep is greater than 1 
        dispatch(setCurrentStep(2))

    }

    
    const handleOutlineGeneration = ()=>{
        if(!selectedHeadline.trim()){
            ErrorToast('Please select any Headline')
            return
        }
        dispatch(setCurrentStep(4))
    }


    const sampleClicks = () => {
        console.log('clicked')
    }



    // api calls 

    const Fetchkeywords = async () => {

        if (!title) {
            ErrorToast('Please enter title')
            return
        }

        if (title !== refTitle) {
            const tempTitle = title

            const data = {
                'topic': title,
            }
            dispatch(resetArticleGeneration())
            dispatch(setTitle(tempTitle))
            dispatch(setRefTitle(tempTitle))


            try {
                dispatch(setLoading(true))
                const response = await Axiosinstance.post('api/generate-article', data)
                const articles = response.data.article
                const keywordsArray = articles
                    ? articles.split('\n').map(item => item.replace(/^\d+\.\s*/, '').trim())
                    : [];
                console.log(keywordsArray, '///////////////////')


                dispatch(setKeywords(keywordsArray))
                dispatch(setCurrentStep(1))
                dispatch(setLoading(false))

            }
            catch (error) {
                console.log(error)
                dispatch(setLoading(false))

            }
        }
        else {
            dispatch(setCurrentStep(1))

        }


    }


    const GenerateHeadlines = async () => {

        if (!title || !selectedKeywords || !selectedToneOfVoice || !selectedPointOfView) {
            ErrorToast('Please fill all  fields')
            return
        }
        
        const data = {
            'title': title,
            'keywords': selectedKeywords,
            'tone_of_voice': selectedToneOfVoice,
            'point_of_view': selectedPointOfView,
        }
        dispatch(setLoading(true))



        try {
            const response = await Axiosinstance.post('api/generate-headlines', data)
            dispatch(setHeadlines(response.data.headlines))
            dispatch(setLoading(false))
            dispatch(setCurrentStep(3))

            dispatch(setSelectedHeadline(''))   // clear the selected headline  

        }
        catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            ErrorToast('Limit reached! Please try after 20 seconds')

        }
        console.log(title, selectedKeywords, selectedToneOfVoice, selectedPointOfView)

    }

    const GenerateOutlines = async () => {

        if (!title || !selectedKeywords || !selectedToneOfVoice || !selectedPointOfView) {
            ErrorToast('Please fill all  fields')
            return
        }
        
        const data = {
            'main_headline':selectedHeadline,
            'title': title,
            'keywords': selectedKeywords,
            'tone_of_voice': selectedToneOfVoice,
            'point_of_view': selectedPointOfView,
        }
        dispatch(setLoading(true))



        try {
            const response = await Axiosinstance.post('api/generate-outlines', data)
            dispatch(setLoading(false))
            // dispatch(setCurrentStep(3))


        }
        catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            ErrorToast('Limit reached! Please try after 20 seconds')

        }

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
                    <ArticleSidebar handleBackButtonClick={handleBackButtonClick} Fetchkeywords={Fetchkeywords} handleSidebarOptionsVisible={handleSidebarOptionsVisible} GenerateHeadlines={GenerateHeadlines} handleOutlineGeneration={handleOutlineGeneration} GenerateOutlines={GenerateOutlines} />
                </div>

                <div className="w-full ">
                    {IsMobileArticleSidebarOpened && (<div className=" sm:hidden">
                        <MobileArticleSidebar setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} />
                    </div>)}


                    {(currentStep === 0 || currentStep === 2) && <ArticleLoader />}

                    {currentStep === 1 && <KeywordsForArticle handleSidebarOptionsVisible={handleSidebarOptionsVisible} />}

                    {currentStep === 3 && <GenerateOrRegenerateIdeas GenerateHeadlines={GenerateHeadlines} handleOutlineGeneration={handleOutlineGeneration} />}
                    {currentStep === 4 &&<GenerateOutline GenerateOutlines={GenerateOutlines} />}
                    {/* <StructureOfArticle /> */}
                    {/* <ArticleSummary /> */}
                    {/* <Worksheet /> */}



                </div>
                <Toaster position="bottom-right" />

            </div>
        </>
    )
}

export default ArticleGeneration