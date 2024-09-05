import React, { useState, useCallback } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { FaGripVertical, FaPlus, FaMinus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";
import CustomToolTip from './SmallComponents/CustomToolTip';
import {setSelectedOutlines,setReorderedSelectedOutlines} from '../../Redux/Slices/ArticleGenerationSlice'




const ItemType = 'REORDERABLE_ITEM';

const ReorderableList = ({setItems,items}) => {

    const dispatch = useDispatch()

    const { selectedOutlines } = useSelector((state) => state.articleGeneration);
    console.log(items, '---------------------------------')

    
    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState('');

    const moveItem = useCallback(
        (dragIndex, hoverIndex) => {
            const updatedItems = [...items];
            const [removed] = updatedItems.splice(dragIndex, 1);
            updatedItems.splice(hoverIndex, 0, removed);
            setItems(updatedItems);
            if (editingIndex === dragIndex) {
                setEditingIndex(hoverIndex);
            }
        },
        [items, editingIndex]
    );

    const handleItemChange = (index, newValue) => {
        const updatedItems = [...items];
        updatedItems[index] = newValue;
        setItems(updatedItems);


        setEditingIndex(null);
        setEditingValue('');
    };

    const addItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index + 1, 0, 'new heading');
        setItems(updatedItems);


    };

    const removeItem = (index) => {
        const updatedItems = [...items];
        updatedItems.splice(index, 1);

        setItems(updatedItems);
        if (index === editingIndex) {
            setEditingIndex(null);
            setEditingValue('');
        }
    };

    const renderItem = (item, index) => (
        <ReorderableItem
            key={index}
            index={index}
            item={item}
            isEditing={editingIndex === index}
            editingValue={editingValue}
            setEditingIndex={setEditingIndex}
            setEditingValue={setEditingValue}
            moveItem={moveItem}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            items={items}
        />
    );

    return <div>{items.map((item, index) => renderItem(item, index))}</div>;
};

const ReorderableItem = ({
    item,
    index,
    moveItem,
    isEditing,
    editingValue,
    setEditingIndex,
    setEditingValue,
    onItemChange,
    onAddItem,
    onRemoveItem,
    items
}) => {
    const ref = React.useRef(null);


    const [, drop] = useDrop({
        accept: ItemType,
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                moveItem(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(ref);

    const handleDoubleClick = () => {
        setEditingIndex(index);
        setEditingValue(item);
    };

    const handleBlur = () => {
        onItemChange(index, editingValue);
    };

    const handleChange = (e) => {
        setEditingValue(e.target.value);
    };


    return (
        <div
            ref={drop}
            className="flex items-center  space-x-2 sm:space-x-6 justify-between  mt-6 py-3 sm:py-4 px-2 sm:px-3 bg-[#FEF2E8]"

            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <CustomToolTip title='Reorder Structure'>
                <span ref={ref} className=" cursor-grab">
                    <PiDotsSixVerticalBold className="text-3xl text-stone-700" />
                </span>
            </CustomToolTip>


            {isEditing ? (
                <input
                    value={editingValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    className="flex-grow max-sm:py-3 max-sm:px-3  px-5 py-5 bg-white border border-[#C2C2C2] rounded outline-none  "
                />
            ) : (
                <span onClick={handleDoubleClick} className="flex-grow px-5 py-5 bg-white border border-[#C2C2C2] border-opacity-45">
                    {item}
                </span>
            )}

            {/* <div className="">{items}</div> */}
            <div className="flex items-center space-x-4">

                <CustomToolTip title='Create Headline'>
                    <span onClick={() => onAddItem(index)} className="p-2 duration-150 bg-white rounded-md cursor-pointer hover:bg-stone-100">
                        <GoPlus className='text-md md:text-xl' />
                    </span>
                </CustomToolTip>

                <CustomToolTip title='Remove Headline'>
                    <span onClick={() => onRemoveItem(index)} className="p-2 duration-150 bg-white rounded-md cursor-pointer hover:bg-stone-100">
                        <GoDash className='text-md md:text-xl' />
                    </span>
                </CustomToolTip>


                {/* <span onClick={() => onAddItem(index)} className="cursor-pointer">
                    <GoPlus className='text-md md:text-xl' />

                </span>
                <span onClick={() => onRemoveItem(index)} className="cursor-pointer">
                    <GoDash className='text-md md:text-xl' />

                </span> */}


            </div>
        </div>
    );
};

export default ReorderableList;