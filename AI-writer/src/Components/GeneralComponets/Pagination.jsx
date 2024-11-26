import React from 'react'

function Pagination({ prevPage, nextPage, function_to_call, currentPage, TotalPages }) {
    return (
        <div className="flex justify-end px-8 my-8 space-x-4 ">
            <div className="flex justify-between w-7/12">
                <div className="space-x-2 ">
                    <button onClick={() => function_to_call(prevPage)} disabled={prevPage < 1} className={`px-6 py-1 text-white rounded-md  ${prevPage > 0 ? ' bg-custom-dark-orange' : 'bg-custom-dark-orange opacity-40'} bg-custom-dark-orange `}>prev</button>

                    <button onClick={() => function_to_call(nextPage)} disabled={nextPage == 1} className={`px-6 py-1 text-white rounded-md ${nextPage ? ' bg-custom-dark-orange' : 'bg-custom-dark-orange opacity-40'} `}>next</button>
                </div>
                <p className="flex items-center justify-center ">page <span className="flex items-center justify-center px-2 mx-1 rounded-sm bg-slate-200">{currentPage} </span>  of {TotalPages}</p>
            </div>
        </div>
    )
}

export default Pagination