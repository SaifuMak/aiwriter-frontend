import React, { useEffect, useRef } from 'react'
import Sidebar from './Sidebar'





function MobileSidebar({ IsProfilePopup, setIsSidedbarOpened, setIsProfilePopup }) {


  return (


    <>
      {!IsProfilePopup ? (<div className = "fixed inset-0 z-40 bg-black bg-opacity-55" >
        <div className="absolute  top-0 left-0 w-8/12 h-full sm:max-w-[200px] lg:max-w-[290px] bg-white shadow-lg 2xl:max-w-[390px] xl:max-w-[360px]  ">
          <Sidebar setIsProfilePopup={setIsProfilePopup} setIsSidedbarOpened={setIsSidedbarOpened} />
          <button
            className="absolute text-3xl text-white top-2 right-4"
            onClick={() => setIsSidedbarOpened(false)}
          >
            ✕
          </button>
        </div>

    </div>) :


  
     
     ( <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-55">
        <div className="w-[600px]  flex  justify-center  py-10 items-center  bg-custom-dark rounded-lg shadow-lg ">
          <div className="flex flex-col items-center justify-center space-y-8 text-white ">
            <div className="flex flex-col items-center justify-center ">

              <span className="flex items-center justify-center w-24 h-24 text-3xl text-white duration-300 border-2 rounded-full cursor-pointer hover:bg-custom-dark-orange border-custom-dark-orange border-opacity-65 bg-custom-dark">
                M
              </span>

              <span className="mt-2 text-2xl ">MakTal</span>
              <span className="">maktal@gmail.com</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-4 ">
              <button className="w-40 py-2 text-sm duration-300 rounded-md bg-slate-500 hover:bg-custom-dark-orange">Change password</button>
              <button className="w-40 py-2 text-sm rounded-md bg-slate-500 hover:bg-custom-dark-orange">Logout</button>
            </div>
          </div>
        </div>
      </div>)}
     

      </>

            
 
  )
}

export default MobileSidebar