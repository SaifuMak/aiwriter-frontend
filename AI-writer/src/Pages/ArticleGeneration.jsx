import React, { useState } from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import ArticleLoader from '../Components/ArticleGenerationComponents/ArticleLoader'
import KeywordsForArticle from '../Components/ArticleGenerationComponents/KeywordsForArticle'
import GenerateOrRegenerateIdeas from '../Components/ArticleGenerationComponents/GenerateOrRegenerateIdeas'
import GenerateOutline from '../Components/ArticleGenerationComponents/GenerateOutline'

import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import MobileSidebar from '../Components/Sidebar/MobileSidebar'
import MobileArticleSidebar from '../Components/ArticleSidebar/MobileArticleSidebar'

import { IoIosArrowDropright } from "react-icons/io";

function ArticleGeneration() {
    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)


    return (
        <>
            <Navbar IsSidedbarOpened={IsSidedbarOpened} setIsSidedbarOpened={setIsSidedbarOpened} setIsMobileArticleSidebarOpened={setIsMobileArticleSidebarOpened} IsMobileArticleSidebarOpened={IsMobileArticleSidebarOpened} />
            <div className="relative flex font-poppins ">

                <span onClick={() => setIsSidedbarOpened(true)} className="absolute flex items-center justify-center h-12 -translate-x-3 rounded-full bg-stone-200 top-10 sm:hidden "><IoIosArrowDropright className='text-xl translate-x-2.5 bg-stone-200 rounded-full text-stone-500' /></span>

                {IsSidedbarOpened && (<MobileSidebar setIsSidedbarOpened={setIsSidedbarOpened} />)}

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
                <GenerateOutline />



                </div>

            </div>
        </>
    )
}

export default ArticleGeneration