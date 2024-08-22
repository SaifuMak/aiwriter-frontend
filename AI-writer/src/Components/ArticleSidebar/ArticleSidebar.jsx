import React, { useState } from 'react'
import InputComponent from '../InputComponent'

function ArticleSidebar() {
    const [selectedTopicOrKeywords, setselectedTopicOrKeywords] = useState('')

    const handleTopicsOrKeywords = (e) => {
        const newValue = e.target.value;
        if (newValue.length <= 200) {
            setselectedTopicOrKeywords(newValue);
        }
    }

    return (
        <div className="flex flex-col h-screen px-4 py-12 xl:px-7 bg-custom-dark ">
            <h2 className="text-xl xl:text-2xl text-custom-dark-orange">Article Writer 1.0</h2>

            <InputComponent
                label={`${selectedTopicOrKeywords ? 'Topic' : 'Enter a Topic or Keywords'}`}
                onChange={handleTopicsOrKeywords}
                value={selectedTopicOrKeywords}
                placeholder="Type here....."
                count={`${selectedTopicOrKeywords.length}/200`}
            />

            <div className="flex justify-center ">
                <button className="text-white bg-custom-dark-orange text-center py-2 rounded-md mt-10 w-[211px]">Next</button>
            </div>



        </div>
    )
}

export default ArticleSidebar