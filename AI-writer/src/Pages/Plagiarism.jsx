import React, { useState, useRef, useEffect } from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import MobileSidebar from '../Components/Sidebar/MobileSidebar'


import { Toaster, toast } from 'sonner';
import { LuUploadCloud } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";

import Axiosinstance from '../Axios/Axiosinstance'
import { useDispatch, useSelector } from 'react-redux';
import { setResponse, setContents, resetContents, setTotalWords, setResults, setArticle, ResetArticle, setResetResults } from '../Redux/Slices/PlagiarismSlice'

import ErrorToast from '../Utils/ErrorToast'
import CustomToolTip from '../Components/ArticleGenerationComponents/SmallComponents/CustomToolTip'
import { FaRegFile } from "react-icons/fa6";
import { countWords } from '../Utils/Helperfunctions'
import CircularPercentage from '../Components/ArticleGenerationComponents/SmallComponents/CircularPercentage'
import PlagiarismCheckerDetails from '../Components/Plagiarism/SmallComponets/PlagiarismCheckerDetails'
import { useNavigate, useLocation } from 'react-router-dom';

import { IoMenuOutline } from "react-icons/io5";
import '../Components/Plagiarism/css/customScrollbar.css'

import PulseLoader from 'react-spinners/PulseLoader'


function Plagiarism() {
    const navigate = useNavigate();
    const location = useLocation();

    const dispatch = useDispatch()
    const fileInputRef = useRef()

    const { result, article } = useSelector((state) => state.Plagiarism);






    // This is the selected outlines  data 
    const [items, setItems] = useState([]);
    const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
    const [SelectedFile, setSelectedFile] = useState(null)
    const [uploadedFile, setuploadedFile] = useState(null)
    const [wordsCount, setwordsCount] = useState(0)






    const [IsSidedbarOpened, setIsSidedbarOpened] = useState(false)
    const [IsMobileArticleSidebarOpened, setIsMobileArticleSidebarOpened] = useState(false)
    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [tempTitle, setTempTitle] = useState('')
    const [IsLoading, setIsLoading] = useState(false)

    // states that are used  for seeing the result 
    const [PlagiarismPercentage, setPlagiarismPercentage] = useState(0)
    const [UniquePercentage, setUniquePercentage] = useState(0)
    const [PlagiarismWordsCount, setPlagiarismWordsCount] = useState('')
    const [UniqueWordsCount, setUniqueWordsCount] = useState(0)

    const [Content, setContent] = useState('')
    const [PlagiarisedResult, setPlagiarisedResult] = useState([])
    const [isPlagiarismChecked, setisPlagiarismChecked] = useState(false)
    const [Plagiarisedwords, setPlagiarisedwords] = useState(null)
    const [Sentences, setSentences] = useState([])
    const [results, setResult] = useState([])
    const [PlagiarisedCount, setPlagiarisedCount] = useState(0)
    const [Isediting, setIsediting] = useState(false)
    const [IsFinishedCalculating, setIsFinishedCalculating] = useState(false)

    const [uniqueSentencesArray, setUniqueSentencesArray] = useState([]);
    const [uniqueWordsArray, setUniqueWordsArray] = useState([]);

    // const [highlightedArticle, setHighlightedArticle] = useState(article);
    const [highlightedArticle, setHighlightedArticle] = useState('');



    useEffect(() => {
        if (!isPlagiarismChecked) {
            return
        }
        // Function to handle the beforeunload event
        const handleBeforeUnload = (event) => {


            event.preventDefault(); // This ensures that the prompt shows up in some browsers
            event.returnValue = ''; // For Chrome, Firefox, and other browsers

        };
        // Add the event listener when the component mounts
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isPlagiarismChecked]);






    const handleClick = () => {
        if (SelectedFile) {
            return
        }
        fileInputRef.current.click(); // Trigger the file input when the button is clicked
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileExtension === 'txt' || fileExtension === 'pdf' || fileExtension === 'docx') {
                setSelectedFile(file.name); // Save the file name to state
                setuploadedFile(file)
                setContent('')
                setwordsCount('')

            }
            else {
                ErrorToast('Please select a valid file (.txt, .docx or .pdf  only)')
            }
        }

        // You can handle the file upload logic here
    };




    const handlePlagiarismResultsContent = (e) => {
        setIsediting(true)
        const newValue = e.target.innerText; // Get content from contentEditable
        const wordCount = countWords(newValue);
        setwordsCount(wordCount);
        setContent(newValue); // Save the new content
        setSelectedFile(null);
        setuploadedFile(null);
    };




    const handlePlagiarismContent = (e) => {
        const newValue = e.target.value;
        const wordscount = countWords(newValue)
        setwordsCount(wordscount)



        setContent(newValue)
        setSelectedFile(null)
        setuploadedFile(null)

    }

    const handleClearContent = () => {
        setContent('')
    }

    const handleClearSelectedFile = () => {
        setSelectedFile(null)
        setuploadedFile(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Reset the file input field
        }
    }


    const ConfirmPlagiarismCheck = async () => {


        if (!Content && !uploadedFile) {
            return
        }
        if (wordsCount > 3000 && !uploadedFile) {
            ErrorToast('The content exceeds the 3000-word limit.')
            return

        }
        if (wordsCount < 100 && !uploadedFile) {
            ErrorToast('The content must contain at least 100 words. ')
            return

        }


        const formData = new FormData();
        if (uploadedFile) {
            formData.append('file', uploadedFile);
        }
        else {
            formData.append('content', Content);
        }

        dispatch(ResetArticle())

        setPlagiarismPercentage(0)
        setUniquePercentage(0)
        setPlagiarismWordsCount('')
        setUniqueWordsCount('')
        dispatch(setResetResults())
        setResult([])
        dispatch(setArticle(Content))
        setIsLoading(true)



        try {
            const response = await Axiosinstance.post('api/plagiarism-check', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(resetContents())
            setResult(response.data.results)
            // dispatch(setContents(response.data.results))
            setPlagiarisedResult(response.data.results)
            dispatch(setResults(response.data.results))



            dispatch(setTotalWords(response.data.TotalWords))
            setisPlagiarismChecked(true)
            setIsLoading(false)
        setIsediting(false)



        }

        catch (error) {
            console.log(error)
            ErrorToast(error.response.data.error)
            setIsLoading(false)


        }
    }

    const extractSentences = (html) => {
        let plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
        const sentences = plainText.split(/\.|\.\.\./).map(sentence => sentence.trim());
        return sentences.filter(sentence => sentence.length > 0);
    };



    useEffect(() => {
        if (Content) {
            const uniqueSentences = new Set();

            const uniqueWordsSet = new Set();

            results.forEach((data) => {
                const sentences = extractSentences(data.htmlsnippet);
                sentences.forEach((sentence) => {


                    const words = sentence
                        .toLowerCase()  // Convert to lowercase
                        .split(/\s+/);  // Split by whitespace

                    words.forEach(word => {
                        const cleanedWord = word.replace(/[.,!?']/g, '');  // Remove commas and periods
                        if (cleanedWord.trim().length > 0) {
                            uniqueWordsSet.add(cleanedWord);
                        }
                    });

                });
            });

            // const uniqueArray = Array.from(uniqueSentences);
            // console.log(uniqueArray, 'results array---------------- ')

            // Convert the Set back to an array
            const uniqueWordsArray = Array.from(uniqueWordsSet);

            // Display the unique words array
            // console.log(uniqueWordsArray, 'removed duplicate words ');
            setUniqueWordsArray(uniqueWordsArray)

            // console.log(Content, 'article provided ')
            // setUniqueSentencesArray(uniqueArray);
            // const highlighted = highlightMatches(article, uniqueArray);
            // console.log(highlighted, 'highlighted artilce ')
            // setHighlightedArticle(highlighted);
        }
    }, [results]);





    useEffect(() => {
        if (!Content || Isediting) return;
        const words = Content.split(/\s+/); // Split the article content by whitespace
        let result = '';
        let matchBuffer = []; // Buffer to keep track of consecutive matching words
        let redWordCount = 0;

        words.forEach((word, index) => {
            // console.log(word, 'this is the list of words ');

            // Remove punctuation including both straight and curly apostrophes
            const cleanedWord = word.toLowerCase().replace(/[.,!?'’]/g, '').trim();
            // console.log(cleanedWord, 'this is the cleaned word');

            if (uniqueWordsArray.includes(cleanedWord)) {
                // console.log(cleanedWord, 'this word is plaigaiarised +++++  ');

                // If the word is in uniqueWordsArray, add it to matchBuffer
                matchBuffer.push(word);
                // console.log(matchBuffer, 'this is buffer ')
            } else {
                // Handle matchBuffer if chain is broken or word is not in uniqueWordsArray
                if (matchBuffer.length >= 3) {
                    // Wrap 3 or more consecutive matching words in red
                    result += `<span style="background-color: #F9D5D5">${matchBuffer.join(' ')}</span> `;
                    redWordCount += matchBuffer.length; // Increment red word count

                } else if (matchBuffer.length > 0) {
                    // Wrap fewer than 3 matching words in green (if needed)
                    result += `<span style="background-color: #D8EFDA">${matchBuffer.join(' ')}</span> `;

                    // result += matchBuffer.join(' ') + ' ';
                }

                // Reset matchBuffer since the current word is not in the unique array
                matchBuffer = [];
                // Append the current non-matching word wrapped in green
                result += `<span style="background-color: #D8EFDA">${word}</span> `;
            }
        });

        // After loop ends, check if there are any remaining words in matchBuffer
        if (matchBuffer.length >= 3) {
            result += `<span style="background-color:  #F9D5D5">${matchBuffer.join(' ')}</span>`;
            redWordCount += matchBuffer.length; // Increment red word count

        } else if (matchBuffer.length > 0) {
            result += matchBuffer.join(' ');
        }

        // Set the highlighted article
        setHighlightedArticle(result.trim());
        setPlagiarisedCount(redWordCount)
        setIsFinishedCalculating(true)

    }, [Content, results, uniqueWordsArray]);




   











    return (
        <>
            <div className="flex justify-center  h-full bg-[#FEF2E8] font-poppins ">
                <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
                    <Sidebar setIsProfilePopup={setIsProfilePopup} />
                </div>

                {IsSidebarVisible && (<div className="fixed inset-0 z-50 bg-black bg-opacity-75">
                    <div className="absolute top-0 left-0 w-8/12 h-screen max-w-xs bg-white shadow-lg lg:h-full">
                        <Sidebar />
                        <button
                            className="absolute text-xl text-white top-2 right-4"
                            onClick={() => setIsSidebarVisible(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>)}




                <div className="w-full h-full min-h-screen px-4 py-10 md:px-8 xl:px-2 lg:w-10/12">

                    <div className="flex justify-between w-full rounded-xl ">

                        <div className="flex items-center justify-center space-x-3 lg:hidden ">
                            <IoMenuOutline onClick={() => setIsSidebarVisible(!IsSidebarVisible)} className='text-2xl md:text-3xl' />
                            <h4 className="text-base md:text-xl xl:text-2xl "> Welcome MakTal</h4>
                        </div>
                    </div>

                    {/* <div className="">
                        <Worksheet />
                    </div> */}
                    {/* <div className=" w-10/12  px-10">
                        <span className=" text-xl">{Content}</span>
                    </div> */}


                    {(isPlagiarismChecked && IsFinishedCalculating ) && (<div className="flex items-center justify-center ">
                        <div className="w-full mt-4 xl:px-10 2xl:px-0 2xl:w-10/12 ">
                            <h2 className="text-2xl font-medium tracking-wide ">Results</h2>

                            <div className="flex p-2 mt-4 space-x-4 bg-white rounded-lg md:p-8 max-lg:flex-col">

                                <div className="">
                                    <div className="flex justify-center space-x-10 lg:space-x-4 ">
                                        <div className="flex flex-col items-center justify-center px-6 py-4 border-2 2xl:px-8 border-slate-200 rounded-xl">
                                            <CircularPercentage percentage={PlagiarismPercentage} pathcolor='#FF0000' textcolor='#F20000' />
                                            <span className="text-lg mt-2 font-semibold tracking-wide text-[#F20000]">Plagiarism</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center px-6 py-4 border-2 2xl:px-8 border-slate-200 rounded-xl">
                                            <CircularPercentage percentage={PlagiarisedCount === 0 ? '100' : UniquePercentage} pathcolor='#14AE20' textcolor='#14AE20' />
                                            <span className="text-lg mt-2 font-semibold tracking-wide text-[#14AE20]">Unique</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-full py-6 mt-4 border-2 rounded-lg border-slate-200">
                                        <p className="font-semibold">Plagiarised Words: <span className="ml-1 text-red-500 ">{PlagiarisedCount}</span> </p>
                                        <p className="mt-2 font-semibold">Unique Words:<span className="ml-1 text-green-500 ">{wordsCount-PlagiarisedCount}</span> </p>
                                        <div className="w-full mt-4 text-center ">
                                            <span className=" text-[#858484] text-center   text-sm">Scan details: 4:35PM (IST), 30 Aug 2024</span>
                                        </div>
                                    </div>
                                </div>


                                <div className="h-full max-lg:mt-10 ">

                                    <div className="bg-[rgb(246,247,248)] custom-scrollbar space-y-4 h-[330px] max-h-[330px] overflow-y-auto  flex flex-col justify-start w-full rounded-xl lg:px-3 2xl:px-8">
                                        {PlagiarisedCount === 0 ? (
                                            <div className="flex items-center justify-center w-full h-full ">
                                                <p className="font-semibold tracking-wide text-center text-slate-500 ">Congratulations! Your content is authentic and does not contain any plagiarized material. Keep it up!</p>
                                            </div>
                                        ) : (
                                            <PlagiarismCheckerDetails wordsCount={wordsCount} PlagiarisedResult={PlagiarisedResult} setPlagiarisedwords={setPlagiarisedwords} setSentences={setSentences} setUniqueWordsCount={setUniqueWordsCount} setPlagiarismWordsCount={setPlagiarismWordsCount} setPlagiarismPercentage={setPlagiarismPercentage} PlagiarisedCount={PlagiarisedCount} setUniquePercentage={setUniquePercentage} />
                                        )}

                                    </div>


                                    <div className="flex justify-between mt-4 lg:px-10">
                                        <button className="2xl:px-4 px-2 max-sm:text-xs text-nowrap text-white rounded-lg py-1.5 2xl:py-2 bg-[#14AE20]">Rewrite my content</button>
                                        <button className="2xl:px-4 px-2  max-sm:text-xs  text-nowrap text-white rounded-lg py-1.5 2xl:py-2 bg-[#213343]">Download Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}


                    <div className="flex items-center justify-center">
                        <div className="w-full mt-10 2xl:px-0 xl:px-10 2xl:w-10/12">
                            <h2 className="text-2xl font-medium tracking-wide ">Plagiarism Checker</h2>
                            {isPlagiarismChecked && <h2 className="text-2xl font-medium tracking-wide "> Checker</h2>}
                            {/* <button onClick={() => dispatch(resetContents())} className="px-6 py-1 text-white bg-indigo-500 rounded-lg ">Reset</button> */}
                            <div className="p-10 mt-6 space-y-2 bg-white rounded-lg shadow-xl ">
                                <h5 className="font-semibold ">Paste (Ctrl + V) your article below then click for Plagiarism!</h5>
                                {Plagiarisedwords ? (
                                    <div className='w-full  text-lg min-h-[400px] outline-none p-8 rounded-lg  bg-slate-50 border border-slate-200'>
                                        <div
                                            className="prose   focus:outline-none"
                                            contentEditable={true}
                                            suppressContentEditableWarning={true}
                                            dangerouslySetInnerHTML={{ __html: highlightedArticle }}
                                            onInput={handlePlagiarismResultsContent}
                                        />

                                    </div>
                                ) : (<textarea onChange={handlePlagiarismContent} value={Content} className='w-full resize-none text-lg min-h-[400px] outline-none p-8 rounded-lg  bg-slate-50 border border-slate-200' name="" id="" placeholder='Enter text here to check plagiarism...'>
                                </textarea>)}

                                <div className="flex items-center justify-between w-full h-10 ">
                                    <p className={`${wordsCount > 3000 ? 'text-red-500' : ''}`}>Words limit/Search: {wordsCount}/3000</p>
                                    {Content && (<CustomToolTip title='Clear content'>
                                        <div onClick={handleClearContent} className="flex  items-center cursor-pointer justify-center rounded-md   w-8 h-9 bg-[#FF0000] ">
                                            <RiDeleteBin7Line className='text-xl text-white' />
                                        </div>
                                    </CustomToolTip>)}
                                </div>

                                <div className="flex flex-col py-6 ">


                                    <p className="flex items-center text-sm ">
                                        {SelectedFile ? (<>
                                            selected file : {SelectedFile}
                                            <RiDeleteBin7Line onClick={handleClearSelectedFile} className='p-1 ml-2 text-2xl text-red-500 rounded-full cursor-pointer shrink-0 hover:bg-slate-200 ' />
                                        </>)
                                            :
                                            ('Select a file: (.docx/.txt/.pdf)')}</p>
                                    <button onClick={handleClick} className="bg-[#213343] font-semibold tracking-wide  max-sm:text-sm mt-1 w-[130px]  lg:w-[150px] xl:w-[160px] 2xl:w-[180px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white"><span className="mr-2 text-xl shrink-0">{SelectedFile ? <FaRegFile /> : <LuUploadCloud />} </span>{SelectedFile ? 'Uploaded' : 'Select file'} </button>

                                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} className="" />
                                </div>

                                {IsLoading ? (
                                    <button className="font-semibold tracking-wide  bg-custom-dark-orange w-[160px] lg:w-[170px] xl:w-[200px] 2xl:w-[220px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white">
                                        <span className=" text-lg">Checking </span> <PulseLoader color="#ffffff" size={6} margin={8} />
                                    </button>
                                ) : (
                                    <button onClick={ConfirmPlagiarismCheck} className=" max-sm:text-sm font-semibold tracking-wide  bg-custom-dark-orange w-[160px] lg:w-[170px] xl:w-[200px] 2xl:w-[220px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white"> Check Plagiarism</button>
                                )}

                            </div>

                           
                        </div>
                    </div>



                </div>
                <Toaster position="bottom-right" />

            </div>
        </>
    )
}

export default Plagiarism