import React, { useState, useEffect } from 'react'
import { VscCheck } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import {setKeywords,setSelectedKeywordsRedux} from '../../Redux/Slices/ArticleGenerationSlice'


function KeywordsForArticle({handleSidebarOptionsVisible}) {
    const dispatch = useDispatch()
    const [selectedTopic, setselectedTopic] = useState('')
    const [SelectedKeywords, setSelectedKeywords] = useState([])
    const { keywords,selectedKeywords } = useSelector((state) => state.articleGeneration);


    const DataStyle = 'px-4   xl:text-base text-sm py-6 xl:py-8 border-b w-1/4  text-center'
    const TableHeading = ['Keyword', 'Search Volume']

   

    console.log(keywords, '-----------keyword comp------------------')



    const handleSelection = (data) => {
        setSelectedKeywords((prev) => {
            const updatedKeywords = prev.includes(data)
                ? prev.filter(item => item !== data) // Remove the keyword if it already exists
                : [...prev, data]; // Add the keyword if it does not exist
            
            // Dispatch the action with the updated array
            const keywordsString = updatedKeywords.join(', ');
            
            // Dispatch the action with the formatted string
            dispatch(setSelectedKeywordsRedux(keywordsString));
            return updatedKeywords;
        });
    };



   

    

    console.log(selectedKeywords, 'keywords -------');

    // const handleSelection = (ind) => {
    //     setselectedTopic(ind)
    // }


    return (

        <div className="w-full px-4 py-10 space-y-4 xl:px-16 ">
            <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose keywords for your Article</h2>
            <div className="grid grid-cols-2 rounded-lg ">
                {TableHeading.map((title, index) => (
                    <div key={index} className="grid items-center justify-center px-4 py-6 font-semibold text-center max-sm:text-sm bg-custom-light-orange ">{title}</div>))}
            </div>


            <div className="overflow-hidden border rounded-lg border-stone-200 ">
                <table className="min-w-full cursor-pointer ">

                    <tbody>
                        {keywords && keywords.map((data, index) => (
                            <tr key={index} onClick={() => handleSelection(data)} className={` ${selectedKeywords.includes(data) ? 'bg-[#FB923C0D]' : 'bg-white'} duration-100`}>
                                <td className={DataStyle}>
                                    <div className=" sm:px-2 lg:px-12 xl:px-12 2xl:px-28">
                               
                                        <div className="flex items-center space-x-2 ">
                                            <div className="relative xl:p-1.5 ">
                                                {selectedKeywords.includes(data) && (<VscCheck className='absolute -top-0.5 -right-0.5 duration-500 xl:text-xl xl:top-1 xl:right-1 ' />)}
                                                <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedKeywords.includes(data) ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                                            </div>
                                            <span>{data}</span>
                                            </div>
                                    </div>
                                </td>
                                <td className={DataStyle}>10</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center ">
                <button onClick={handleSidebarOptionsVisible} className="px-6 py-1.5 mt-5 font-semibold tracking-wide text-center text-white rounded-lg hover:bg-hover-button-color bg-custom-dark-orange">Next</button>
            </div>
        </div>

    )
}

export default KeywordsForArticle