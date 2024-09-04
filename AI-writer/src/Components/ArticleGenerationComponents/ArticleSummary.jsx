import React, { useState, useEffect } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";
import StructureItemComponent from './SmallComponents/StructureItemComponent';
import { useDispatch, useSelector } from 'react-redux';


function ArticleSummary() {
    const {  selectedOutlines } = useSelector((state) => state.articleGeneration);

    const [headlines, setHeadlines] = useState([]);
    const [isEditing, setisEditing] = useState('')
    const [IsEditMode, setIsEditMode] = useState(false)

    useEffect(() => {
        setHeadlines(selectedOutlines.flat());
    }, []);

  

    const handleRemoveItem = (index) => {
        const newHeadlines = [...headlines];
        newHeadlines.splice(index, 1); // Remove the item at the given index
        setHeadlines(newHeadlines);
        setisEditing('')
        setIsEditMode(false)
    };


    const handleSaveItem = (index, itemvalue) => {
        if (!itemvalue) {
            return
        }
        const newHeadlines = [...headlines];
        newHeadlines[index] = itemvalue
        setHeadlines(newHeadlines);
        setisEditing('')
        setIsEditMode(false)
    };



    const handleAddItem = (index) => {
        setIsEditMode(true)
        setisEditing(index + 1)
        const newHeadlines = [...headlines];
        newHeadlines.splice(index + 1, 0, `New Outline `);
        setHeadlines(newHeadlines);
        console.log(newHeadlines)
    };

    console.log(headlines)



   


    return (
        <div className="w-full px-4 py-10 lg:tracking-wide max-lg:text-sm 2xl:w-10/12 xl:w-11/12 xl:px-16 space-y-7">
            <div className="flex justify-between">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Article Summary{isEditing}</h2>
                <button className="px-2 py-2 text-sm text-white rounded-md lg:px-4 lg:text-base bg-custom-dark-orange">Generate Outlines</button>
            </div>
            <div className="">
                <h6 className="">Title:</h6>
                <div className="w-full px-2 lg:px-6 py-2.5 max-md:text-sm mt-1 border rounded-md border-opacity-80 border-stone-300">
                    Unlocking Success: The Importance of SEO for Sm
                </div>
                <span className="text-xs ">{headlines}</span>
            </div>


            <div className="">
                <h6 className="">Outlines:</h6>
                <Reorder.Group axis="y" values={headlines} onReorder={setHeadlines}>

                    {headlines.map((item, index) => (
                        <StructureItemComponent key={item} item={item} index={index} handleRemoveItem={handleRemoveItem} handleSaveItem={handleSaveItem}
                            onAdd={handleAddItem} isEditing={isEditing} IsEditMode={IsEditMode} setisEditing={setisEditing} />
                    ))}

                </Reorder.Group>
            </div>
        </div>
    );
}

export default ArticleSummary;
