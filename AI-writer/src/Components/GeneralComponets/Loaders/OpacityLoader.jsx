import React from 'react'
import { LuLoader } from 'react-icons/lu'
import { LuLoader2 } from "react-icons/lu";


function OpacityLoader() {

    return (

        // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* <div className="flex relative items-center justify-center w-[350px] sm:w-[600px] py-10 sm:py-16 rounded-lg shadow-lg bg-custom-dark"> */}
            {/* <LuLoader className='mt-10 ml-40 text-4xl animate-spin xl:ml-80 lg:ml-64 text-custom-dark-orange' /> */}
            <LuLoader2 className='mt-10 ml-40 text-4xl animate-spin xl:ml-80 lg:ml-64 text-custom-dark-orange' />

            {/* </div> */}
        </div>
    )
}

export default OpacityLoader