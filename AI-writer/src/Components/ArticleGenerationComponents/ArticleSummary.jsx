import React, { useState, useEffect } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { GoPlus, GoDash } from "react-icons/go";
import StructureItemComponent from './SmallComponents/StructureItemComponent';

function ArticleSummary() {
    const [headlines, setHeadlines] = useState([]);

    const Structure = [
        "Introduction to the basics of climate change and its global impact.",
        "Historical perspective on climate change and key environmental events.",
        "Explanation of greenhouse gases and their role in global warming.",
        "Impact of climate change on ecosystems and biodiversity.",
        "Human activities contributing to climate change, such as deforestation and industrialization.",
        "The effects of climate change on weather patterns and natural disasters.",
        "Global efforts and agreements to combat climate change, including the Paris Agreement.",
        "The role of renewable energy in mitigating climate change.",
        "Discussion on climate change adaptation strategies and solutions.",
        "The impact of climate change on economies and public health.",
        "The role of individual actions in addressing climate change.",
        "Conclusion on the urgency of global collaboration to address climate change.",
        "The impact of climate change on agriculture and food security.",
        "Innovations in technology to combat climate change.",
        "The role of education and awareness in climate change action.",
        "How governments and organizations are funding climate change initiatives.",
    ];

    useEffect(() => {
        setHeadlines(Structure);
    }, []);


    return (
        <div className="w-full px-4 py-10 lg:tracking-wide max-lg:text-sm 2xl:w-10/12 xl:w-11/12 xl:px-16 space-y-7">
            <div className="flex justify-between">
                <h2 className="text-lg lg:text-2xl xl:text-2xl">Article Summary</h2>
                <button className="px-2 py-2 text-sm text-white rounded-md lg:px-4 lg:text-base bg-custom-dark-orange">Generate Outlines</button>
            </div>
            <div className="">
                <h6 className="">Title:</h6>
                <div className="w-full px-2 lg:px-6 py-2.5 max-md:text-sm mt-1 border rounded-md border-opacity-80 border-stone-300">
                    Unlocking Success: The Importance of SEO for Sm
                </div>
            </div>
            <div className="">
                <h6 className="">Outlines:</h6>
                <Reorder.Group axis="y" values={headlines} onReorder={setHeadlines}>
                    {headlines.map((item, index) => (

                        <StructureItemComponent key={item} item={item} />

                    ))}
                </Reorder.Group>
            </div>
        </div>
    );
}

export default ArticleSummary;
