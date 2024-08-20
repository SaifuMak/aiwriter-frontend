import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'

function Home() {
  return (
   
    <div className=" flex justify-center items-center ">
        <div className="w-2/12    ">
        <Sidebar />
        
        </div>
        <div className="w-10/12"></div>
    </div>
  )
}

export default Home