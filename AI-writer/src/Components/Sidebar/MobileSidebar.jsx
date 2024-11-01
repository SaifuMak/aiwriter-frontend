import React, { useEffect, useRef } from 'react'
import Sidebar from './Sidebar'
import ProfileDetails from '../Profile/ProfileDetails'

function MobileSidebar({ IsProfilePopup, setIsSidedbarOpened, setIsProfilePopup }) {

  const sidebarRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (!IsProfilePopup) {
          setIsSidedbarOpened(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsSidedbarOpened])

  return (

    <>
      {!IsProfilePopup ? (<div className="fixed inset-0 z-40 bg-black bg-opacity-55" >
        <div ref={sidebarRef} className="absolute  top-0 left-0 w-8/12 h-full sm:max-w-[200px] lg:max-w-[290px] bg-white shadow-lg 2xl:max-w-[390px] xl:max-w-[360px]  ">
          <Sidebar setIsProfilePopup={setIsProfilePopup} setIsSidedbarOpened={setIsSidedbarOpened} />
          {/* <button
            className="absolute text-3xl text-white top-2 right-4"
            onClick={() => setIsSidedbarOpened(false)}
          >
            ✕
          </button> */}
        </div>
      </div>) :

        (
          <ProfileDetails setIsProfilePopup={setIsProfilePopup} />
        )}
    </>



  )
}

export default MobileSidebar