import React, {useEffect, useRef} from 'react'
import Sidebar from './Sidebar'

function MobileSidebar({setIsSidedbarOpened}) {
  const sidebarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidedbarOpened(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsSidedbarOpened])

  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-55">
          <div  ref={sidebarRef} className="absolute  top-0 left-0 w-8/12 h-full sm:max-w-[200px] lg:max-w-[290px] bg-white shadow-lg 2xl:max-w-[390px] xl:max-w-[360px]  ">
            <Sidebar />
            <button
              className="absolute text-xl text-white sm:hidden top-2 right-4"
              onClick={() => setIsSidedbarOpened(false)}
            >
              ✕
            </button>
          </div>
        </div>
  )
}

export default MobileSidebar