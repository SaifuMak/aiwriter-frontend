import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { LuCopy, LuCopyCheck } from 'react-icons/lu';
import './finalarticle.css';
import { countWords } from '../../Utils/Helperfunctions';
import SuccessToast from '../../Utils/SuccessToast';
import ArticleLoader from '../ArticleGenerationComponents/ArticleLoader';
import PulseLoader from 'react-spinners/PulseLoader';
import { Toaster, toast } from 'sonner';
import { setIsArticleLoadingCompleted } from '../../Redux/Slices/ArticleGenerationSlice'



function FinalArticle({ setisArticleGenerated, isArticleGenerated }) {
  const dispatch = useDispatch()


  const { finalArticle, IsArticleLoadingCompleted } = useSelector((state) => state.articleGeneration); // HTML string from backend
  const [isCopied, setIsCopied] = useState(false);

  const [visibleHTML, setVisibleHTML] = useState(''); // Visible part of HTML (simulating typing effect)
  const [index, setIndex] = useState(0); // To track which part of the HTML is visible
  const contentRef = useRef(null); // Reference to the content container
  const [isManualyScrolled, setisManualyScrolled] = useState(false)




  const ArticleGenerated = () => {
    if (finalArticle) {
      SuccessToast('Generation completed! Your article is ready.');
    }
  };


  // const copyToClipboard = () => {
  //   const text = document.querySelector('.article-content').innerText;
  //   navigator.clipboard.writeText(text).then(() => {
  //     setIsCopied(true);
  //   });
  // };


  // const copyToClipboard = () => {
  //   // Get the HTML content of the article
  //   const htmlContent = document.querySelector('.article-content').innerHTML;
  
  //   // Copy the HTML content to the clipboard
  //   navigator.clipboard.writeText(htmlContent).then(() => {
  //     setIsCopied(true);
  //     setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
  //   }).catch((err) => {
  //     console.error("Failed to copy: ", err);
  //   });
  // };


  const copyToClipboard = () => {
    const articleContent = document.querySelector('.article-content');
  
    // Clone the article content to include inline styles
    const clonedContent = articleContent.cloneNode(true);
  
    // Get computed styles and apply them inline
    // const applyInlineStyles = (element) => {
    //   const computedStyle = window.getComputedStyle(element);
    //   for (let style of computedStyle) {
    //     element.style[style] = computedStyle.getPropertyValue(style);
    //   }
    // };
  

    
    // Apply styles to the cloned content and all its children

    // applyInlineStyles(clonedContent);
    // clonedContent.querySelectorAll("*").forEach((child) => applyInlineStyles(child));
  
    // Get the HTML with inline styles
    const styledHTML = clonedContent.outerHTML;
  
    // Use Clipboard API to copy as HTML
    navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([styledHTML], { type: 'text/html' }),
        'text/plain': new Blob([articleContent.innerText], { type: 'text/plain' })
      })
    ]).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500); // Reset copy state after 2 seconds
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };
  
  



  // Simulate typing effect
  // useEffect(() => {
  //   if (index < finalArticle.length) {
  //     const timer = setTimeout(() => {
  //       setVisibleHTML(finalArticle.slice(0, index + 1)); // Reveal the HTML progressively
  //       setIndex(index + 1);
  //     }, 10); // Speed of typing
  //     return () => clearTimeout(timer);
  //   }
  //   if (index === finalArticle.length && !IsArticleLoadingCompleted) {
  //     // setisArticleGenerated(true); // Set flag to prevent duplicate messages
  //     dispatch(setIsArticleLoadingCompleted(true))
  //     ArticleGenerated(); // Call the function to show the message
  //   }
  // }, [index, finalArticle]);

  // worker.postMessage('i have sent message to the worker ');



  useEffect(() => {
    if (IsArticleLoadingCompleted) {
      return
    }

    const worker = new Worker(new URL('../../workers/articleWorker.js', import.meta.url));


    if (finalArticle && finalArticle.length > 0) {
      

      worker.postMessage({ article: finalArticle, index: 0 });
      // worker.postMessage('i have sent message to the worker ');





      worker.onmessage = (e) => {
        const { visibleHTML: newHTML, newIndex, done } = e.data;
        setVisibleHTML(newHTML);
        setIndex(newIndex);

        // Once done, dispatch completion action and show success toast
        if (done) {
          console.log('finished processing')
          dispatch(setIsArticleLoadingCompleted(true));
          ArticleGenerated();
        }
      };
    }


    return () => {
      // Clean up Web Worker
      worker.terminate();
    };
  }, [finalArticle]);






  useEffect(() => {
    if (isManualyScrolled) {
      return;
    }

    const scrollElement = contentRef.current;

    if (scrollElement) {
      // Smooth scroll to the bottom
      scrollElement.scrollTo({
        top: scrollElement.scrollHeight,
        behavior: 'smooth',
      });
    }

  }, [visibleHTML, isManualyScrolled]);




  useEffect(() => {
    const handleWheel = () => {
      // This will trigger when the user scrolls using the mouse wheel or trackpad
      // dispatch(setIsScrolling())
      setisManualyScrolled(true)
      // Dispatch an action to stop auto-scrolling when the user scrolls
      // dispatch(setScrollingfalse());
    };

    const scrollElement = contentRef.current;

    if (scrollElement) {
      // Listen for the 'wheel' event on the content element
      scrollElement.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (scrollElement) {
        // Cleanup the event listener when the component unmounts
        scrollElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);



  const wordCount = countWords(visibleHTML);
  const characterCount = index;

  const FinalWordCount = countWords(finalArticle)
  const FinalCharectorCount = finalArticle.length


  return (
    <>
      {finalArticle.length > 0 ? (

        <div className="relative article-container font-poppins">
          {visibleHTML && !IsArticleLoadingCompleted ? (<div className="flex items-center px-4 mt-10 sm:px-10 xl:px-20 2xl:px-28">
            <span className="flex justify-center w-10 ">{wordCount}</span>
            <span className="">words</span>
            <span className="ml-1">/</span>
            <span className="flex justify-center w-10 ml-1">  {characterCount}</span>
            <span className="ml-1 ">characters</span>
          </div>)
            : (
              <div className="flex items-center px-4 mt-10 sm:px-10 xl:px-20 2xl:px-28">
                <span className="flex justify-center w-10 ">{FinalWordCount}</span>
                <span className="">words</span>
                <span className="ml-1">/</span>
                <span className="flex justify-center w-10 ml-1">{FinalCharectorCount}</span>
                <span className="ml-1 ">characters</span>
              </div>
            )}

          {IsArticleLoadingCompleted && (<motion.button
            drag
            dragConstraints={{ top: 0, bottom: 600, left: 0, right: 0 }} // Adjust the constraints as needed
            className="fixed right-10 flex items-center justify-center px-5 py-1 space-x-1 top-24 sm:top-[250px] rounded-3xl bg-custom-dark"
            onClick={copyToClipboard}
            layout // This enables the animation when the size of the button changes
            transition={{ type: 'spring', stiffness: 200, damping: 30 }} // Smooth spring animation for resizing
          >
            {isCopied ? <LuCopyCheck className="font-semibold text-white" /> : <LuCopy className="font-semibold text-white" />}
            <span className="text-white">{isCopied ? 'Copied' : 'Copy'}</span>
          </motion.button>)}



          {/* Render the progressively revealed HTML with styles */}

          {IsArticleLoadingCompleted ? (
            <div
              className="px-4 py-10 min-h-[900px] max-h-[900px] sm:px-10 xl:px-20 2xl:px-28 article-content"
              dangerouslySetInnerHTML={{ __html: finalArticle }} // This renders the HTML progressively
              style={{ overflowY: 'auto' }} // Ensure the container scrolls
            />

          ) : (
            <div
              ref={contentRef}
              className="px-4 py-10 min-h-[780px] max-h-[780px] sm:px-10 xl:px-20 2xl:px-28 article-content"
              dangerouslySetInnerHTML={{ __html: visibleHTML }} // This renders the HTML progressively
              style={{ overflowY: 'auto' }} // Ensure the container scrolls
            />

          )}


          {!IsArticleLoadingCompleted && (<div className="flex items-center justify-center ">
            <div className="flex items-center px-3 text-nowrap"> <span className="text-xl font-semibold text-custom-black-text">Your content is being cooked</span>
              <PulseLoader className='ml-2' /></div>
          </div>)}
          {/* <Toaster position="bottom-right" /> */}

        </div>

      ) : (
        <ArticleLoader text='An error occurred. Please attempt to regenerate the article. ' />

      )}
      <Toaster />

    </>
  );
}

export default FinalArticle;
