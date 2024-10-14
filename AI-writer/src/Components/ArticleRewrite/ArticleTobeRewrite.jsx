import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';


function ArticleTobeRewrite({ showPopupAndCallAPI, handleArticle, ContentForRewriting, wordsCount, handleKeywords, KeywordsForRewriting, HandleRewriteArticle }) {

  const { ArticleRewrited  } = useSelector((state) => state.ArticleRewriter);

  return (
    <div className="p-8 lg:p-20 sm:p-12">

      <div className="">

        <h1 className="text-2xl ">Paste your existing article:</h1>
        <textarea onChange={handleArticle} value={ContentForRewriting} name="" id="" className='w-full p-4 mt-6 border border-opacity-50 rounded-md outline-none sm:p-8 min-h-96 border-slate-600' placeholder='Paste content here or Type...'></textarea>
        <p className={`${wordsCount > 3000 ? 'text-red-500' : ''}`}>Words limits: {ContentForRewriting ? wordsCount : 0 } /3000</p>

      </div>

      <div className="mt-6 lg:mt-20 sm:mt-10 ">

        <h1 className="text-lg ">Enter Keywords (optional):</h1>
        <TextareaAutosize onChange={handleKeywords} value={KeywordsForRewriting} name="" id="" className='w-full p-4 mt-3 border border-opacity-50 rounded-md outline-none resize-none border-slate-600' placeholder='Paste content here or Type...' />


      </div>


      {ArticleRewrited ? (
        <button onClick={()=> showPopupAndCallAPI(HandleRewriteArticle)} className="px-12 py-2 mt-8 tracking-wider text-white rounded-md bg-custom-dark-orange">Rewritee</button>

      ) : (
        <button onClick={HandleRewriteArticle} className="px-12 py-2 mt-8 tracking-wider text-white rounded-md bg-custom-dark-orange">Rewrite</button>

      )}



    </div>

  )
}

export default ArticleTobeRewrite