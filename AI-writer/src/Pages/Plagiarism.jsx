import React, { useState, useRef } from 'react'
import ArticleSidebar from '../Components/ArticleSidebar/ArticleSidebar'
import ArticleLoader from '../Components/ArticleGenerationComponents/ArticleLoader'
import KeywordsForArticle from '../Components/ArticleGenerationComponents/KeywordsForArticle'
import GenerateOrRegenerateIdeas from '../Components/ArticleGenerationComponents/GenerateOrRegenerateIdeas'
import GenerateOutline from '../Components/ArticleGenerationComponents/GenerateOutline'
import Worksheet from '../Components/ArticleGenerationComponents/Worksheet'
import Navbar from '../Components/Navbar/Navbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import MobileSidebar from '../Components/Sidebar/MobileSidebar'
import MobileArticleSidebar from '../Components/ArticleSidebar/MobileArticleSidebar'
import StructureOfArticle from '../Components/ArticleGenerationComponents/StructureOfArticle'
import ArticleSummary from '../Components/ArticleGenerationComponents/ArticleSummary'

import FinalArticle from '../Components/FinalArticle/FinalArticle'
import { Toaster, toast } from 'sonner';
import { SlCloudUpload } from "react-icons/sl";
import { LuUploadCloud } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";

import Axiosinstance from '../Axios/Axiosinstance'
import { useDispatch, useSelector } from 'react-redux';
import { setResponse, setContents, resetContents, setTotalWords } from '../Redux/Slices/PlagiarismSlice'

import { IoIosArrowDropright } from "react-icons/io";
import ErrorToast from '../Utils/ErrorToast'
import CustomToolTip from '../Components/ArticleGenerationComponents/SmallComponents/CustomToolTip'
import { FaRegFile } from "react-icons/fa6";
import { countWords } from '../Utils/Helperfunctions'
import CircularPercentage from '../Components/ArticleGenerationComponents/SmallComponents/CircularPercentage'
import { GoDotFill } from "react-icons/go";
import PlagiarismCheckerDetails from '../Components/Plagiarism/SmallComponets/PlagiarismCheckerDetails'

import { motion, useInstantLayoutTransition } from 'framer-motion';
import { IoMenuOutline } from "react-icons/io5";
import '../Components/Plagiarism/css/customScrollbar.css'
import { useNavigate } from 'react-router-dom'


function Plagiarism() {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const fileInputRef = useRef()




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

        console.log(file);
        // You can handle the file upload logic here
    };




    const splitTextIntoSentences = (text) => {
        // Split the text based on common sentence-ending punctuation
        return text.split(/(?<=[.!?])\s+/);
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
            console.log(wordsCount, '-------------------')
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


        setPlagiarismPercentage(0)
        setUniquePercentage(0)
        setPlagiarismWordsCount('')
        setUniqueWordsCount('')


        try {
            const response = await Axiosinstance.post('api/plagiarism-check', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            dispatch(resetContents())
            console.log(response.data.results)
            // dispatch(setContents(response.data.results))
            setPlagiarisedResult(response.data.results)
            dispatch(setTotalWords(response.data.TotalWords))
            setisPlagiarismChecked(true)

        }

        catch (error) {
            console.log(error)
            ErrorToast(error.response.data.error)

        }
    }



    const highlightContent = (text) => {
        // Split the content into words
        // const words = text.split(/\s+/);
        const normalize = str => str.toLowerCase().replace(/[.,]/g, '').trim();
    const words = text.split(/\s+/).map(normalize);
    
    // Normalize the plagiarized words
    const normalizedPlagiarisedWords = Plagiarisedwords.map(normalize);
        console.log(words, 'content words ----------------')
         console.log(Plagiarisedwords, 'plagiarised words first set ')


        return words.map((word, index) => {

            // Check if the word is in the plagiarized words array
            
            const isPlagiarized = normalizedPlagiarisedWords.includes(word);
            console.log(word,isPlagiarized )
            return (
                <span
                    key={index}
                    style={{
                        backgroundColor: isPlagiarized ? '#F9D5D5' : '#D8EFDA',
                        color: 'black',
                        padding: '2px',

                        marginBottom: '6px',
                    }}
                >
                    {word}{' '}
                </span>
            );
        });
    }


    console.log(Sentences, 'senetece arrayyyy *********************')














    return (
        <>
            <div className="flex justify-center  h-auto bg-[#FEF2E8] font-poppins ">
                <div className="2xl:w-2/12 lg:w-3/12 max-lg:hidden ">
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




                <div className="w-full px-4 py-10 md:px-8 xl:px-2 lg:w-10/12">

                    <div className="flex justify-between w-full rounded-xl ">

                        <div className="flex items-center justify-center space-x-3 lg:hidden ">
                            <IoMenuOutline onClick={() => setIsSidebarVisible(!IsSidebarVisible)} className='text-2xl md:text-3xl' />
                            <h4 className="text-base md:text-xl xl:text-2xl "> Welcome MakTal</h4>
                        </div>
                    </div>

                    {/* <div className="">
                        <Worksheet />
                    </div> */}

                    {isPlagiarismChecked && (<div className="flex items-center justify-center ">
                        <div className="w-full mt-4 2xl:w-11/12 ">
                            <h2 className="text-2xl font-medium tracking-wide ">Results</h2>
                            <div className="flex p-8 mt-4 space-x-4 bg-white rounded-lg">


                                <div className="w-3/12 ">
                                    <div className="flex justify-center ">
                                        <div className="flex flex-col items-center justify-center px-8 py-4 border-2 border-slate-200 rounded-xl">
                                            <CircularPercentage percentage={PlagiarismPercentage} pathcolor='#FF0000' textcolor='#F20000' />
                                            <span className="text-lg mt-2 font-semibold tracking-wide text-[#F20000]">Plagiarism</span>
                                        </div>
                                        <div className="flex flex-col items-center justify-center px-8 py-4 border-2 border-slate-200 rounded-xl">
                                            <CircularPercentage percentage={UniquePercentage} pathcolor='#14AE20' textcolor='#14AE20' />
                                            <span className="text-lg mt-2 font-semibold tracking-wide text-[#14AE20]">Unique</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center w-full px-16 py-6 mt-4 border-2 rounded-lg border-slate-200">
                                        <p className="font-semibold">Plagiarised Words: <span className="ml-1 text-red-500 ">{PlagiarismWordsCount}</span> </p>
                                        <p className="mt-2 font-semibold">Unique Words:<span className="ml-1 text-green-500 ">{UniqueWordsCount}</span> </p>

                                        <span className="mt-10 text-[#858484] text-center text-nowrap text-sm">Scan details: 4:35PM (IST), 30 Aug 2024</span>
                                    </div>
                                </div>


                                <div className="flex-1 h-full ">

                                    <div className="bg-[rgb(246,247,248)] custom-scrollbar space-y-4 h-[330px] max-h-[330px] overflow-y-auto  flex flex-col justify-start w-full rounded-xl px-3 2xl:px-8">
                                        {PlagiarismWordsCount === 0 ? (
                                            <div className="flex items-center justify-center w-full h-full ">
                                                <p className="font-semibold tracking-wide text-center text-slate-500 ">Congratulations! Your content is authentic and does not contain any plagiarized material. Keep it up!</p>
                                            </div>
                                        ) : (
                                            <PlagiarismCheckerDetails PlagiarisedResult={PlagiarisedResult} setPlagiarisedwords={setPlagiarisedwords} setSentences={setSentences} setUniqueWordsCount={setUniqueWordsCount} setPlagiarismWordsCount={setPlagiarismWordsCount} setPlagiarismPercentage={setPlagiarismPercentage} setUniquePercentage={setUniquePercentage} />
                                        )}

                                    </div>


                                    <div className="flex justify-between px-16 mt-3">
                                        <button className="px-4 text-white rounded-lg py-2 bg-[#14AE20]">Rewrite my content</button>
                                        <button className="px-4 text-white rounded-lg py-2 bg-[#213343]">Download Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)}


                    <div className="flex items-center justify-center">
                        <div className="w-full mt-10 2xl:w-11/12">
                            <h2 className="text-2xl font-medium tracking-wide ">Plagiarism Checker</h2>
                            {/* <button onClick={() => dispatch(resetContents())} className="px-6 py-1 text-white bg-indigo-500 rounded-lg ">Reset</button> */}
                            <div className="p-10 mt-6 space-y-2 bg-white rounded-lg shadow-xl ">
                                <h5 className="font-semibold ">Paste (Ctrl + V) your article below then click for Plagiarism!</h5>
                                {Plagiarisedwords ? (
                                    <div className='w-full  text-lg min-h-[400px] outline-none p-8 rounded-lg  bg-slate-50 border border-slate-200'>
                                        {highlightContent(Content)}
                                        {/* {Sentences.length > 0 && Sentences.map((data, index)=>(
                                            <span className="mx-6 mb-4">{index}{data}</span>
                                        )) } */}

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

                                <button onClick={ConfirmPlagiarismCheck} className=" max-sm:text-sm font-semibold tracking-wide  bg-custom-dark-orange w-[160px] lg:w-[170px] xl:w-[200px] 2xl:w-[220px] flex justify-center items-center  rounded-md h-[35px] xl:h-[40px] 2xl:h-[45px]  text-white"> Check Plagiarism</button>


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