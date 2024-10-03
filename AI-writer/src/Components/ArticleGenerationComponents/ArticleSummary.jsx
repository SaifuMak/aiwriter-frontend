import React, { useState, useEffect, useCallback } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";
import StructureItemComponent from './SmallComponents/StructureItemComponent';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag, useDrop } from 'react-dnd';
import ReorderableList from './ReorderableList';
import ButtonComponent from './SmallComponents/ButtonComponent';
import { Toaster, toast } from 'sonner';

function ArticleSummary({ setItems, items, GenerateArticle }) {
    const dispatch = useDispatch()
    const { selectedHeadline, selectedOutlines,loading, currentStep, ReorderedSelectedOutlines } = useSelector((state) => state.articleGeneration);


    useEffect(() => {
        if (ReorderedSelectedOutlines.length > 0) {
            setItems(ReorderedSelectedOutlines.flat())
        }
        else {
            setItems(selectedOutlines.flat());


        }



    }, []);


    return (
        <div className="w-full ">
        <div className="w-full px-4 py-10 lg:tracking-wide max-lg:text-sm 2xl:w-10/12 xl:w-11/12 xl:px-16 space-y-7">
            <div className="flex justify-between">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Article Summary</h2>
                {/* <button onClick={GenerateArticle} className="px-2 py-2 text-sm text-white rounded-md lg:px-4 lg:text-base bg-custom-dark-orange">Generate Article</button> */}
                <ButtonComponent
                    onClick={GenerateArticle}
                    label="Generate Article"
                    isVisible={currentStep === 6}
                />
            </div>
            <div className="">
                <h6 className="text-lg">Title:</h6>
                <div className="w-full mt-3 px-2 lg:px-6 py-2.5 max-md:text-sm border rounded-md border-opacity-80 border-stone-300">
                    {selectedHeadline}
                </div>

            </div>


            <div className="">
            <h6 className="text-lg ">Structure of Article:</h6>

                <DndProvider backend={HTML5Backend}>
                    <ReorderableList setItems={setItems} items={items} />
                </DndProvider>
            </div>
        </div>
        {!loading &&  <Toaster />  }

        </div>
    );
}

export default ArticleSummary;
