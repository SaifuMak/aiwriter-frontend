import React from 'react'
import Sidebar from './Sidebar'

function MobileSidebar() {
  const [IsSidebarVisible, setIsSidebarVisible] = useState(false)

  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75">
          <div className="absolute top-0 left-0 w-8/12 h-full max-w-xs bg-white shadow-lg">
            <Sidebar />
            <button
              className="absolute text-xl text-white top-2 right-4"
              onClick={() => setIsSidebarVisible(false)}
            >
              ✕
            </button>
          </div>
        </div>
  )
}

export default MobileSidebar