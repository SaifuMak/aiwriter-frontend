import { GoDotFill } from "react-icons/go";
import RadialSeperators from '../../ArticleGenerationComponents/SmallComponents/RadialSeperators';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FindPercentage } from '../../../Utils/Helperfunctions'
import { truncateUrl } from "../../../Utils/Helperfunctions";


function PlagiarismDetails({ setPlagiarisedUrl, TruncateValue=40, PlagiarisedUrl, PlagiarisedCount, wordsCount, PlagiarisedResult, setUniqueWordsCount, setPlagiarismWordsCount, setPlagiarismPercentage, setUniquePercentage }) {




    // useEffect(() => {

    //     const resultsArray = Array.isArray(PlagiarisedResult) ? PlagiarisedResult : [PlagiarisedResult];
    //     // console.log(resultsArray, 'this is the resultsArray result ************** ')


    //     // const urls = PlagiarisedResult.filter(data => data.score === 0).map(data => data.url);

    //     // console.log(PlagiarisedResult, 'this is the result that is the plagiarised--------  ')

    //     // console.log(urls, 'these are the urls that got matched------------------------- ')
    //     // // setPlagiarisedUrl(prevUrls => [...prevUrls, ...urls])
    //     // setPlagiarisedUrl(prevUrls => {
    //     //     // Combine the previous URLs and new URLs
    //     //     const combinedUrls = [...prevUrls, ...urls];

    //     //     // Use a Set to remove duplicates
    //     //     const uniqueUrls = Array.from(new Set(combinedUrls));

    //     //     return uniqueUrls;
    //     // });



    //     if (resultsArray.length > 0) {

    //         // setPlagiarismWordsCount(plagiarismWordsCount)

    //         const PlagiarismPercentage = FindPercentage(PlagiarisedCount, wordsCount)
    //         setPlagiarismPercentage(PlagiarismPercentage)

    //         console.log(PlagiarisedCount, 'plagwords count from the details ------------------888888888')

    //         const uniqueWordsCount = wordsCount - PlagiarisedCount
    //         // setUniqueWordsCount(uniqueWordsCount)
    //         console.log(uniqueWordsCount, 'uniqueWordsCount count from the details ------------------888888888')


    //         const UniquePercentage = FindPercentage(uniqueWordsCount, wordsCount)
    //         setUniquePercentage(UniquePercentage)

    //     }
    //     else {
    //         setPlagiarismWordsCount(0)
    //         setUniquePercentage(100)
    //         setUniqueWordsCount(wordsCount)

    //     }
    // }, [PlagiarisedResult])


    return (
        <>
            {Array.isArray(PlagiarisedResult) ? (
                <>
                    {PlagiarisedResult.filter((data) => data.score > 0).map((data, ind) => (

                        <div key={ind} className="border border-[#FB923C] space-y-4 rounded-md p-3 mt-4   w-full">

                            <div className="flex items-center ">
                                <RadialSeperators percentage={FindPercentage(data.plagiarismWords, data.totalNumberOfWords)} />
                                <p className="ml-3 "><span className=" text-[#FF0000] font-semibold">{FindPercentage(data.plagiarismWords, data.totalNumberOfWords)}%</span> Plagiarism - {data.plagiarismWords} similar words</p>
                            </div>

                            <div className="flex w-11/12 ">
                                <a href={data.url} target="_blank" rel="noopener noreferrer" className="ml-1 text-[#0176FF]">
                                    {truncateUrl(data.url, TruncateValue)}
                                </a>
                            </div>



                            {data.plagiarismFound && data.plagiarismFound.map((item, index) => (
                                <ul className="">
                                    <li key={index} className="flex mb-2 "><GoDotFill className='mt-1 mr-1 text-custom-dark-orange shrink-0' />{item.sequence}</li>
                                </ul>
                            ))}

                        </div>
                    ))}


                    {PlagiarisedUrl.length > 0 && (< div className="border border-[#FB923C] space-y-4 rounded-md p-3 mt-4   ">
                        
                        {PlagiarisedCount === 0 ? (
                            <h2 className="font-semibold">We couldn't find an exact match for plagiarism in your uploaded article, but there are still similar contents found in the URLs listed below.</h2>
                        ) : (
                            <h2 className="font-semibold ">We've discovered similar content in the  URL(s) below. We encourage you to take a look at them! </h2>
                        )}

                        {PlagiarisedUrl.length > 0 && PlagiarisedUrl.map((url, index) => (
                            <ul key={index} className="">
                                <a href={url} target="_blank" rel="noopener noreferrer" className="ml-1  text-[#0176FF]  break-words">
                                    {truncateUrl(url, TruncateValue)}
                                </a>
                            </ul>

                        ))}

                    </div >)}
                </>


            ) : (

                <div className="border border-[#FB923C] space-y-4 rounded-md p-3 mt-4   w-full">

                    <div className="flex items-center ">
                        <RadialSeperators />
                        <p className="ml-3 "><span className=" text-[#FF0000] font-semibold">{FindPercentage(PlagiarisedResult.plagiarismWords, PlagiarisedResult.totalNumberOfWords)}%</span> Plagiarism - {PlagiarisedResult.plagiarismWords} similar words</p>
                    </div>

                    <div className="flex w-11/12 ">
                        <a href={PlagiarisedResult.url} className=" ml-1 text-[#0176FF] ">{PlagiarisedResult.url}</a>
                    </div>


                    {PlagiarisedResult.plagiarismFound && PlagiarisedResult.plagiarismFound.map((item, index) => (
                        <ul className="">
                            <li key={index} className="flex mb-2 "><GoDotFill className='mr-1 text-custom-dark-orange shrink-0' />{item.sequence}</li>
                        </ul>
                    ))}

                </div>

            )
            }
        </>
    )
}

export default PlagiarismDetails