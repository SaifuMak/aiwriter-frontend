import React, { useState, useEffect } from 'react'
import { VscCheck } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedKeywordsRedux, setisManualKeywordsEnabled } from '../../Redux/Slices/ArticleGenerationSlice'
import { Switch, FormControlLabel } from '@mui/material';
import { Toaster, toast } from 'sonner';
import { LuRefreshCcw } from "react-icons/lu";



function KeywordsForArticle({ handleSidebarOptionsVisible, Regeneratekeywords, showPopupAndCallAPI }) {


    const dispatch = useDispatch()
    const { keywords, selectedKeywords, isManualKeywordsEnabled } = useSelector((state) => state.articleGeneration);


    const DataStyle = 'px-4   xl:text-base text-sm py-6 xl:py-8 border-b w-1/4'
    const TableHeading = ['Keywords']

    const handleToggle = () => {
        dispatch(setisManualKeywordsEnabled())
    };






    const handleSelection = (data) => {
        // Split the existing Redux keywords string into an array
        const reduxKeywordsArray = selectedKeywords
            ? selectedKeywords.split(', ').filter(Boolean) // Filter out empty strings
            : [];

        // Check if the data is already in the array
        const updatedKeywords = reduxKeywordsArray.includes(data)
            ? reduxKeywordsArray.filter((item) => item !== data) // Remove the keyword if it already exists
            : [...reduxKeywordsArray, data]; // Add the keyword if it does not exist

        // Format the updated keywords into a string
        const keywordsString = updatedKeywords.join(', ');

        // Dispatch the updated keywords to Redux
        dispatch(setSelectedKeywordsRedux(keywordsString));
    };

    console.log(selectedKeywords, 'keywords -------');

    return (

        <div className="w-full px-4 py-10 space-y-4 xl:px-16">
            <div className="flex items-center justify-between ">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose keywords for your Article</h2>
                <div className="flex items-center w-[380px] md:w-[350px] max-lg:text-sm 2xl:w-[400px] px-4 py-2 space-x-4 border shadow-md rounded-2xl border-custom-dark-orange">

                    <span className=" 2xl:text-xl text-custom-black-text">Enter Your Own keywords</span>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={isManualKeywordsEnabled}
                                onChange={handleToggle}
                                sx={{
                                    '& .MuiSwitch-switchBase.Mui-checked': {
                                        color: '#FB923C', // Change the thumb color when checked
                                    },
                                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                        backgroundColor: '#FB923C', // Change the track color when checked
                                    },
                                }}
                            />
                        }
                        label={isManualKeywordsEnabled ? 'ON' : 'OFF'}
                    />

                </div>

            </div>

            <div className="rounded-lg ">
                {TableHeading.map((title, index) => (
                    <div key={index} className="w-full px-6 py-6 font-semibold max-sm:text-sm bg-custom-light-orange">{title}</div>))}
            </div>


            <div className="h-[485px] overflow-y-auto border rounded-lg border-stone-200">
                <table className="min-w-full cursor-pointer ">

                    <tbody>
                        {keywords && keywords.map((data, index) => (
                            <tr key={index} onClick={() => handleSelection(data)} className={` ${selectedKeywords.includes(data) ? 'bg-[#FB923C0D]' : 'bg-white'} duration-100`}>
                                <td className={DataStyle}>
                                    <td className='flex '>
                                        <div className="relative xl:p-1.5 ">
                                            {selectedKeywords.includes(data) && (<VscCheck className='absolute -top-0.5 -right-0.5 duration-500 xl:text-xl xl:top-1 xl:right-1 ' />)}
                                            <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedKeywords.includes(data) ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                                        </div>
                                        <span className='w-full ml-4 xl:mt-1'>{data}</span>
                                    </td>


                                    {/* <div className="flex sm:px-2 lg:px-12 xl:px-12 2xl:px-28">

                                        <div className="flex space-x-2 ">
                                            <div className="relative xl:p-1.5 ">
                                                {selectedKeywords.includes(data) && (<VscCheck className='absolute -top-0.5 -right-0.5 duration-500 xl:text-xl xl:top-1 xl:right-1 ' />)}
                                                <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedKeywords.includes(data) ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                                            </div>
                                            <span className='w-full xl:mt-1'>{data}</span>
                                        </div>
                                    </div> */}
                                </td>
                            </tr>


                        ))}
                    </tbody>
                </table>
            </div>


            <div className="flex justify-end ">
                <div className="flex justify-between w-7/12">
                    <button onClick={handleSidebarOptionsVisible} className="px-6 py-1.5 mt-5 font-semibold tracking-wide text-center text-white rounded-lg hover:bg-hover-button-color bg-custom-dark-orange">Next</button>

                    <button onClick={() => showPopupAndCallAPI(Regeneratekeywords)} className="flex items-center justify-center  px-4 py-1.5 mt-5  tracking-wide text-center group text-white rounded-lg bg-custom-dark hover:opacity-85"><LuRefreshCcw className='mr-2 text-white duration-300 group-hover:animate-spin' />Regenerate Keywords</button>

                </div>

            </div>


            <Toaster />


        </div>

    )
}

export default KeywordsForArticle