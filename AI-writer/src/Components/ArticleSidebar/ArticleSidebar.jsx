import React, { useState, useRef, useEffect } from 'react'
import InputComponent from '../InputComponent'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { RxDoubleArrowRight } from "react-icons/rx";
import PulseLoader from 'react-spinners/PulseLoader';

import DropdownComponent from '../DropdownComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setToneOfVoice, setPointOfView, setWordLimit, setSelectedKeywordsRedux } from '../../Redux/Slices/ArticleGenerationSlice'
import { setToneOfVoiceArticleRewriter, setPointOfViewArticleRewriter, setSelectedWordlimitArticleRewriter,ResetRewriteArticle } from '../../Redux/Slices/ArticleRewriterSlice'

import ButtonComponent from '../ArticleGenerationComponents/SmallComponents/ButtonComponent';


function ArticleSidebar({ Label, handleBackButtonClick, HandleRewriteArticle, showPopupAndCallAPI, handleBackClick, handleForwardButtonClick, Fetchkeywords, handleSidebarOptionsVisible, GenerateHeadlines, handleOutlineGeneration, GenerateOutlines, HandleOutlinesStructure, GenerateArticle, RegenerateArticle }) {
    const dispatch = useDispatch();
    const { title, currentStep, selectedKeywords, loading, selectedToneOfVoice, selectedPointOfView, selectedWordLimit, finalArticle, selectedOutlines, selectedHeadline, isManualKeywordsEnabled } = useSelector((state) => state.articleGeneration);
    const { selectedToneOfVoiceArticleRewriter, selectedPointOfViewArticleRewriter, ArticleRewriterStep, selectedWordlimitArticleRewriter,ArticleRewrited, IsRewriteArticleLoadingCompleted, PointOfViewArticleRewriter } = useSelector((state) => state.ArticleRewriter);



    // const [selectedTopicOrKeywords, setselectedTopicOrKeywords] = useState('')
    // const [keywordsChange, setKeywordsChange] = useState('')
    // const [selectedCallToAction, setCallToAction] = useState('')

    const [QualityType, setQualityType] = useState('')



    // const [ToneOfVoiceDropdown, setToneOfVoiceDropdown] = useState(false)
    // const [ToneOfVoice, setToneOfVoice] = useState('Professional')

    // const [PointOfView, setPointOfView] = useState('Second-Person (You)')
    // const [PointOfViewDropdown, setPointOfViewDropdown] = useState(false)

    // const [QualityTypeDroptype, setQualityTypeDroptype] = useState(false)
    // const [WordsCountDroptype, setWordsCountDroptype] = useState(false)


    const [activeDropdown, setActiveDropdown] = useState(null); // Single state to track active dropdown


    const handleToggleDropdown = (dropdown) => {
        // setActiveDropdown(null)
        setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
    };


    const handleTopicsOrKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            dispatch(setTitle(newValue));
            // setselectedTopicOrKeywords(newValue);
        }
    }


    const handleKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            dispatch(setSelectedKeywordsRedux(newValue));
        }
    }


    const handleToneOfVoiceSelection = (option) => {
        dispatch(setToneOfVoice(option));
        setActiveDropdown(null)

    };


    const handleToneOfVoiceForArticleRewriter = (option) => {
        dispatch(setToneOfVoiceArticleRewriter(option));
        setActiveDropdown(null)
    }


    const handlePointOfViewForArticleRewriter = (option) => {
        dispatch(setPointOfViewArticleRewriter(option));
        setActiveDropdown(null)

    }

    const handleWordLimitArticleRewriter = (option) => {
        dispatch(setSelectedWordlimitArticleRewriter(option));
        setActiveDropdown(null)

    }


    // const handlePointOfViewToggle = () => {
    //     setPointOfViewDropdown(!PointOfViewDropdown);
    // };

    const handlePointOfViewSelection = (option) => {
        dispatch(setPointOfView(option));
        setActiveDropdown(null)

    };

    // const handleQualityToggle = () => {
    //     setQualityTypeDroptype(!QualityTypeDroptype);
    // };

    const handleQualitySelection = (option) => {
        setQualityType(option);
        setActiveDropdown(null)

    };

    // const handleWordsCountToggle = () => {
    //     setWordsCountDroptype(!WordsCountDroptype);
    // };

    const handleWordsCount = (option) => {
        dispatch(setWordLimit(option))
        setActiveDropdown(null)


    }




    const ToneOfVoiceOptions = [
        'Professional',
        'Normal',
        'Witty',
    ]
    const PointOfViewOptions = [
        'First-Person (I, We)',
        'Second-Person (You)',
        'Third-Person  (He, She, They)',
    ]

    const QualitiesOptions = [
        'Premium',
        'Superior',
    ]

    const WordsOptions = [
        '500',
        '1000',
        '1500',
        '2000',
        '2500',
        '3000',
    ]



    const WordsOptionsArticleRewriter = [
        'No Limit',
        '500',
        '1000',
        '1500',
        '2000',
        '2500',
        '3000',
    ]


    const sidebarRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setActiveDropdown(null)

            }
        }


        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])




    // useEffect(() => {
    //     const handleSidebarClick = () => {

    //         setActiveDropdown(null)

    //     };

    //     const sidebar = sidebarRef.current;
    //     if (sidebar) {
    //         sidebar.addEventListener('click', handleSidebarClick);
    //     }

    //     return () => {
    //         if (sidebar) {
    //             sidebar.removeEventListener('click', handleSidebarClick);
    //         }
    //     };
    // }, []);


    // useEffect(() => {
    //     function handleClickOutside(event) {
    //         if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
    //             setActiveDropdown(null) // Close dropdowns if clicked outside
    //         }
    //     }

    //     const handleSidebarClick = (event) => {
    //         // Check if the click is on a dropdown or dropdown option
    //         if (!event.target.closest('.dropdown-item')) {
    //             setActiveDropdown(null) // Close dropdowns if clicked in sidebar
    //         }
    //     };

    //     document.addEventListener('mousedown', handleClickOutside);
    //     const sidebar = sidebarRef.current;
    //     if (sidebar) {
    //         sidebar.addEventListener('click', handleSidebarClick);
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //         if (sidebar) {
    //             sidebar.removeEventListener('click', handleSidebarClick);
    //         }
    //     };
    // }, []);






    return (
        <div ref={sidebarRef} className="flex flex-col h-full min-h-screen px-4 py-12 xl:px-7 bg-custom-dark ">

            <div className="flex items-center justify-between ">
                <h2 className="text-xl xl:text-2xl xl:p-1.5 p-1 text-custom-dark-orange">{Label}</h2>

                {(currentStep > 0 && (Label === 'Article Writer 2.0' || Label === 'Article Writer 1.0')) && (<div onClick={handleBackClick} className="xl:p-1.5 max-sm:hidden  p-1 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                    <RxDoubleArrowLeft className='text-lg lg:text-xl xl:text-2xl text-custom-dark-orange' />
                </div>)}

                {(ArticleRewriterStep > 0 && Label === 'Article Rewriter 1.0') && (<div onClick={handleBackButtonClick} className="xl:p-1.5 max-sm:hidden  p-1 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                    <RxDoubleArrowLeft className='text-lg lg:text-xl xl:text-2xl text-custom-dark-orange' />
                </div>)}
            </div>



            {(Label === 'Article Writer 2.0' || Label === 'Article Writer 1.0') && (
                <InputComponent
                    label={`${title ? 'Topic' : 'Enter a Topic or Keywords'}`}
                    onChange={handleTopicsOrKeywords}
                    value={title}
                    placeholder="Enter Title....."
                    count={`${title.length}/200`}
                    isActive={currentStep !== 0}
                />
            )}


            {currentStep === 1 && isManualKeywordsEnabled && (
                <InputComponent
                    label='Keywords'
                    onChange={handleKeywords}
                    value={selectedKeywords}
                    placeholder="Enter Keywords....."
                    count={`${selectedKeywords ?  `${selectedKeywords.length}/200` : '0/200' }`}
                    isOptional={false}
                    isActive={currentStep > 2}
                />
            )}


            {(currentStep === 0 && (Label === 'Article Writer 2.0' || Label === 'Article Writer 1.0')) && (<div className="flex items-center justify-center">{loading ? (
                <button className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md mt-10 w-[100px] lg:w-[120px] xl:w-[211px]">
                    <PulseLoader color="#ffffff" size={6} margin={4} />
                </button>
                
            ) : (
                <button onClick={Fetchkeywords} className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md mt-10 w-[100px] lg:w-[120px] xl:w-[211px] ">
                    <span>Next</span>
                </button>
            )}
            </div>)}



            {(currentStep === 1 && (Label === 'Article Writer 2.0' || Label === 'Article Writer 1.0')) && (<div className="flex items-center mt-10 space-x-16 sm:space-x-2 lg:space-x-5 xl:space-x-7 2xl:space-x-8 ">
                <div onClick={handleBackClick} className="lg:p-2 sm:p-1 p-1.5 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                    <RxDoubleArrowLeft className='text-lg lg:text-2xl text-custom-dark-orange' />
                </div>

                <button onClick={handleSidebarOptionsVisible} className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md  w-[100px] lg:w-[120px] xl:w-[211px]">Next</button>
            </div>)}



            {(currentStep > 1 && (Label === 'Article Writer 2.0' || Label === 'Article Writer 1.0')) && (
                <>
                    <InputComponent
                        label='Keywords'
                        onChange={handleKeywords}
                        value={selectedKeywords}
                        placeholder="Enter Keywords....."
                        count={`${selectedKeywords && selectedKeywords.length}/200`}
                        isOptional={false}
                        isActive={currentStep > 7}
                    />


                    <DropdownComponent
                        label='Tone of voice'
                        options={ToneOfVoiceOptions}
                        IsOpened={activeDropdown === 'ToneOfVoice'}
                        ToggleAction={() => handleToggleDropdown('ToneOfVoice')}
                        value={selectedToneOfVoice}
                        HandleSelection={handleToneOfVoiceSelection}
                        isActive={currentStep < 8}
                        

                    />


                    <DropdownComponent
                        label='Point of view'
                        options={PointOfViewOptions}
                        IsOpened={activeDropdown === 'PointOfView'}
                        ToggleAction={() => handleToggleDropdown('PointOfView')}
                        value={selectedPointOfView}
                        HandleSelection={handlePointOfViewSelection}
                        isActive={currentStep < 8}

                    />



                    {/* <InputComponent
                        label='Call-to-Action'
                        onChange={handleCallToAction}
                        value={selectedCallToAction}
                        placeholder="company name, contact....."
                        count={`${selectedCallToAction.length}/200`}
                        isOptional={true}
                        isActive={currentStep > 2}
                    /> */}

                    <DropdownComponent
                        label='Quality type'
                        options={QualitiesOptions}
                        IsOpened={activeDropdown === 'QualityType'}
                        ToggleAction={() => handleToggleDropdown('QualityType')}

                        value={QualityType}
                        HandleSelection={handleQualitySelection}
                        isActive={currentStep < 8}

                    />


                    {Label === 'Article Writer 2.0' && (<DropdownComponent
                        label='Word Limit'
                        IsToolTip={true}
                        ToolTipInfo='Choose the word limit for your final article.'
                        options={WordsOptions}
                        IsOpened={activeDropdown === 'WordLimit'}
                        ToggleAction={() => handleToggleDropdown('WordLimit')}

                        value={selectedWordLimit}
                        HandleSelection={handleWordsCount}
                        isActive={currentStep < 8}


                    />)}



                    <div className="flex items-center pb-10 mt-10 space-x-16 sm:space-x-1 lg:space-x-5 xl:space-x-7 2xl:space-x-10 ">
                        <div onClick={handleBackClick} className="xl:p-1.5 p-1 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                            <RxDoubleArrowLeft className='text-lg lg:text-2xl text-custom-dark-orange' />
                        </div>

                        <ButtonComponent
                            onClick={GenerateHeadlines}
                            label="Generate Headlines"
                            isVisible={currentStep === 2}
                        />

                        <ButtonComponent
                            onClick={handleOutlineGeneration}
                            label="Next"
                            isVisible={currentStep === 3}
                        />

                        {Label === 'Article Writer 2.0' ? (<ButtonComponent
                            onClick={GenerateArticle}
                            label="Generate Article"
                            isVisible={currentStep === 4}
                        />)
                            : (
                                <ButtonComponent
                                    onClick={GenerateOutlines}
                                    label="Generate Structure"
                                    isVisible={currentStep === 4}
                                />
                            )
                        }


                        <ButtonComponent
                        onClick={() => showPopupAndCallAPI(GenerateOutlines)}
                            // onClick={GenerateOutlines}
                            label="Regenerate Structure"
                            isVisible={currentStep === 5}
                            isIcon = {true}
                        />

                        <ButtonComponent
                            onClick={GenerateArticle}
                            label="Generate Article"
                            isVisible={currentStep === 6}
                        />

                        <ButtonComponent
                            onClick={() => showPopupAndCallAPI(RegenerateArticle)}
                            label="Regenerate Article"
                            isVisible={currentStep === 7}
                        />


                        {(currentStep === 6 && finalArticle || currentStep === 4 && selectedOutlines.length > 0 || currentStep === 4 && finalArticle || currentStep === 2 && selectedHeadline) && (<div className="flex justify-end flex-grow ">

                            <div onClick={handleForwardButtonClick} className="lg:p-2 sm:p-1 p-1.5  border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                                <RxDoubleArrowRight className='text-lg lg:text-2xl text-custom-dark-orange' />
                            </div>
                        </div>)}



                    </div>

                </>
            )}




            {Label === 'Article Rewriter 1.0' && (

                <>
                    <DropdownComponent
                        label='Tone of voice'
                        options={ToneOfVoiceOptions}
                        IsOpened={activeDropdown === 'ToneOfVoice'}
                        ToggleAction={() => handleToggleDropdown('ToneOfVoice')}
                        value={selectedToneOfVoiceArticleRewriter}
                        HandleSelection={handleToneOfVoiceForArticleRewriter}
                        isActive={true}

                    />


                    <DropdownComponent
                        label='Point of view'
                        options={PointOfViewOptions}
                        IsOpened={activeDropdown === 'PointOfView'}
                        ToggleAction={() => handleToggleDropdown('PointOfView')}
                        value={selectedPointOfViewArticleRewriter}
                        HandleSelection={handlePointOfViewForArticleRewriter}
                        isActive={true}

                    />


                    {/* <InputComponent
                        label='Call-to-Action'
                        onChange={handleCallToAction}
                        value={selectedCallToAction}
                        placeholder="company name, contact....."
                        count={`${selectedCallToAction.length}/200`}
                        isOptional={true}
                        isActive={currentStep > 2}
                    /> */}


                    <DropdownComponent
                        label='Quality type'
                        options={QualitiesOptions}
                        IsOpened={activeDropdown === 'QualityType'}
                        ToggleAction={() => handleToggleDropdown('QualityType')}

                        value={QualityType}
                        HandleSelection={handleQualitySelection}
                        isActive={true}

                    />



                    <DropdownComponent
                        label='Word Limit'
                        IsToolTip={true}
                        ToolTipInfo='Choose the word limit for the rewritten article.'
                        options={WordsOptionsArticleRewriter}
                        IsOpened={activeDropdown === 'WordLimit'}
                        ToggleAction={() => handleToggleDropdown('WordLimit')}

                        value={selectedWordlimitArticleRewriter}
                        HandleSelection={handleWordLimitArticleRewriter}
                        isActive={true}


                    />


                    <div className="flex items-center w-full mt-10 space-x-16 sm:space-x-1 lg:space-x-5 xl:space-x-7 2xl:space-x-10 ">
                        <div onClick={handleBackButtonClick} className={`xl:p-1.5 p-1 border rounded-md ${ArticleRewriterStep === 0 ? 'opacity-45' : 'cursor-pointer'}  bg-[#42515F] border-custom-dark-orange border-opacity-40`}>
                            <RxDoubleArrowLeft className='text-lg lg:text-2xl text-custom-dark-orange' />
                        </div>

                        {loading ? (
                            <div className="flex items-center justify-center w-full ">
                                <button className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md min-w-[100px] xl:min-w-[151px] lg:min-w-[120px] ">
                                    <PulseLoader color="#ffffff" size={6} margin={2} />
                                </button>
                            </div>


                        ) : (

                            !ArticleRewrited ? (<div className="flex justify-center w-full ">
                                <ButtonComponent
                                    onClick={HandleRewriteArticle}
                                    label="Rewrite"
                                    isVisible={ArticleRewriterStep === 0 || ArticleRewriterStep === 1}
                                />
                            </div>)
                                :

                                (ArticleRewrited && (<div className="flex justify-center w-full ">
                                    <ButtonComponent
                                        onClick={() => showPopupAndCallAPI(HandleRewriteArticle)}
                                        label="Rewrite"
                                        isVisible={ArticleRewriterStep === 0 || ArticleRewrited}
                                    />
                                </div>))

                        )}



                        <div className="flex justify-end flex-grow ">

                            <div onClick={handleForwardButtonClick} className={`lg:p-2 sm:p-1 p-1.5  border rounded-md  bg-[#42515F] ${(ArticleRewriterStep === 0 && ArticleRewrited) ? 'cursor-pointer' : ' opacity-45'} border-custom-dark-orange border-opacity-40`}>
                                <RxDoubleArrowRight className='text-lg lg:text-2xl text-custom-dark-orange' />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ArticleSidebar