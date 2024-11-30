import React, { useEffect, useState, useRef } from 'react'
import AnimatedBackButton from './GeneralComponets/Buttons/AnimatedBackButton'
import CircularPercentage from './ArticleGenerationComponents/SmallComponents/CircularPercentage'
import { countWords, countCharacters, FindPercentage } from '../Utils/Helperfunctions'
import PlagiarismDetails from './Plagiarism/SmallComponets/PlagiarismDetails'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { LuDownload } from "react-icons/lu";
import { IoMdDownload } from "react-icons/io";


function PlagiarismReport({ File, onClose }) {
    const OuterDivstyle = 'flex flex-col border rounded-lg border-stone-300 px-4 py-6 items-center justify-center p-1'

    const [results, setResult] = useState([])

    const [uniqueWordsArray, setUniqueWordsArray] = useState([]);
    const [Content, setContent] = useState('')

    const [TotalWords, setTotalWords] = useState(0)
    const [TotalCharectors, setTotalCharectors] = useState(0)
    const [UniqueWordsCount, setUniqueWordsCount] = useState(0)
    const [PlagiarisedCount, setPlagiarisedCount] = useState(0)

    const [UniquePercentage, setUniquePercentage] = useState(0)
    const [PlagiarismPercentage, setPlagiarismPercentage] = useState(0)

    const [highlightedArticle, setHighlightedArticle] = useState('');

    const [PlagiarisedUrl, setPlagiarisedUrl] = useState([])



    const data = [
        {
            type: 'circular',
            percentage: PlagiarismPercentage,
            pathColor: '#FF0000',
            textColor: '#F20000',
            label: 'Plagiarism Percentage',
        },
        {
            type: 'text',
            value: TotalWords,
            label: 'Total words',
        },
        {
            type: 'text',
            value: TotalCharectors,
            label: 'Total characters',
        },
        {
            type: 'circular',
            percentage: UniquePercentage,
            pathColor: '#14AE20',
            textColor: '#14AE20',
            label: 'Unique Percentage',
        },
        {
            type: 'text',
            value: PlagiarisedCount,
            label: 'Plagiarism words',
        },
        {
            type: 'text',
            value: UniqueWordsCount,
            label: 'Unique words',
        },
    ];

    const contentRef = useRef();

    const handleDownloadPdf = async () => {
        const element = contentRef.current;
        const canvas = await html2canvas(element);
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('document.pdf'); // Download the PDF
    };

    

    function convertToHtmlFormat(text) {
        let htmlContent = text
            // Replace line breaks with <br>
            .replace(/\n/g, '<br>')
        // Replace two or more spaces with &nbsp;
        // .replace(/\s\s+/g, '&nbsp;&nbsp;');
        return htmlContent;
    }


    useEffect(() => {

        if (File) {
            setContent(File.article)
            setTotalWords(countWords(File.article))
            setTotalCharectors(countCharacters(File.article))
            setResult(File.result)
            console.log(File.result)
        }

    }, [])



    useEffect(() => {

        const uniqueWordsSet = new Set();

        const resultArray = Array.isArray(results) ? results : [results];
        // const resultArray = Object.values(results);
        resultArray.forEach((data) => {
            if (data.plagiarismFound) {
                console.log(data.plagiarismFound, 'this is from  th erespons e')
                data.plagiarismFound.map((item, ind) => {
                    // console.log(item.sequence, 'this is those sentences ')

                    const words = item.sequence
                        .toLowerCase()  // Convert to lowercase
                        .split(/\s+/);  // Split by whitespace

                    words.forEach(word => {
                        const cleanedWord = word.replace(/[.,!?'’,)'′'`“”‘’`````]/g, '');  // Remove commas and periods
                        if (cleanedWord.trim().length > 0) {
                            console.log(cleanedWord, 'cleaned word ')
                            uniqueWordsSet.add(cleanedWord);
                        }
                    });
                })
            }
        });
        // Convert the Set back to an array
        const uniqueWordsArray = Array.from(uniqueWordsSet);
        setUniqueWordsArray(uniqueWordsArray)

    }, [results]);


    useEffect(() => {
        if (!Content) return;
        const htmlText = convertToHtmlFormat(Content)
        const words = htmlText.split(/\s+/); // Split the article content by whitespace

        let result = '';
        let matchBuffer = []; // Buffer to keep track of consecutive matching words
        let redWordCount = 0;

        words.forEach((word, index) => {
            // console.log(word, 'this is the list of words ');
            console.log(word, 'uncleaned *********')

            // Remove punctuation including both straight and curly apostrophes
            // const cleanedWord = word.toLowerCase().replace(/[.,!?'’]/g, '').trim();
            const cleanedWord = word.toLowerCase().replace(/[.,!?'’,)'′'`“”‘’`````]/g, '').replace(/<br\s*\/?>/g, '').trim();
            console.log(cleanedWord, 'cleaned ++')



            // console.log(cleanedWord, 'this is the cleaned word');

            if (uniqueWordsArray.includes(cleanedWord)) {
                // console.log(cleanedWord, 'this word is plaigaiarised +++++  ');

                // If the word is in uniqueWordsArray, add it to matchBuffer
                matchBuffer.push(word);
                // console.log(matchBuffer, 'this is buffer ')
            } else {
                // Handle matchBuffer if chain is broken or word is not in uniqueWordsArray
                if (matchBuffer.length >= 4) {
                    // Wrap 4 or more consecutive matching words in red
                    result += `<span style="background-color: #F9D5D5">${matchBuffer.join(' ')}</span> `;
                    redWordCount += matchBuffer.length; // Increment red word count

                } else if (matchBuffer.length > 0) {
                    // Wrap fewer than 4 matching words in green (if needed)
                    result += `<span >${matchBuffer.join(' ')}</span> `;

                    // result += matchBuffer.join(' ') + ' ';
                }

                // Reset matchBuffer since the current word is not in the unique array
                matchBuffer = [];
                // Append the current non-matching word wrapped in green
                // result += `<span >${word}</span> `;
                result += `<span >${word}</span> `;
            }
        });

        // After loop ends, check if there are any remaining words in matchBuffer
        if (matchBuffer.length >= 4) {
            // result += `<span >${matchBuffer.join(' ')}</span>`;
            result += `<span style="background-color:  #F9D5D5">${matchBuffer.join(' ')}</span>`;
            redWordCount += matchBuffer.length; // Increment red word count

        } else if (matchBuffer.length > 0) {
            result += matchBuffer.join(' ');
        }

        // Set the highlighted article
        setHighlightedArticle(result.trim());
        setPlagiarisedCount(redWordCount)
        const TotalWords = countWords(Content)

        setPlagiarismPercentage(FindPercentage(redWordCount, TotalWords))
        const UniqueWords = TotalWords - redWordCount

        setUniqueWordsCount(UniqueWords)

        setUniquePercentage(FindPercentage(UniqueWords, TotalWords))

        console.log(redWordCount, 'palgwords *****************************************************')

    }, [Content, results, uniqueWordsArray]);


    useEffect(() => {
        const urls = results.filter(data => data.score === 0).map(data => data.url);

        console.log(results, 'this is the result that is the plagiarised--------  ')

        console.log(urls, 'these are the urls that got matched--------(((((((())))))))))))----------------- ')
        // setPlagiarisedUrl(prevUrls => [...prevUrls, ...urls])


        setPlagiarisedUrl(prevUrls => {
            // Combine the previous URLs and new URLs
            const combinedUrls = [...prevUrls, ...urls];

            // Use a Set to remove duplicates
            const uniqueUrls = Array.from(new Set(combinedUrls));

            return uniqueUrls;
        });


    }, [results])


    return (
        <div className='w-full min-h-screen mt-16 lg:w-10/12'>
            <div className="flex items-center justify-between w-full px-28">
                <AnimatedBackButton HandleGoBack={onClose} />
                <div className="">
                    <button onClick={handleDownloadPdf} className="flex items-center px-4 py-2 text-xl border rounded-lg border-custom-dark-orange bg-custom-lighter-orange hover:bg-custom-light-orange">Download<LuDownload className='ml-2 text-xl font-semibold'/></button>
                </div>
            </div>
            <div className="py-8 px-28">

                <div className="mb-6">
                    <h1 className="text-2xl font-semibold tracking-wider">
                        Plagiarism  Report
                    </h1>
                </div>

                <div className="grid grid-cols-3 gap-x-10 gap-y-4">
                    {data.map((item, index) => (
                        <div key={index} className={OuterDivstyle}>
                            {item.type === 'circular' ? (
                                <CircularPercentage
                                    percentage={item.percentage}
                                    pathcolor={item.pathColor}
                                    textcolor={item.textColor}
                                />
                            ) : (
                                <h4 className="mt-2 text-3xl font-semibold text-center text-custom-dark-orange">
                                    {item.value}
                                </h4>
                            )}
                            <h4 className="mt-3 font-semibold text-center text-custom-black-text">
                                {item.label}
                            </h4>
                        </div>
                    ))}
                </div>

                <div className='w-full  text-lg  max-h-[1000px] overflow-auto outline-none mt-10 p-6 rounded-lg  border border-slate-200'>
                    <h2 className="mb-10 text-2xl font-semibold">Content</h2>
                    <div
                        className="prose focus:outline-none"
                        suppressContentEditableWarning={true}
                        dangerouslySetInnerHTML={{ __html: highlightedArticle }}
                    />
                </div>


                <div className="w-full">
                    {PlagiarisedCount === 0 && PlagiarisedUrl.length === 0 ? (
                        <div className="flex items-center justify-center w-full h-full mt-10 ">
                            <p className="font-semibold tracking-wide text-center text-slate-500 ">Congratulations! Your content is authentic and does not contain any plagiarized material. Keep it up!</p>
                        </div>
                    ) : (
                        <PlagiarismDetails PlagiarisedUrl={PlagiarisedUrl} TruncateValue={120} setPlagiarisedUrl={setPlagiarisedUrl} PlagiarisedResult={results} PlagiarisedCount={PlagiarisedCount} />
                    )}

                </div>

            </div>
        </div>
    )
}

export default PlagiarismReport