import React from 'react'

function Sidebar() {
  return (
    <div className='bg-custom-dark flex flex-col space-y-6  px-4 items-center  h-svh py-6'>

        <section className=' rounded-lg  border-2 border-custom-dark-orange border-opacity-80 py-6 w-full   ' >
            <div className="flex items-center px-3   ">
                <div className=" shrink-0 w-10 h-10  ">
                <img src="https://static.vecteezy.com/system/resources/previews/004/885/882/non_2x/ai-artificial-intelligence-logo-in-hands-artificial-intelligence-and-machine-learning-concept-sphere-grid-wave-with-binary-code-big-data-innovation-technology-neural-networks-illustration-vector.jpg" alt="" className=" " />
                </div>
                 <h2 className="text-3xl  ml-3 text-white font-bold ">LOGO</h2>
            </div>
        </section>

        {/* <section className=' rounded-2xl border border-custom-dark-orange py-4    w-full   ' >
            <div className="flex items-center   ">
                <img src="" alt="" className="w-10 h-10 px-4 " />
                 <h2 className="text-4xl  text-white font-bold ">LOGO</h2>
            </div>
        </section> */}

    </div>
  )
}

export default Sidebar