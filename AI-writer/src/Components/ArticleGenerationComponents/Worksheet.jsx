import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {FindPercentage} from '../../Utils/Helperfunctions'

function Worksheet() {
  const [uniqueWordsArray, setUniqueWordsArray] = useState([]);

  const { contents,totalWords } = useSelector((state) => state.Plagiarism);

  useEffect(() => {
    // When contents change, process the unique words
    const allUniqueWords = [];

    contents.forEach((data) => {
      // Split textsnippet by spaces and ellipses, then filter unique words
      const uniqueWords = [...new Set(data.textsnippet.split(/\s+|\.{3}/).map(word => word.trim()).filter(word => word))];
      
      // Combine all unique words into one array
      allUniqueWords.push(...uniqueWords);
    });

    // Filter out duplicates from the entire array and update the state
    setUniqueWordsArray([...new Set(allUniqueWords)]);

  }, [contents]); // Run this effect whenever contents changes

  return (
    <>
      <div className='p-4 text-sm bg-white'>
      <p>{uniqueWordsArray.join(' ')}</p>
      <span className="font-semibold ">{uniqueWordsArray.length}</span>
        {contents.map((data) => (
          <ul className="flex flex-col items-center justify-center p-2 my-6 space-y-2 bg-stone-100 ">
            <li className="text-indigo-500 ">{data.url}</li>
            <li className="font-semibold ">{data.title}</li>

            <ul className="">
              {data.textsnippet.split('...').map((part, index) => (
                <li className="text-center ">{part.trim()}</li>
              ))}

            </ul>
             <li className="">{FindPercentage(data.minwordsmatched,totalWords)}</li>
            <li className="">{data.minwordsmatched}/{totalWords}</li>

          </ul>
        ))}
      </div>
    </>
  )
}

export default Worksheet