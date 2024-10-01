import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { setIsIndividualOutlines, setSelectedOutlines, RemoveSelectedOutlines, SetSelectedOutlineKey, ClearSelectedOutlines, resetReorderedSelectedOutlines } from '../../Redux/Slices/ArticleGenerationSlice'
import ButtonComponent from './SmallComponents/ButtonComponent';
import { motion } from 'framer-motion';
import { countWords, countCharacters, calculateTotalWords, calculateTotalCharacters } from '../../Utils/Helperfunctions'
import { Toaster, toast } from 'sonner';



function StructureOfArticle({ HandleOutlinesStructure }) {

    const dispatch = useDispatch()
    const { outline, isIndividualOutlines, selectedOutlines, selectedOutlineKey, loading, } = useSelector((state) => state.articleGeneration);
    console.log(selectedOutlines.flat(), '-----------')


    const handleToggleIndividualSelection = () => {
        dispatch(ClearSelectedOutlines())
        dispatch(resetReorderedSelectedOutlines())
        dispatch(SetSelectedOutlineKey(''))

        dispatch(setIsIndividualOutlines(!isIndividualOutlines));
    }

    // handles the group slection of the outlines 
    const HandleOutlinesSelection = (content) => {

        dispatch(resetReorderedSelectedOutlines())

        if (isIndividualOutlines) {
            return
        }

        dispatch(ClearSelectedOutlines())
        const outlines = outline[content];
        dispatch(setSelectedOutlines(outlines));




        // Flatten the selectedOutlines array and add the new outlines
        // const newSelectedOutlines = [...selectedOutlines.flat(), ...outlines];

        // // Dispatch the action with the new flat array
        // dispatch(setSelectedOutlines(newSelectedOutlines));


        dispatch(SetSelectedOutlineKey(content))

    }


    // handles the single  slection of the outline 
    const handleIndividualSelection = (content) => {
        dispatch(resetReorderedSelectedOutlines())

        if (!isIndividualOutlines) {
            return
        }
        if (selectedOutlines.includes(content)) {
            dispatch(RemoveSelectedOutlines(content))
        }
        else {
            dispatch(setSelectedOutlines(content))

        }
        console.log(content)
    }





    return (
        <div className="w-full px-4 py-10 xl:px-16 space-y-7 ">
            <div className="flex justify-between ">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose a Structure for your Article</h2>

                <div className="flex items-center justify-center space-x-6">
                    <div onClick={handleToggleIndividualSelection} className="flex items-center cursor-pointer duration-150 bg-stone-100 justify-center px-3 py-0.5 rounded-xl   ">
                        <div className="relative xl:p-1.5   mr-0.5 ">
                            {isIndividualOutlines && <VscCheck className='absolute duration-500 -top-0.5 -right-0.5  xl:text-xl xl:top-1 xl:right-1 ' />}
                            <span className={`flex items-center border duration-500 border-custom-dark-orange ${isIndividualOutlines ? 'bg-custom-dark-orange' : 'bg-transparent'} justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full `}></span>
                        </div>
                        <span className="">Individual Outlines</span>
                    </div>
                    {(isIndividualOutlines && selectedOutlines.length > 0) && <button onClick={HandleOutlinesStructure} className="px-8 py-1 text-white duration-200 rounded-md bg-custom-dark-orange">Proceed</button>}
                </div>


            </div>


            <div>
                {Object.entries(outline).map(([OutlineName, sections]) => (
                    <div onClick={() => HandleOutlinesSelection(OutlineName)} key={OutlineName} className={`flex ${selectedOutlineKey === OutlineName ? 'bg-custom-lighter-orange' : 'bg-white'} px-3 py-6 mt-10  rounded-md shadow-md cursor-pointer`}>

                        {!isIndividualOutlines && (<div className="relative xl:p-1.5 mt-3 xl:mt-1 mr-2 ">
                            {selectedOutlineKey === OutlineName && (<VscCheck className='absolute duration-500 -top-0.5 -right-0.5  xl:text-xl xl:top-1 xl:right-1 ' />)}
                            <span className={`flex items-center border duration-500 border-custom-dark-orange  justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${selectedOutlineKey === OutlineName ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                        </div>)}


                        <ul className='mt-2 text-sm lg:text-base'>

                            {Object.entries(sections).map(([index, content]) => (
                                <li onClick={() => handleIndividualSelection(content)} key={index} className='w-full mb-2 '>
                                    <div className="flex items-center ml-2">
                                        {isIndividualOutlines && (<div className="relative mr-4 p-0.5 ">
                                            {selectedOutlines.includes(content) && <VscCheck className='absolute duration-500 -top-0.5 -right-0.5 text-sm lg:right-0.5 lg:top-0.5    ' />}
                                            <span className={`flex items-center border duration-500 border-custom-dark-orange hover:bg-custom-light-orange justify-center w-3 h-3 lg:w-4 lg:h-4 rounded-full ${selectedOutlines.includes(content) ? 'bg-custom-dark-orange' : 'bg-transparent'}  `}></span>
                                        </div>)}
                                        <p className='flex items-center justify-center'>Section {parseInt(index) + 1}: <span className="ml-2">{content}</span></p>
                                    </div>
                                </li>
                            ))}

                          
                            <div className={`mt-6  `}>
                                <span className="text-[#7D7D7D] text-sm font-semibold">
                                    {calculateTotalWords(sections)} words / {calculateTotalCharacters(sections)} characters
                                </span>
                            </div>


                            {(selectedOutlineKey === OutlineName && !loading) && <button onClick={HandleOutlinesStructure} className="px-8 py-1 mt-5 text-white duration-200 rounded-md bg-custom-dark-orange">Proceed</button>}
                        </ul>
                    </div>
                ))}
            </div>
            <Toaster  />




        </div>
    )
}

export default StructureOfArticle