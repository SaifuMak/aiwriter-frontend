import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";

function KeywordsForArticle() {
    const [selectedTopic, setselectedTopic] = useState('')

    const DataStyle = 'px-4  xl:text-base text-sm py-6 xl:py-8 border-b w-1/4  text-center'
    const TableHeading = ['Keyword', 'Volume', 'KD', 'Traffic potential']
    const TableRows = [
        {
            title: 'Importance of SEO for small businesses',
            metric1: '60',
            metric2: '29',
            metric3: '1900',
        },
        {
            title: 'Importance of SEO for small businesses',
            metric1: '60',
            metric2: '29',
            metric3: '1900',
        },
        {
            title: 'Importance of SEO for small businesses',
            metric1: '60',
            metric2: '29',
            metric3: '1900',
        },
        {
            title: 'Importance of SEO for small businesses',
            metric1: '60',
            metric2: '29',
            metric3: '1900',
        }
    ];


    const handleSelection = (ind) => {
        setselectedTopic((prev) =>
            prev.includes(ind)
                ? prev.filter(item => item !== ind) // Remove the index if it already exists
                : [...prev, ind] // Add the index if it does not exist
        );
    };

    // const handleSelection = (ind) => {
    //     setselectedTopic(ind)
    // }


    return (

        <div className="w-full px-4 py-10 space-y-4 xl:px-16 ">
            <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose keywords for your Article</h2>
            <div className="grid grid-cols-4 rounded-lg ">
                {TableHeading.map((title, index) => (
                    <div key={index} className="grid items-center justify-center px-4 py-6 font-semibold bg-custom-light-orange ">{title}</div>))}
            </div>


            <div className="overflow-hidden border rounded-lg border-stone-200 ">
                <table className="min-w-full cursor-pointer ">

                    <tbody>
                        {TableRows.map((row, index) => (
                            <tr key={index} onClick={() => handleSelection(index)} className={` ${selectedTopic.includes(index) ? 'bg-[#FB923C0D]' : 'bg-white'} duration-100`}>
                                <td className={DataStyle}>
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="relative xl:p-1.5 ">
                                            {selectedTopic.includes(index) && (<VscCheck className='absolute top-0 right-0 duration-500 xl:text-xl xl:top-1 xl:right-1 ' />)}
                                            <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedTopic.includes(index) ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                                        </div>
                                        <span>{row.title}</span>
                                    </div>
                                </td>
                                <td className={DataStyle}>{row.metric1}</td>
                                <td className={DataStyle}>{row.metric2}</td>
                                <td className={DataStyle}>{row.metric3}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-center ">
                <button className="px-6 py-1.5 mt-5 font-semibold tracking-wide text-center text-white rounded-lg hover:bg-hover-button-color bg-custom-dark-orange">Next</button>
            </div>
        </div>

    )
}

export default KeywordsForArticle