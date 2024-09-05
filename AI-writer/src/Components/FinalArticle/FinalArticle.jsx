import React, { useRef,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaCopy } from 'react-icons/fa'; // Import the FaCopy icon from react-icons
import { IoCopyOutline } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";

import { LuCopy } from "react-icons/lu";
import { LuCopyCheck } from "react-icons/lu";
import './finalarticle.css';

function FinalArticle({ articleHTML }) {
    // const {finalArticle } = useSelector((state) => state.articleGeneration);

    const [IsCopied, setIsCopied] = useState(false)
  const contentRef = useRef(null);

  const copyToClipboard = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText;
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true)
      });
    } else {
      console.log('failed to copy ')
    }
  };

  return (
    <div className="article-container">
      <button className="flex items-center justify-center px-5 py-1 space-x-1 rounded-3xl bg-custom-dark" onClick={copyToClipboard}>
       {IsCopied ? (<LuCopyCheck className='font-semibold text-white' />) : (<LuCopy className='font-semibold text-white' />)}  {/* Use the FaCopy icon */}
        <span className="text-white ">{ IsCopied ? 'copied' : 'copy'}</span>
      </button>
      <div
        ref={contentRef}
        className="px-4 py-20 sm:px-10 xl:px-20 2xl:px-28"
        dangerouslySetInnerHTML={{ __html: articleHTML }}
      />
    </div>
  );
}

export default FinalArticle;
