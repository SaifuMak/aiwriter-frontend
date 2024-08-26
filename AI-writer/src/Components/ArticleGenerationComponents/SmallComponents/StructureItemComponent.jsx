import React from 'react'
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";


function StructureItemComponent({ item }) {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={item}
            id={item}
            dragListener={false}
            dragControls={dragControls}
        >
            <div className="flex items-center justify-between px-2 py-3 mt-6 space-x-2 rounded-md md:py-5 md:px-6 md:space-x-10 bg-custom-lighter-orange">

                <div className="flex items-center space-x-3">

                    <div
                        className='p-1 rounded-md cursor-grab hover:bg-[#FEE3CE] text-stone-600'
                        onPointerDown={(event) => dragControls.start(event)}
                    >
                        <PiDotsSixVerticalBold className='text-xl lg:text-3xl shrink-0 ' />
                    </div>

                    <span className="p-2 text-sm bg-white border rounded-md lg:p-4 lg:text-base border-stone-200">
                        {item}
                    </span>

                </div>

                <div className="flex space-x-2 md:space-x-6">
                    <span className="p-2 bg-white rounded-md cursor-pointer">
                        <GoPlus className='text-md md:text-xl' />
                    </span>

                    <span className="p-2 bg-white rounded-md cursor-pointer">
                        <GoDash className='text-md md:text-xl' />
                    </span>
                </div>

            </div>
        </Reorder.Item>
    )
}

export default StructureItemComponent