import React from 'react'
import loader from '../../assets/Images/ArticleLoading.png'
import Rocketloader from '../../assets/Images/ArticleRocketLoader.png'
import Lottie from 'lottie-react';
import animationData from '../../assets/LottieFiles/RocketAnimation.json'


function ArticleLoader() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full ">
            <div className="w-64 h-64 xl:w-80 xl:h-80">
                {/* <img src={Rocketloader} alt="" className="w-full h-full " />    */}
                <Lottie animationData={animationData} className="w-full h-full" />
            </div>
            <span className="mt-10 text-center px-4 text-[#585858] ">Your copies created by artificial
            intelligence will appear here.</span>
        </div>
    )
}

export default ArticleLoader