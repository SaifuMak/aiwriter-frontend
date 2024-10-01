import React, { useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import Logo from '../../assets/Images/Logo.png'
import { IoMenuOutline } from "react-icons/io5";
import LongArrow from '../../assets/Icons/LongArrow';
import ShortArrow from '../../assets/Icons/ShortArrow';
import { useDispatch, useSelector } from 'react-redux';
import { resetArticleGeneration } from '../../Redux/Slices/ArticleGenerationSlice'
import CompleteLogo from '../../assets/Logo/CompleteLogo';
import { Link } from 'react-router-dom';


function Navbar({ setIsSidedbarOpened, IsSidedbarOpened, setIsMobileArticleSidebarOpened, IsMobileArticleSidebarOpened }) {
    const { currentStep, selectedHeadline, selectedOutlines, keywords } = useSelector((state) => state.articleGeneration);
    const dispatch = useDispatch();


    const [TopicChoosen, setTopicChoosen] = useState(true)
    const [IsOutline, setIsOutline] = useState(false)

    console.log(currentStep, '--------------------------------')


    return (
        <div className="w-full flex justify-center space-x-3 sm:space-x-6 lg:space-x-12 xl:space-x-20 items-center py-6 px-2 lg:px-6 xl:px-7 bg-[#14212C]">

            <div className="2xl:w-[340px] flex justify-between items-center xl:w-[310px] sm:w-[190px] lg:w-[260px] ">

                <div className="w-32 max-sm:hidden xl:w-44">
                    <Link to='/' className='cursor-pointer '>
                        <CompleteLogo />
                    </Link>

                </div>
                <IoMenuOutline onClick={() => setIsSidedbarOpened(!IsSidedbarOpened)} className={`text-4xl  rounded-md   max-sm:hidden cursor-pointer  text-custom-dark-orange`} />

                <IoMenuOutline onClick={() => setIsMobileArticleSidebarOpened(!IsMobileArticleSidebarOpened)} className={`text-4xl  sm:hidden rounded-md cursor-pointer  text-custom-dark-orange`} />

            </div>

            <div className="flex items-center justify-between flex-1 ">

                {/* Desktop view  */}
                <div className="flex items-center justify-center space-x-1 text-sm tracking-wider text-white max-sm:hidden lg:space-x-3 lg:text-lg ">
                    <span className=" text-custom-dark-orange">Choose a Topic{currentStep}</span>
                    <LongArrow isActive={keywords.length > 0} />
                    <span className={`${selectedHeadline ? 'text-custom-dark-orange' : ''}`}>Get an Outline</span>
                    <LongArrow isActive={selectedHeadline} />
                    <span className={`${selectedOutlines.length > 0 || currentStep === 7 ? 'text-custom-dark-orange' : ''}`}>Generate Article</span>
                </div>


                {/* mobile view  */}
                <div className="flex items-center justify-center space-x-1 text-sm tracking-wider text-white sm:hidden ">
                    <span className=" text-custom-dark-orange"> Topic</span>
                    <ShortArrow isActive={TopicChoosen} />
                    <span className={`${IsOutline ? 'text-custom-dark-orange' : ''}`}> Outline</span>
                    <ShortArrow isActive={IsOutline || currentStep === 7} />
                    <span className={`${selectedOutlines.length > 0 || currentStep === 7 ? 'text-custom-dark-orange' : ''}`}>Generate Article</span>
                </div>

                <RxCross1 onClick={() => dispatch(resetArticleGeneration())} className='p-1 text-2xl font-semibold transition-transform duration-300 transform rounded-full cursor-pointer sm:text-3xl hover:rotate-90 hover:bg-slate-700 text-custom-dark-orange ' />
            </div>

        </div>
    )
}

export default Navbar