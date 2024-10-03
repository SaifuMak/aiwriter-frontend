import React, { useState,useEffect } from 'react'
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
import { setKeywords, previousStep, setTitle,ResetKeywords,ResetSelectedKeywordsRedux, setCurrentStep, setOutlines, setSelectedHeadline, setRefTitle, setHeadlines, resetArticleGeneration, setLoading, ClearOutlines, ClearSelectedOutlines, SetSelectedOutlineKey, setReorderedSelectedOutlines, setFinalArticle, resetFinalArticle, nextStep } from '../Redux/Slices/ArticleGenerationSlice'
import { useDispatch, useSelector } from 'react-redux';
import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'
import { motion } from 'framer-motion';
import AlertPopUp from '../Components/ArticleGenerationComponents/SmallComponents/AlertPopUp'
import {showGenericError} from '../Utils/ErrorMessages'

function ArticleGenerate2() {

    const dispatch = useDispatch()

    const { selectedKeywords, finalArticle, title, currentStep, selectedOutlines,selectedWordLimit, ReorderedSelectedOutlines, selectedToneOfVoice, selectedPointOfView, selectedHeadline, refTitle, loading } = useSelector((state) => state.articleGeneration);



    // This is the selected outlines  data 
    const [items, setItems] = useState([]);

    const [AlertPopup, setAlertPopup] = useState(false)
    const [apiToCall, setApiToCall] = useState(null);


    const [articleHTML, setArticleHTML] = useState('');
    const [isArticleGenerated, setisArticleGenerated] = useState(false)


    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [tempTitle, setTempTitle] = useState('')


    useEffect(() => {
        dispatch(setLoading(false))

    }, [])




    // other  actions 
    const handleBackButtonClick = () => {  //  this decreases the count for the currentstate , allow users to go back 
        if (
            currentStep === 7 &&
            Array.isArray(selectedOutlines) && selectedOutlines.length === 0 &&
            Array.isArray(ReorderedSelectedOutlines) && ReorderedSelectedOutlines.length === 0
        ) {
            dispatch(setCurrentStep(4));  // Go to step 4
        }

        else {
            dispatch(previousStep())

        }

    }


    const handleForwardButtonClick = () => {  //  this decreases the count for the currentstate , allow users to go back 
        if (currentStep === 7) {
            return
        }
        if (currentStep === 4 && finalArticle &&
            Array.isArray(selectedOutlines) && selectedOutlines.length === 0) {
            dispatch(setCurrentStep(7));

        }
        else {
            dispatch(nextStep())

        }

    }


    // this function ensures that alert is ignored and cation is to regenarate the content 
    const handleIgnoreContinue = () => {
        setAlertPopup(false);
        if (apiToCall) {
            apiToCall(); // Call the stored API function
        }
    };
    // this function sends the api need to call after the alert popup 
    const showPopupAndCallAPI = (apiFunction) => {
        setAlertPopup(true);
        setApiToCall(() => apiFunction); // Store the API function to be called later
    }


    const HandleClosePopUp = () => {
        setAlertPopup(false)
        setApiToCall(null)
    }





    const handleSidebarOptionsVisible = () => {
        // we are going to the step 2 after the selection of the keywords , if no keywords return 
        if (!selectedKeywords.trim()) {
            ErrorToast('Please select any keywords to proceed.')

            return
        }
        //   side bar options are only visible  the currrentstep is greater than 1 
        dispatch(setCurrentStep(2))
    }


    const handleOutlineGeneration = () => {
        if (!selectedHeadline.trim()) {
            ErrorToast('Please select a headline to proceed.')
            return
        }
        dispatch(setCurrentStep(4))
    }


    const HandleOutlinesStructure = () => {
        dispatch(setCurrentStep(6))

    }



    // api calls 
    const Fetchkeywords = async () => {

        if (!title) {
            ErrorToast('Please enter a title to proceed.')
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
                const response = await Axiosinstance.post('api/generate-keywords', data)
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
                showGenericError()

            }
        }
        else {
            dispatch(setCurrentStep(1))

        }
    }


    const Regeneratekeywords = async () => {

        if (!title) {
            ErrorToast('Please enter a title to proceed.')
            return
        }

        const data = {
            'topic': title,
        }



        try {
            dispatch(ResetKeywords())
            dispatch(ResetSelectedKeywordsRedux())


            dispatch(setLoading(true))
            const response = await Axiosinstance.post('api/generate-keywords', data)
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
            showGenericError()
            

        }
    }


    const GenerateHeadlines = async () => {

        if (!title || !selectedKeywords || !selectedToneOfVoice || !selectedPointOfView) {
            ErrorToast('Please fill all required fields.')
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
            ErrorToast('Please fill all required fields.')
            return
        }

        const data = {
            'main_headline': selectedHeadline,
            'title': title,
            'keywords': selectedKeywords,
            'tone_of_voice': selectedToneOfVoice,
            'point_of_view': selectedPointOfView,
        }
        dispatch(setLoading(true))



        try {
            const response = await Axiosinstance.post('api/generate-outlines', data, { timeout: 15000 })


            dispatch(ClearSelectedOutlines())
            dispatch(ClearOutlines())
            dispatch(SetSelectedOutlineKey(''))

            dispatch(setLoading(false))
            dispatch(setOutlines(response.data.outlines))
            dispatch(setCurrentStep(5))
        }

        catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            showGenericError()

        }
    }



    const GenerateArticle = async () => {
       


        const data = {
            'title': selectedHeadline,
            'keywords': selectedKeywords,
            'tone_of_voice': selectedToneOfVoice,
            'point_of_view': selectedPointOfView,
            'wordlimit':selectedWordLimit,

        }

        dispatch(setLoading(true))

        try {
            const response = await Axiosinstance.post('api/quickly-generate-article', data,)
            const article = response.data.article.replace("```html", "").replace("```", "").trim();
            dispatch(setFinalArticle(article))
            console.log(article)
            setArticleHTML(article)
            dispatch(setLoading(false))
            dispatch(setCurrentStep(7))

        }
        catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            showGenericError()


        }

    }

    const RegenerateArticle = async () => {

        // const reorderedHeadlines = ReorderedSelectedOutlines.flat()
        dispatch(resetFinalArticle())



        const data = {
            'title': selectedHeadline,
            'keywords': selectedKeywords,
            'tone_of_voice': selectedToneOfVoice,
            'point_of_view': selectedPointOfView,
            'wordlimit':selectedWordLimit,
            
        }
        dispatch(setLoading(true))


        try {
            const response = await Axiosinstance.post('api/quickly-generate-article', data,)
            const article = response.data.article.replace("```html", "").replace("```", "").trim();
            dispatch(setFinalArticle(article))
            console.log(article)
            setArticleHTML(article)
            dispatch(setLoading(false))

        }
        catch (error) {
            console.log(error)
            dispatch(setLoading(false))
            showGenericError()


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
                    <ArticleSidebar Label='Article Writer 2.0' showPopupAndCallAPI={showPopupAndCallAPI} handleBackClick={handleBackButtonClick} Fetchkeywords={Fetchkeywords} handleSidebarOptionsVisible={handleSidebarOptionsVisible} GenerateHeadlines={GenerateHeadlines} handleOutlineGeneration={handleOutlineGeneration} GenerateOutlines={GenerateOutlines} HandleOutlinesStructure={HandleOutlinesStructure} GenerateArticle={GenerateArticle} RegenerateArticle={RegenerateArticle} handleForwardButtonClick={handleForwardButtonClick} />
                </div>


                <div className="w-full ">
                    {IsMobileArticleSidebarOpened && (<div className=" sm:hidden">
                        <MobileArticleSidebar setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} />
                    </div>)}

                    {(currentStep === 0 || currentStep === 2) && <ArticleLoader  />}
                    {(currentStep === 6 && loading || currentStep === 4 && loading || currentStep === 7 && loading || currentStep === 1 && loading) && <ArticleLoader IsQuickWriter={true}  />}

                    {currentStep === 1 && <KeywordsForArticle handleSidebarOptionsVisible={handleSidebarOptionsVisible} Regeneratekeywords={Regeneratekeywords} />}

                    {currentStep === 3 && <GenerateOrRegenerateIdeas showPopupAndCallAPI={showPopupAndCallAPI} GenerateHeadlines={GenerateHeadlines} handleOutlineGeneration={handleOutlineGeneration} />}
                    {(!loading && currentStep === 4) && <GenerateOutline GenerateOutlines={GenerateArticle} Label='Generate Article' />}
                    {/* {currentStep === 5 && <StructureOfArticle HandleOutlinesStructure={HandleOutlinesStructure} />}
                    {(!loading && currentStep === 6) && <ArticleSummary setItems={setItems} items={items} GenerateArticle={GenerateArticle} />} */}
                    {/* {currentStep === 6 && <Worksheet />} */}
                    {/* {(!loading && currentStep === 7) && <FinalArticle articleHTML={articleHTML} />} */}
                    {(!loading && currentStep === 7) && <FinalArticle articleHTML={articleHTML} isArticleGenerated={isArticleGenerated} setisArticleGenerated={setisArticleGenerated} />}


                </div>
            {/* <Toaster  /> */}

                {AlertPopup && <AlertPopUp handleIgnoreContinue={handleIgnoreContinue} HandleClosePopUp={HandleClosePopUp} />}


            </div>
        </>
    )
}

export default ArticleGenerate2