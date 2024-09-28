import React, { useState, useEffect } from 'react';
import { setResults } from '../Redux/Slices/PlagiarismSlice';
import { useDispatch, useSelector } from 'react-redux';

function WorkSheet() {
    const dispatch = useDispatch();
    const { result } = useSelector((state) => state.Plagiarism);

    const [article, setArticle] = useState(`Physically, the iPhone 13 series is somewhat similar to the iPhone X, XS series, and XR or iPhones 11 and 12. 
        It is, however, very different from earlier models, like the iPhone 8, iPhone 6S series and others.
        This is especially helpful once you start adding programs from the App Store, as you can group similar applications or the ones you use the most often, together.
         The new A18 chip delivers a huge leap in performance and efficiency, enabling demanding AAA games, as well as a big boost in battery life.
        The iPhone 13 family changes are primarily focused on performance, battery life and cameras, which is typically seen during the years of iPhone refreshes that do not feature significant design changes.`);

    const articleText = `
            Forest conservation is a broad and complex concept. Differences in the ecological state of woodlot make it impossible to identify one-size-fits-all measures and practices. Usually intact forests need to be protected from logging and no other management interventions are needed. The situation is different for a young forest that is the result of a reforestation project. Climate change is altering the conditions to which tree species are adapted, which is making the discourse on forest conservation even more complex. In addition, forest conservation is about Indigenous peoples’ rights. Indigenous peoples have been living in forests for tens of thousands of years and there’s evidence that when Indigenous peoples’ rights to traditional lands and self-determination are respected, forests stay standing. Ecosystem services can have different definitions and categories. In this article, we’ll use the one by Holzwarth et al. from 2020 that focuses on the ecosystem services of forests.
          `;

    const extractSentences = (html) => {
        let plainText = html.replace(/<\/?[^>]+(>|$)/g, "");
        const sentences = plainText.split(/\.|\.\.\./).map(sentence => sentence.trim());
        return sentences.filter(sentence => sentence.length > 0);
    };

    const [uniqueSentencesArray, setUniqueSentencesArray] = useState([]);
    const [highlightedArticle, setHighlightedArticle] = useState(articleText);

    const highlightMatches = (text, matches) => {
        matches.forEach((match) => {
            const regex = new RegExp(`(${match})`, 'gi');
            text = text.replace(
                regex,
                '<span class="bg-red-500">$1</span>'
            );
        });
        return text;
    };

    useEffect(() => {
        if (result) {
            const uniqueSentences = new Set();
            result.forEach((data) => {
                const sentences = extractSentences(data.htmlsnippet);
                sentences.forEach((sentence) => {
                    uniqueSentences.add(sentence);
                });
            });

            const uniqueArray = Array.from(uniqueSentences);
            setUniqueSentencesArray(uniqueArray);
            const highlighted = highlightMatches(articleText, uniqueArray);
            setHighlightedArticle(highlighted);
        }
    }, [result]);

    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className="w-10/12 p-6 mt-10 bg-slate-100">
                    <span className="text-2xl leading-loose">{article}</span>
                </div>

                <div className="w-10/12 p-6 mt-10 bg-fuchsia-100">
                    {uniqueSentencesArray.map((sentence, idx) => (
                        <div key={idx} className="mt-2">
                            <span className="text-lg">*{sentence}</span>
                        </div>
                    ))}
                </div>

                <div className="p-4">
                    <div
                        className="prose"
                        dangerouslySetInnerHTML={{ __html: highlightedArticle }}
                    />
                </div>
            </div>
        </>
    );
}

export default WorkSheet;
