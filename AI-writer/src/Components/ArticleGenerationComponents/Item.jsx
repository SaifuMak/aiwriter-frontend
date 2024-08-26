import React from 'react'
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { PiDotsSixVerticalBold } from "react-icons/pi";


function Item({ item }) {
    const dragControls = useDragControls();
    return (
        <Reorder.Item
            value={item}
            id={item}
            dragListener={false}
            dragControls={dragControls}
        >
            <span className='px-10  bg-fuchsia-300'>{item}</span>
            <div
            className='w-10 bg-red-50'
                
                // onPointerDown={(e) => controls.start(e)}
                onPointerDown={(event) => dragControls.start(event)}
            >
                <PiDotsSixVerticalBold className='text-xl lg:text-3xl shrink-0 text-stone-600' />
            </div>
            {/* <ReorderIcon dragControls={dragControls} /> */}
        </Reorder.Item>
    )
}

export default Item