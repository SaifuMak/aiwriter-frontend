import React, { useState } from 'react'
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";

import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

import CustomToolTip from './CustomToolTip';



function StructureItemComponent({ item, index, onAdd, isEditing, IsEditMode, handleRemoveItem, handleSaveItem }) {
    const dragControls = useDragControls();
    const [itemValue, setItemValue] = useState('');



    return (
        <Reorder.Item
            value={item}
            id={item}
            dragListener={false}
            dragControls={dragControls}
            className="focus:outline-none"  // Remove the blue outline
            style={{ WebkitTapHighlightColor: 'transparent' }}  // Remove the highlight
        >
            <div className="flex items-center justify-between px-2 py-3 mt-6 space-x-2 rounded-md md:py-5 md:px-6 md:space-x-10 bg-custom-lighter-orange">

                <div className="flex items-center flex-grow space-x-3 ">

                        <div
                            className={`p-1 ${IsEditMode ? 'cursor-not-allowed' : 'cursor-grab'} rounded-md   hover:bg-[#FEE3CE] text-stone-600`}
                            onPointerDown={(event) => !IsEditMode && dragControls.start(event)}
                            style={{ userSelect: 'none' }}
                        >
                            <PiDotsSixVerticalBold className='text-xl lg:text-3xl shrink-0 ' />
                        </div>


                    {isEditing === index ? (
                        <div className="flex w-full ">
                            <input type="text" value={itemValue} onChange={(e) => setItemValue(e.target.value)} className="w-full p-2.5 border rounded-md outline-none lg:p-4 lg:text-base border-stone-200" placeholder='New headline' />
                        </div>
                    ) : (
                        <span className="p-2 text-sm bg-white border rounded-md lg:p-4 lg:text-base border-stone-200">
                            {item} <span className="font-semibold text-sky-600 ">index({index}) </span>
                        </span>
                    )}

                    {/* <span className="p-2 text-sm bg-white border rounded-md lg:p-4 lg:text-base border-stone-200">
                    {index} {item}
                </span> */}
                </div>


                {!IsEditMode && (<div className="flex space-x-2 md:space-x-6">
                    <CustomToolTip title='Create Headline'>
                        <span onClick={() => onAdd(index)} className="p-2 duration-150 bg-white rounded-md cursor-pointer hover:bg-stone-100">
                            <GoPlus className='text-md md:text-xl' />
                        </span>
                    </CustomToolTip>


                    <CustomToolTip title='Remove Headline'>
                        <span onClick={() => handleRemoveItem(index)} className="p-2 duration-150 bg-white rounded-md cursor-pointer hover:bg-stone-100">
                            <GoDash className='text-md md:text-xl' />
                        </span>
                    </CustomToolTip>
                </div>)}


                {isEditing === index && (
                    <div className="flex space-x-2 lg:space-x-4 ">
                        {itemValue && (<button onClick={() => handleSaveItem(index, itemValue)} className="px-1.5 max-md:text-sm py-1 duration-150 bg-white border-2 border-green-500 rounded-md lg:px-3 hover:bg-transparent border-opacity-70">save</button>)}
                        <button onClick={() => handleRemoveItem(index)} className="lg:px-3 px-1.5 py-1 max-md:text-sm duration-150 bg-white border-2 border-red-500 rounded-md hover:bg-transparent border-opacity-70 ">cancel</button>
                    </div>
                )}
            </div>


        </Reorder.Item >
    )
}

export default StructureItemComponent