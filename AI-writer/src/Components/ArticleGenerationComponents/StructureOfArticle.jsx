import React, { useState } from 'react'
import { VscCheck } from "react-icons/vsc";

function StructureOfArticle() {
    const [SelctedStructure, setSelctedStructure] = useState('')


    const HandleStructure = (structure) => {
        setSelctedStructure(structure)
    }


    const articleStructures = {
        "Structure 1": {
            "1": "Overview of AI and its growing influence in various industries.",
            "2": "A brief history of AI development from its inception to the present.",
            "3": "Explanation of narrow AI, general AI, and superintelligent AI.",
            "4": "Overview of machine learning, neural networks, and natural language processing.",
            "5": "Examples of AI applications in everyday life, such as virtual assistants and recommendation systems.",
            "6": "Discussion of how businesses are leveraging AI for decision-making, automation, and customer service.",
            "7": "Exploration of the ethical implications and challenges associated with AI, such as bias and privacy.",
            "8": "Analysis of how AI is transforming the job market and the potential for job displacement.",
            "9": "Predictions about the future advancements and possibilities in AI technology.",
            "10": "The impact of AI on society, including changes in social behavior and communication.",
            "11": "Overview of existing and proposed regulations and policies related to AI.",
            "12": "Summary of key points and the overall significance of AI.",
            "13": "Case studies of successful AI implementations in different sectors.",
            "14": "Potential risks and challenges in AI adoption.",
            "15": "The role of AI in scientific research and innovation.",
            "16": "The future of AI: Emerging trends and technologies.",

        },
        "Structure 2": {
            "1": "Introduction to digital marketing and its importance in the modern business landscape.",
            "2": "A look at the early days of digital marketing and the first online ads.",
            "3": "Explanation of SEO and its role in digital marketing.",
            "4": "Overview of social media marketing and its impact on brand awareness.",
            "5": "The rise of content marketing and its effectiveness in engaging audiences.",
            "6": "How email marketing remains a powerful tool for businesses.",
            "7": "Discussion of pay-per-click (PPC) advertising and its benefits.",
            "8": "The importance of data analytics in measuring digital marketing success.",
            "9": "Exploration of influencer marketing and its growing role in brand promotion.",
            "10": "The shift towards mobile marketing and its significance.",
            "11": "Challenges faced by digital marketers in the evolving landscape.",
            "12": "Conclusion on the future of digital marketing and emerging trends.",
            "13": "The impact of digital marketing on consumer behavior.",
            "14": "The role of automation in digital marketing strategies.",
            "15": "Best practices for digital marketing in different industries.",
            "16": "How to measure and optimize digital marketing ROI.",

        },
        "Structure 3": {
            "1": "Introduction to the basics of climate change and its global impact.",
            "2": "Historical perspective on climate change and key environmental events.",
            "3": "Explanation of greenhouse gases and their role in global warming.",
            "4": "Impact of climate change on ecosystems and biodiversity.",
            "5": "Human activities contributing to climate change, such as deforestation and industrialization.",
            "6": "The effects of climate change on weather patterns and natural disasters.",
            "7": "Global efforts and agreements to combat climate change, including the Paris Agreement.",
            "8": "The role of renewable energy in mitigating climate change.",
            "9": "Discussion on climate change adaptation strategies and solutions.",
            "10": "The impact of climate change on economies and public health.",
            "11": "The role of individual actions in addressing climate change.",
            "12": "Conclusion on the urgency of global collaboration to address climate change.",
            "13": "The impact of climate change on agriculture and food security.",
            "14": "Innovations in technology to combat climate change.",
            "15": "The role of education and awareness in climate change action.",
            "16": "How governments and organizations are funding climate change initiatives.",

        }
    };


    return (
        <div className="w-full px-4 py-10 xl:px-16 space-y-7 ">
            <h2 className="text-lg lg:text-2xl xl:text-2xl">Choose a Structure for your Article</h2>
            <div>
                {Object.entries(articleStructures).map(([structureName, sections]) => (
                    <div onClick={() => HandleStructure(structureName)} key={structureName} className={`flex ${SelctedStructure === structureName ? 'bg-custom-lighter-orange' : 'bg-white'} px-3 py-6 mt-10  rounded-md shadow-md cursor-pointer`}>
                        <div className="relative xl:p-1.5 mt-3 xl:mt-1 mr-2 ">
                            {SelctedStructure === structureName && (<VscCheck className='absolute duration-500 -top-0.5 -right-0.5  xl:text-xl xl:top-1 xl:right-1 ' />)}
                            <span className={`flex items-center border duration-500 border-custom-dark-orange justify-center w-4 h-4 xl:w-5 xl:h-5 rounded-full ${SelctedStructure === structureName ? 'bg-custom-dark-orange' : 'bg-transparent'} `}></span>
                        </div>
                        <ul className='mt-2 text-sm lg:text-base '>

                            {Object.entries(sections).map(([sectionNumber, content]) => (
                                <li key={sectionNumber} className='mb-2'>
                                    <span>Section {sectionNumber}:</span> <span className="">{content}</span>

                                </li>
                            ))}
                            
                            <div className="mt-6 ">
                            <span className=" text-[#7D7D7D] text-sm font-semibold ">345 words / 653 charectors</span>
                            </div>
                        </ul>
                    </div>
                ))}
            </div>


           
        </div>
    )
}

export default StructureOfArticle