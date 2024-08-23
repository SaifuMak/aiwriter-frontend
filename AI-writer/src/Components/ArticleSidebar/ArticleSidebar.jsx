import React, { useState } from 'react'
import InputComponent from '../InputComponent'


import DropdownComponent from '../DropdownComponent';

function ArticleSidebar() {
    const [selectedTopicOrKeywords, setselectedTopicOrKeywords] = useState('')
    const [selectedKeywords, setselectedKeywords] = useState('')
    const [selectedCallToAction, setCallToAction] = useState('')
    

    const [ToneOfVoiceDropdown, setToneOfVoiceDropdown] = useState(false)
    const [ToneOfVoice, setToneOfVoice] = useState('')

    const [PointOfView, setPointOfView] = useState('')
    const [PointOfViewDropdown, setPointOfViewDropdown] = useState(false)

    const [QualityType, setQualityType] = useState('')
    const [QualityTypeDroptype, setQualityTypeDroptype] = useState(false)


    const handleTopicsOrKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            setselectedTopicOrKeywords(newValue);
        }
    }

    const handleKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            setselectedKeywords(newValue);
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
        setToneOfVoice(option);
        setToneOfVoiceDropdown(false);
    };


    const handlePointOfViewToggle = () => {
        setPointOfViewDropdown(!PointOfViewDropdown);
    };
    const handlePointOfViewSelection = (option) => {
        setPointOfView(option);
        setPointOfViewDropdown(false);
    };

    const handleQualityToggle = () => {
        setQualityTypeDroptype(!QualityTypeDroptype);
    };
    const handleQualitySelection = (option) => {
        setQualityType(option);
        setQualityTypeDroptype(false);
    };

    const options = [
        'Lorem',
        'Ipsum',
        'Dolor',
        'Sit',
        'Amet',
        'Consectetur',
        'Adipiscing'
    ];


    return (
        <div className="flex flex-col h-full min-h-screen px-4 py-12 xl:px-7 bg-custom-dark ">
            <h2 className="text-xl xl:text-2xl text-custom-dark-orange">Article Writer 1.0</h2>
            <InputComponent
                label={`${selectedTopicOrKeywords ? 'Topic' : 'Enter a Topic or Keywords'}`}
                onChange={handleTopicsOrKeywords}
                value={selectedTopicOrKeywords}
                placeholder="Type here....."
                count={`${selectedTopicOrKeywords.length}/200`}
            />

            <InputComponent
                label='Keywords'
                onChange={handleKeywords}
                value={selectedKeywords}
                placeholder="Type here....."
                count={`${selectedKeywords.length}/200`}
            />

            <DropdownComponent
                label='Tone of voice'
                options={options}
                IsOpened={ToneOfVoiceDropdown}
                ToggleAction={handleToneOfVoiceToggle}
                value={ToneOfVoice}
                HandleSelection={handleToneOfVoiceSelection}
            />

            <DropdownComponent
                label='Point of view'
                options={options}
                IsOpened={PointOfViewDropdown}
                ToggleAction={handlePointOfViewToggle}
                value={PointOfView}
                HandleSelection={handlePointOfViewSelection}
            />

            <InputComponent
                label='Quality type'
                onChange={handleCallToAction}
                value={selectedCallToAction}
                placeholder="Type here....."
                count={`${selectedCallToAction.length}/200`}
            />

            <DropdownComponent
                label='Quality type'
                options={options}
                IsOpened={QualityTypeDroptype}
                ToggleAction={handleQualityToggle}
                value={QualityType}
                HandleSelection={handleQualitySelection}
            />


            {/* <div className="flex justify-center ">
                <button className="text-white bg-custom-dark-orange text-center py-1 sm:py-2 rounded-md mt-10 w-[211px]">Next</button>
            </div> */}






        </div>
    )
}

export default ArticleSidebar