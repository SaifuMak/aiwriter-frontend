import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import './finalarticle.css';
import { countWords } from '../../Utils/Helperfunctions';
import {setIsScrolling ,setScrollingfalse} from '../../Redux/Slices/ArticleGenerationSlice'


function FinalArticle() {
  const dispatch = useDispatch()
  const { finalArticle ,IsScrolled} = useSelector((state) => state.articleGeneration); // HTML string from backend
  const [isCopied, setIsCopied] = useState(false);
  const [visibleHTML, setVisibleHTML] = useState(''); // Visible part of HTML (simulating typing effect)
  const [index, setIndex] = useState(0); // To track which part of the HTML is visible
  const contentRef = useRef(null); // Reference to the content container
  const [isUserScrolling, setIsUserScrolling] = useState(false); // Flag to track user scroll



  const copyToClipboard = () => {
    const text = document.querySelector('.article-content').innerText;
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
    });
  };

  // Simulate typing effect
  useEffect(() => {
    if (index < finalArticle.length) {
      const timer = setTimeout(() => {
        setVisibleHTML(finalArticle.slice(0, index + 1)); // Reveal the HTML progressively
        setIndex(index + 1);
      }, 4); // Speed of typing
      return () => clearTimeout(timer);
    }
  }, [index, finalArticle]);

  // Automatically scroll to the bottom when content updates
  useEffect(() => {
    if (contentRef.current ) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleHTML]);


  useEffect(() => {
    const handleScroll = () => {
      setIsUserScrolling(true);
      dispatch(setIsScrolling())
    };
  
    const scrollElement = contentRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  

  return (
    <div className="relative article-container font-poppins">
      <button onClick={()=>dispatch(setScrollingfalse())} className="bg-red-100 "> click</button>
      <div className="flex items-center px-4 mt-10 sm:px-10 xl:px-20 2xl:px-28">
        <span className="flex justify-center w-10 ">{countWords(visibleHTML)}</span>
      {IsScrolled &&   <span className="">words</span>}
        <span className="ml-1">/</span>
        <span className="flex justify-center w-10 ml-1">  {index}</span>
        <span className="ml-1 ">characters</span>
      </div>

      <motion.button
        drag
        dragConstraints={{ top: 0, bottom: 600, left: 0, right: 0 }} // Adjust the constraints as needed
        className="fixed right-10 flex items-center justify-center px-5 py-1 space-x-1 top-24 sm:top-[250px] rounded-3xl bg-custom-dark"
        onClick={copyToClipboard}
        layout // This enables the animation when the size of the button changes
        transition={{ type: 'spring', stiffness: 200, damping: 30 }} // Smooth spring animation for resizing
      >
        {isCopied ? <LuCopyCheck className="font-semibold text-white" /> : <LuCopy className="font-semibold text-white" />}
        <span className="text-white">{isCopied ? 'Copied' : 'Copy'}</span>
      </motion.button>

      {/* Render the progressively revealed HTML with styles */}
      <div
        ref={contentRef}
        className="px-4 py-10 sm:px-10 xl:px-20 2xl:px-28 article-content"
        dangerouslySetInnerHTML={{ __html: visibleHTML }} // This renders the HTML progressively
        style={{ maxHeight: '800px', overflowY: 'auto' }} // Ensure the container scrolls
      />
    </div>
  );
}

export default FinalArticle;
