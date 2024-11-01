import React, { useEffect } from 'react'
import { SlHome } from "react-icons/sl";
import { AiOutlineFileSync } from "react-icons/ai";
import { GrDocumentTime } from "react-icons/gr";
import { LuFileEdit } from "react-icons/lu";
import { GrUploadOption } from "react-icons/gr";
import { IoMenuOutline } from "react-icons/io5";
import { setWordsCount } from '../../Redux/Slices/AssetsSlice'

import CompleteLogo from '../../assets/Logo/CompleteLogo';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPage } from '../../Redux/Slices/NavigationSlice'
import { loginSuccess, setLogout } from '../../Redux/Slices/AuthSlice'
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { ResetRewriteArticle } from '../../Redux/Slices/ArticleRewriterSlice'
import { MdOutlineDocumentScanner } from "react-icons/md";

import { Link } from 'react-router-dom';
import Axiosinstance from '../../Axios/Axiosinstance'


function Sidebar({ setIsProfilePopup, setIsSidedbarOpened }) {



  const dispatch = useDispatch()
  const { IsAuthenticated, Username, Email } = useSelector(state => state.auth);
  const { pageSelected } = useSelector(state => state.Navigation);
  const { IsRewriteArticleLoadingCompleted } = useSelector((state) => state.ArticleRewriter);






  const getMenuStyle = (page) => {
    console.log(page, pageSelected, 'selected page, real selected  ')
    return page === pageSelected ? 'text-[#FB923C] bg-[#FFFFFF1A]' : 'text-white'
  }

  const HandlePageChange = (page) => {
    dispatch(setSelectedPage(page))

    if (page === 'Article Rewriter' && IsRewriteArticleLoadingCompleted) {
      dispatch(ResetRewriteArticle())

    }
  }

  const getWordsCount = async () => {
    try {

      const response = await Axiosinstance.get('payment/get-assets')
      console.log('response')
    }
    
    catch (error) {
      console.log(error)
    }
  }


  
   useEffect(() => {
      getWordsCount()
    
   }, [])
   


  return (

    <div className='flex flex-col items-center h-full px-2 py-16 space-y-12 md:py-10 md:space-y-10 xl:space-y-12 xl:px-4 bg-custom-dark'>

      <section className='w-full border rounded-lg xl:py-2 border-custom-dark-orange border-opacity-60 ' >

        <div className="w-32 mt-2 ml-1 xl:w-44 ">
          <Link to='/' className='cursor-pointer '>
            <CompleteLogo />
          </Link>

        </div>
      </section>

      <section className="flex flex-col justify-start w-full space-y-1 ">
        <Link to='/' onClick={() => HandlePageChange('Home')} className='cursor-pointer '>
          <div className={`flex items-center  lg:text-base xl:text-base  space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer ${getMenuStyle('Home')}  hover:text-custom-dark-orange`}>
            <SlHome className='' />
            <span className="">Home</span>
          </div>
        </Link>


        <div className='flex items-center  lg:text-base xl:text-base text-white space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer  hover:text-custom-dark-orange'>
          <AiOutlineFileSync className='' />
          <span className="">History</span>
        </div>


        <Link to='/choose-article-writer' onClick={() => HandlePageChange('Article Writer')} className='cursor-pointer '>
          <div className={`flex items-center  lg:text-base xl:text-base  space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer ${getMenuStyle('Article Writer')}  hover:text-custom-dark-orange`}>
            <LuFileEdit className='' />
            <span className="">Article Writer</span>
          </div>
        </Link>


        <Link to='/article-rewriter' onClick={() => HandlePageChange('Article Rewriter')} className='cursor-pointer '>

          <div className={`flex items-center ${getMenuStyle('Article Rewriter')}   lg:text-base xl:text-base text-white space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer  hover:text-custom-dark-orange`}>
            <LuFileEdit className='' />
            <span className="">Article Rewriter</span>
          </div>
        </Link>



        <Link to='/plagiarism-checker' onClick={() => HandlePageChange('Plagiarism Checker')} className='cursor-pointer '>

          <div className={`flex items-center ${getMenuStyle('Plagiarism Checker')}   lg:text-base xl:text-base text-white space-x-1 xl:space-x-2 px-2 xl:px-4 xl:py-1.5 py-1 hover:bg-[#FFFFFF1A] duration-150 cursor-pointer  hover:text-custom-dark-orange`}>
            <MdOutlineDocumentScanner className='' />
            <span className="">Plagiarism Checker
            </span>
          </div>
        </Link>

        {/* <Link to='/plagiarism-checker'>
          <div className={menustyle}>
            <HiOutlineDocumentMagnifyingGlass className='' />
            <span className="">Plagiarism Checker</span>
          </div>
        </Link> */}

      </section>


      <section className="w-full px-2 py-5 space-y-2 border rounded-lg xl:space-y-5 xl:px-4 border-custom-dark-orange border-opacity-60 ">

        <div className="flex flex-col space-y-1 text-white">
          <span className="font-medium ">Superior words</span>
          <span className="text-sm">123,456</span>
        </div>

        <div className="flex flex-col space-y-1 text-white">
          <span className="font-medium ">Premium Credits</span>
          <span className="text-sm">123</span>
        </div>


        <button className="flex items-center justify-center max-xl:text-sm rounded-sm w-full py-1 xl:py-1.5 text-white hover:bg-hover-button-color  bg-custom-dark-orange "><GrUploadOption className='mr-1' />Upgrade</button>
      </section>


      {IsAuthenticated && (<section className='w-full py-4 text-white border rounded-lg xl:py-8 border-custom-dark-orange border-opacity-60 ' >

        <div onClick={() => setIsProfilePopup(true)} className="flex items-center justify-between px-2 cursor-pointer xl:px-4 ">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex items-center justify-center w-6 h-6 rounded-full max-lg:text-sm xl:w-8 xl:h-8 bg-custom-dark-orange">M</div>
            <span className="text-base xl:text-lg">{Username}</span>
          </div>

          <IoMenuOutline className='text-3xl text-stone-200' />

        </div>
      </section>)}


    </div>
  )
}

export default Sidebar