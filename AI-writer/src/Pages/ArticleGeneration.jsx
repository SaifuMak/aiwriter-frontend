import React, { useState } from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import ArticleLoader from '../Components/ArticleGenerationComponents/ArticleLoader'
import KeywordsForArticle from '../Components/ArticleGenerationComponents/KeywordsForArticle'
import GenerateOrRegenerateIdeas from '../Components/ArticleGenerationComponents/GenerateOrRegenerateIdeas'
import GenerateOutline from '../Components/ArticleGenerationComponents/GenerateOutline'
import Worksheet from '../Components/ArticleGenerationComponents/Worksheet'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import MobileSidebar from '../Components/Sidebar/MobileSidebar'
import MobileArticleSidebar from '../Components/ArticleSidebar/MobileArticleSidebar'
import StructureOfArticle from '../Components/ArticleGenerationComponents/StructureOfArticle'
import ArticleSummary from '../Components/ArticleGenerationComponents/ArticleSummary'

import { IoIosArrowDropright } from "react-icons/io";

import { motion } from 'framer-motion';

function ArticleGeneration() {
    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)

    const [IsProfilePopup, setIsProfilePopup] = useState(false)



    return (
        <>
            <Navbar IsSidedbarOpened={IsSidedbarOpened} setIsSidedbarOpened={setIsSidedbarOpened} setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} IsMobileArticleSidebarOpened={IsMobileArticleSidebarOpened} />
            <div className="relative flex font-poppins ">

                <motion.span
                    drag
                    dragConstraints={{ left: 0, top: 0, right: 0, bottom: 400 }} // Optional: constraints for drag area
                    //  initial={{ x: -20 }} // Move the initial position to the left
                    //  animate={{ x: -10 }} // Keep the element at the adjusted position
                    dragElastic={0.01}
                    onClick={() => setIsSidedbarOpened(true)} className="fixed flex items-center justify-center h-12 rounded-full -left-3 bg-stone-400 top-30 sm:hidden "><IoIosArrowDropright className='text-xl translate-x-2.5 bg-stone-200 rounded-full text-stone-500' /></motion.span>

                {IsSidedbarOpened && (<MobileSidebar IsProfilePopup={IsProfilePopup} setIsSidedbarOpened={setIsSidedbarOpened} setIsProfilePopup={setIsProfilePopup} />)}

                <div className="xl:w-[500px] sm:w-[200px] lg:w-[400px] max-sm:hidden ">
                    <ArticleSidebar />
                </div>
                
                <div className="w-full ">
                    {IsMobileArticleSidebarOpened && (<div className=" sm:hidden">
                        <MobileArticleSidebar setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} />
                    </div>)}

                    {/* <ArticleLoader /> */}
                    {/* <KeywordsForArticle /> */}
                    {/* <GenerateOrRegenerateIdeas /> */}
                    {/* <GenerateOutline /> */}
                    {/* <StructureOfArticle /> */}
                    <ArticleSummary />
                    {/* <Worksheet /> */}



                </div>

            </div>
        </>
    )
}

export default ArticleGeneration