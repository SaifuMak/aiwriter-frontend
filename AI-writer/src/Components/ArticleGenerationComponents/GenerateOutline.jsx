import React from 'react'

function GenerateOutline() {
    return (

        <div className="w-full px-4 py-10 lg:tracking-wide max-lg:text-sm lg:w-11/12 xl:px-16 space-y-7 ">
            <div className="flex justify-between">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Article Summary</h2>
                <button className="px-2 py-2 text-sm text-white rounded-md lg:px-4 lg:text-base bg-custom-dark-orange">Generate Outlines</button>
            </div>
            <div className="">
                <h6 className="">Title:</h6>
                <div className="w-full px-2 lg:px-6 py-2.5    mt-1 border rounded-md border-opacity-80 border-custom-dark-orange">
                    Unlocking Success: The Importance of SEO for Sm
                </div>
            </div>
            <h6 className="">Outlines:</h6>
        </div>
    )
}


export default GenerateOutline