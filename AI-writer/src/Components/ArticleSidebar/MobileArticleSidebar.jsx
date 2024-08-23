import React, {useRef} from 'react'

import ArticleSidebar from './ArticleSidebar'

function MobileArticleSidebar({setIsMobileArticleSidebarOpened}) {
   

   
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-55">
          <div   className="absolute top-0 left-0 w-10/12 h-full bg-white shadow-lg ">
            <ArticleSidebar />
            <button
              className="absolute text-xl text-white top-12 right-4"
              onClick={() =>  setIsMobileArticleSidebarOpened(false)}
            >
              ✕
            </button>
          </div>
        </div>
  )
}

export default MobileArticleSidebar