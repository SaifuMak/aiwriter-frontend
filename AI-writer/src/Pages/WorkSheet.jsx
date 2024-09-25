import React, { useState } from 'react'
import { setResults } from '../Redux/Slices/PlagiarismSlice'
import { useDispatch, useSelector } from 'react-redux';

function WorkSheet() {
    const dispatch = useDispatch()
    const { result } = useSelector((state) => state.Plagiarism);
    console.log(result)

    const stripHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };

    // const extractSentences = (html) => {
    //     // Remove all HTML tags
    //     let plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
    //     // Remove leading/trailing whitespace and ellipses
    //     plainText = plainText.replace(/^\s*\.\.\.\s*|\s*\.\.\.\s*$/g, "");
    //     // Return the cleaned text
    //     return plainText;
    // };

    const extractSentences = (html) => {
        // Remove all HTML tags
        let plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
        // Split sentences by "..." or "." and trim whitespace from each sentence
        const sentences = plainText.split(/\.|\.\.\./).map(sentence => sentence.trim());
        // Return only non-empty sentences
        return sentences.filter(sentence => sentence.length > 0);
      };

    const uniqueSentences = new Set();




    const [article, setArticle] = useState(`Physically, the iPhone 13 series is somewhat similar to the iPhone X, XS series, and XR or iPhones 11 and 12. 
It is, however, very different from earlier models, like the iPhone 8, iPhone 6S series and others.
This is especially helpful once you start adding programs from the App Store, as you can group similar applications or the ones you use the most often, together.
 The new A18 chip delivers a huge leap in performance and efficiency, enabling demanding AAA games, as well as a big boost in battery life.
The iPhone 13 family changes are primarily focused on performance, battery life and cameras, which is typically seen during the years of iPhone refreshes that do not feature significant design changes.`)

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className="w-10/12 p-6 mt-10 bg-slate-100">
                    <span className="text-2xl leading-loose ">{article}</span>

                </div>

                <div className="w-10/12 p-6 mt-10 bg-fuchsia-100">
                    {result && result.map((data, index) => {
                        // Extract all sentences from the htmlsnippet
                        const sentences = extractSentences(data.htmlsnippet);

                        // Loop through the sentences and add them if they are unique
                        return sentences.map((sentence, idx) => {
                            if (!uniqueSentences.has(sentence)) {
                                uniqueSentences.add(sentence);
                                return (
                                    <div key={`${index}-${idx}`} className="mt-2">
                                        <span className="text-lg">*{sentence}</span>
                                    </div>
                                );
                            }
                            return null; // Skip rendering if the sentence is a duplicate
                        });
                    })}
                </div>
            </div>
        </>
    )
}

export default WorkSheet