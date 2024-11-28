import React from 'react'
import AnimatedBackButton from '../Buttons/AnimatedBackButton'
import './fileviewer.css';



function FileViewer({ File, onClose }) {
    return (
        <div className='w-full h-full py-10 px-10 lg:w-10/12'>

            <AnimatedBackButton HandleGoBack={onClose} />
            <div
              className="px-4 py-20 min-h-[1000px] max-h-[1000px]  file-content"
              dangerouslySetInnerHTML={{ __html: File }} // This renders the HTML progressively
              style={{ overflowY: 'auto' }} // Ensure the container scrolls
            />
          
              
        </div>
    )
}

export default FileViewer