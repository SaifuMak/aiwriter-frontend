import React from 'react'
import loader from '../../assets/Images/ArticleLoading.png'
import Rocketloader from '../../assets/Images/ArticleRocketLoader.png'
import Lottie from 'lottie-react';
import animationData from '../../assets/LottieFiles/RocketAnimation.json'
import { useDispatch, useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';



function ArticleLoader({ text, IsQuickWriter }) {
  const { currentStep, loading } = useSelector((state) => state.articleGeneration);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <div className="">
        {loading ? (
          <div className="w-64 h-64 xl:w-80 xl:h-80">
            <Lottie animationData={animationData} className="w-full h-full" />
            <div className="flex items-center justify-center">
              {currentStep === 0 && (<span className="mt-10 text-center px-4 text-[#585858] ">Kickoff Your Article by Entering Your Topic</span>)}
              {(currentStep === 1 && !IsQuickWriter) && (<span className="mt-10 text-center px-4 text-[#585858] "> Your keywords are being generated</span>)}

              {currentStep === 2 && (<span className="mt-10 text-center px-4 text-[#585858] ">Generated Ideas Will Show Up Here</span>)}
              {IsQuickWriter ? (
                <>
                  {currentStep === 1 && (
                    <span className="mt-10 text-center px-4 text-[#585858]">
                      Your keywords are being generated.
                    </span>
                  )}
                  {currentStep === 4 && (
                    <span className="mt-10 text-center px-4 text-[#585858]">
                      Your article is being crafted. We appreciate your patience.
                    </span>
                  )}
                </>



              ) : (
                (currentStep === 4 || currentStep === 5) && (<span className="mt-10 text-center px-4 text-[#585858] ">Loading your structure outlines. Just a moment!</span>)


              )}
              {(currentStep === 6 || currentStep === 7) && (<span className="mt-10 text-center px-4 text-[#585858] ">Your article is being crafted. We appreciate your patience.</span>)}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full ">
            <div className="w-64 h-64 xl:w-80 xl:h-80">
              <img src={Rocketloader} alt="" className="w-full h-full p-3 " />
            </div>
            <span className="  text-nowrap w-full text-center px-4 text-[#585858]">{text}</span>

          </div>


        )}
      </div>
     {!loading &&  <Toaster />  }

    </div>
  )
}

export default ArticleLoader