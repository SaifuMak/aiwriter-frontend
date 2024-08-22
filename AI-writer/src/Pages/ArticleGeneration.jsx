import React from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import ArticleLoader from '../Components/ArticleGenerationComponents/ArticleLoader'
import KeywordsForArticle from '../Components/ArticleGenerationComponents/KeywordsForArticle'

function ArticleGeneration() {
    return (
        <div className="flex font-poppins ">
            <div className="xl:w-[500px] sm:w-[200px] lg:w-[400px] ">
                <ArticleSidebar />
            </div>
          
                {/* <ArticleLoader /> */}

                <KeywordsForArticle />

       

        </div>
    )
}

export default ArticleGeneration