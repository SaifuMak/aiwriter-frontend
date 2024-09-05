import React, { useState } from 'react'
import InputComponent from '../InputComponent'
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import PulseLoader from 'react-spinners/PulseLoader';


import DropdownComponent from '../DropdownComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setToneOfVoice, setPointOfView, setSelectedKeywordsRedux } from '../../Redux/Slices/ArticleGenerationSlice'

import ButtonComponent from '../ArticleGenerationComponents/SmallComponents/ButtonComponent';


function ArticleSidebar({ handleBackButtonClick, Fetchkeywords, handleSidebarOptionsVisible, GenerateHeadlines, handleOutlineGeneration, GenerateOutlines, HandleOutlinesStructure, GenerateArticle, RegenerateArticle }) {
    const dispatch = useDispatch();
    const { title, currentStep, selectedKeywords, loading, selectedToneOfVoice, selectedPointOfView, } = useSelector((state) => state.articleGeneration);


    const [selectedTopicOrKeywords, setselectedTopicOrKeywords] = useState('')
    const [keywordsChange, setKeywordsChange] = useState('')
    const [selectedCallToAction, setCallToAction] = useState('')


    const [ToneOfVoiceDropdown, setToneOfVoiceDropdown] = useState(false)
    // const [ToneOfVoice, setToneOfVoice] = useState('Professional')

    // const [PointOfView, setPointOfView] = useState('Second-Person (You)')
    const [PointOfViewDropdown, setPointOfViewDropdown] = useState(false)

    const [QualityType, setQualityType] = useState('')
    const [QualityTypeDroptype, setQualityTypeDroptype] = useState(false)


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

    const handleChangeKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            setKeywordsChange(newValue);
        }
    }



    const handleCallToAction = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            setCallToAction(newValue);
        }
    }



    const handleToneOfVoiceToggle = () => {
        setToneOfVoiceDropdown(!ToneOfVoiceDropdown);
    };
    const handleToneOfVoiceSelection = (option) => {
        dispatch(setToneOfVoice(option));
        setToneOfVoiceDropdown(false);
    };


    const handlePointOfViewToggle = () => {
        setPointOfViewDropdown(!PointOfViewDropdown);
    };
    const handlePointOfViewSelection = (option) => {
        dispatch(setPointOfView(option));
        setPointOfViewDropdown(false);
    };

    const handleQualityToggle = () => {
        setQualityTypeDroptype(!QualityTypeDroptype);
    };

    const handleQualitySelection = (option) => {
        setQualityType(option);
        setQualityTypeDroptype(false);
    };




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





    return (
        <div className="flex flex-col h-full min-h-screen px-4 py-12 xl:px-7 bg-custom-dark ">
            <h2 className="text-xl xl:text-2xl text-custom-dark-orange">Article Writer 1.0</h2>


            <InputComponent
                label={`${title ? 'Topic' : 'Enter a Topic or Keywords'}`}
                onChange={handleTopicsOrKeywords}
                value={title}
                placeholder="Enter Title....."
                count={`${title.length}/200`}
                isActive={currentStep !== 0}
            />


            {currentStep === 0 && (<div className="flex items-center justify-center">{loading ? (
                <button className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md mt-10 w-[100px] lg:w-[120px] xl:w-[211px]">
                    <PulseLoader color="#ffffff" size={6} margin={4} />
                </button>
            ) : (
                <button onClick={Fetchkeywords} className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md mt-10 w-[100px] lg:w-[120px] xl:w-[211px] ">
                    <span>Next</span>

                </button>
            )}
            </div>)}

            {currentStep === 1 && (<div className="flex items-center mt-10 space-x-16 sm:space-x-2 lg:space-x-5 xl:space-x-7 2xl:space-x-8 ">
                <div onClick={handleBackButtonClick} className="lg:p-2 sm:p-1 p-1.5 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                    <RxDoubleArrowLeft className='text-lg lg:text-2xl text-custom-dark-orange' />
                </div>

                <button onClick={handleSidebarOptionsVisible} className="text-white bg-custom-dark-orange lg:text-base text-sm text-center py-1 lg:py-1.5 xl:py-2 rounded-md  w-[100px] lg:w-[120px] xl:w-[211px]">Next</button>
            </div>)}



            {currentStep > 1 && (
                <>
                    <InputComponent
                        label='Keywords'
                        onChange={handleKeywords}
                        value={selectedKeywords}
                        placeholder="Enter Keywords....."
                        count={`${selectedKeywords && selectedKeywords.length}/200`}
                        isOptional={false}
                        isActive={currentStep > 2}
                    />


                    <DropdownComponent
                        label='Tone of voice'
                        options={ToneOfVoiceOptions}
                        IsOpened={ToneOfVoiceDropdown}
                        ToggleAction={handleToneOfVoiceToggle}
                        value={selectedToneOfVoice}
                        HandleSelection={handleToneOfVoiceSelection}
                        isActive={currentStep < 3}

                    />

                    <DropdownComponent
                        label='Point of view'
                        options={PointOfViewOptions}
                        IsOpened={PointOfViewDropdown}
                        ToggleAction={handlePointOfViewToggle}
                        value={selectedPointOfView}
                        HandleSelection={handlePointOfViewSelection}
                        isActive={currentStep < 3}

                    />

                    <InputComponent
                        label='Call-to-Action'
                        onChange={handleCallToAction}
                        value={selectedCallToAction}
                        placeholder="company name, contact....."
                        count={`${selectedCallToAction.length}/200`}
                        isOptional={true}
                        isActive={currentStep > 2}
                    />

                    <DropdownComponent
                        label='Quality type'
                        options={QualitiesOptions}
                        IsOpened={QualityTypeDroptype}
                        ToggleAction={handleQualityToggle}
                        value={QualityType}
                        HandleSelection={handleQualitySelection}
                        isActive={currentStep < 3}

                    />



                    <div className="flex items-center mt-10 space-x-16 sm:space-x-2 lg:space-x-5 xl:space-x-7 2xl:space-x-10 ">
                        <div onClick={handleBackButtonClick} className="lg:p-2 sm:p-1 p-1.5 border rounded-md cursor-pointer bg-[#42515F] border-custom-dark-orange border-opacity-40">
                            <RxDoubleArrowLeft className='text-lg lg:text-2xl text-custom-dark-orange' />
                        </div>

                        <ButtonComponent
                            onClick={GenerateHeadlines}
                            label="Generate Ideas"
                            isVisible={currentStep === 2}
                        />

                        <ButtonComponent
                            onClick={handleOutlineGeneration}
                            label="Next"
                            isVisible={currentStep === 3}
                        />

                        <ButtonComponent
                            onClick={GenerateOutlines}
                            label="Generate Structure"
                            isVisible={currentStep === 4}
                        />

                        <ButtonComponent
                            onClick={GenerateOutlines}
                            label="Regenerate Structure"
                            isVisible={currentStep === 5}
                        />

                        <ButtonComponent
                            onClick={GenerateArticle}
                            label="Generate Article"
                            isVisible={currentStep === 6}
                        />

                        <ButtonComponent
                            onClick={RegenerateArticle}
                            label="Regenerate Article"
                            isVisible={currentStep === 7}
                        />



                    </div>

                </>
            )}



        </div>
    )
}

export default ArticleSidebar