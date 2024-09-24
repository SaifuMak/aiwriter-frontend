import { GoDotFill } from "react-icons/go";
import RadialSeperators from '../../ArticleGenerationComponents/SmallComponents/RadialSeperators';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FindPercentage } from '../../../Utils/Helperfunctions'

function PlagiarismCheckerDetails({setPlagiarisedwords, PlagiarisedResult,setSentences, setUniqueWordsCount, setPlagiarismWordsCount, setPlagiarismPercentage, setUniquePercentage }) {

  const [uniqueWordsArray, setUniqueWordsArray] = useState([]);

  const { contents, totalWords } = useSelector((state) => state.Plagiarism);


  const splitTextIntoSentences = (text) => {
    return text
      .split(/\.{3}|\./) // Split by '...' or '.'
      .filter(sentence => sentence.trim() !== '') // Remove empty strings or whitespace
      .map(sentence => sentence.trim()); // Trim each sentence
  };



  useEffect(() => {
    // When contents change, process the unique words
    const allUniqueWords = [];
    console.log(PlagiarisedResult, '------------------------------')
    const resultsArray = Array.isArray(PlagiarisedResult) ? PlagiarisedResult : [PlagiarisedResult];

    resultsArray.forEach((datas)=>{
      const splitSentence = datas.textsnippet.split(/\.{3}|\./) // Split by '...' or '.' (full stop)
      .filter(sentence => sentence.trim() !== '') // Remove empty strings or whitespace-only elements
      .map(sentence => sentence.trim()); // Trim each sentence

      // console.log(splitSentence, 'sentences============')
      setSentences(prevSentences => [...prevSentences , ...splitSentence])
    })
    

    resultsArray.forEach((data) => {

      // const parts = data.textSnippet.split('...').filter(part => part.trim() !== '');
      // console.log(parts,'-------------------------------------sentences ')
      
      // Split textsnippet by spaces and ellipses, then filter unique words
      const uniqueWords = [...new Set(data.textsnippet.split(/\s+|\.{3}/).map(word => word.trim()).filter(word => word))];
      // Combine all unique words into one array
      console.log(uniqueWords, 'before the pushing')

      allUniqueWords.push(...uniqueWords);
    });
    console.log(allUniqueWords, 'after  pushing')
    console.log([...new Set(allUniqueWords)], 'applied the set ')



    // Filter out duplicates from the entire array and update the state
    // setUniqueWordsArray([...new Set(allUniqueWords)]);
    const uniqueWordsArray = [...new Set(allUniqueWords)]


    if (resultsArray.length > 0) {
      console.log('entered the setting block ')
      setPlagiarisedwords(uniqueWordsArray)

      const plagiarismWordsCount = uniqueWordsArray.length
      console.log(uniqueWordsArray, 'thiis is the unique array ')

      console.log(plagiarismWordsCount, '0000000000000000000000000000000000000000')

      setPlagiarismWordsCount(plagiarismWordsCount)

      const PlagiarismPercentage = FindPercentage(plagiarismWordsCount, totalWords)
      setPlagiarismPercentage(PlagiarismPercentage)

      const uniqueWordsCount = totalWords - plagiarismWordsCount
      setUniqueWordsCount(uniqueWordsCount)

      const UniquePercentage = FindPercentage(uniqueWordsCount, totalWords)
      setUniquePercentage(UniquePercentage)

    }
    else {
      setPlagiarismWordsCount(0)
      setUniquePercentage(100)
      setUniqueWordsCount(totalWords)



    }



  }, [PlagiarisedResult]); // Run this effect whenever contents changes










  return (

    <>
      {Array.isArray(PlagiarisedResult) ? (
        PlagiarisedResult.map((data, ind) => (

          <div key={ind} className="border border-[#FB923C] space-y-4 rounded-md p-3 mt-4   w-full">

            <div className="flex items-center ">
              <RadialSeperators percentage = {FindPercentage(data.minwordsmatched, totalWords)} />
              <p className="ml-3 "><span className=" text-[#FF0000] font-semibold">{FindPercentage(data.minwordsmatched, totalWords)}%</span> Plagiarism - {data.minwordsmatched} similar words</p>
            </div>

            <div className="flex w-11/12 ">
              <a href={data.url} className=" ml-1 text-[#0176FF] ">{data.url}</a>
            </div>

            <ul className="">
              {data.textsnippet.split('...').filter(part => part.trim() !== '').map((part, index) => (
                <li key={index} className="flex mb-2 "><GoDotFill className='mr-1 text-custom-dark-orange shrink-0' />{part.trim()}</li>

              ))}

            </ul>

          </div>))) : (

        <div  className="border border-[#FB923C] space-y-4 rounded-md p-3 mt-4   w-full">

          <div className="flex items-center ">
            <RadialSeperators />
            <p className="ml-3 "><span className=" text-[#FF0000] font-semibold">{FindPercentage(PlagiarisedResult.minwordsmatched, totalWords)}%</span> Plagiarism - {PlagiarisedResult.minwordsmatched} similar words</p>
          </div>

          <div className="flex w-11/12 ">
            <a href={PlagiarisedResult.url} className=" ml-1 text-[#0176FF] ">{PlagiarisedResult.url}</a>
          </div>

          <ul className="">
            {PlagiarisedResult.textsnippet.split('...').filter(part => part.trim() !== '').map((part, index) => (
              <li key={index} className="flex mb-2 "><GoDotFill className='mr-1 text-custom-dark-orange shrink-0' />{part.trim()}</li>

            ))}

          </ul>

        </div>

      )}
    </>
  )
}

export default PlagiarismCheckerDetails