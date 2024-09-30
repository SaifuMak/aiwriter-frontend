import React, { useState } from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import CardComponent from '../Components/CardComponent'
import ProfileDetails from '../Components/Profile/ProfileDetails'
import { IoMenuOutline } from "react-icons/io5";
import SelectionCard from '../Components/SelectionCard';
import { Link } from 'react-router-dom';


function WriterStep() {
    const [IsSidebarVisible, setIsSidebarVisible] = useState(false)
    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [SelectedArticleWriter, setSelectedArticleWriter] = useState('/article-generation')



    return (
        <div className="flex justify-center h-full font-poppins ">
            <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
                <Sidebar setIsProfilePopup={setIsProfilePopup} />
            </div>

            {IsSidebarVisible && (<div className="fixed inset-0 z-50 bg-black bg-opacity-75">
                <div className="absolute top-0 left-0 w-8/12 h-full max-w-xs bg-white shadow-lg">
                    <Sidebar />
                    <button
                        className="absolute text-xl text-white top-2 right-4"
                        onClick={() => setIsSidebarVisible(false)}
                    >
                        ✕
                    </button>
                </div>
            </div>)}

            {IsProfilePopup && (
                <ProfileDetails setIsProfilePopup={setIsProfilePopup} />
            )}



            <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">


                <div className="items-center justify-center w-full mt-10">
                    <h1 className="text-3xl text-center ">How do you want your content written?</h1>
                </div>


                <div className="grid grid-cols-1 gap-16 mt-24 md:grid-cols-2 2xl:gap-x-32">

                    <SelectionCard
                        title='Guided Article Writer '
                        description={[
                            'Plan and generated content step by step.',
                            'Recommended if you want full control overt the content.',
                        ]}
                        buttonText='START WRITING'
                        LinkTo='/article-generation'
                        footer='Uses about 1000-1500 words per article'
                        setSelectedArticleWriter={setSelectedArticleWriter}
                        isSelected = {SelectedArticleWriter === '/article-generation'}

                    // FunctionToCall={ResetArticleGenerator}
                    />

                    <SelectionCard
                        title='Quick Article Writer  '
                        description={[
                            'Choose a topic and headline and our tool will do the remaining. Recommended if you need only limited control over the content.',
                        ]}
                        buttonText='START WRITING'
                        LinkTo='/quick-article-generation'
                        footer='Set word limit as per your needs'
                        setSelectedArticleWriter={setSelectedArticleWriter}
                        isSelected = {SelectedArticleWriter === '/quick-article-generation'}
                    // FunctionToCall={ResetArticleGenerator}
                    />
                </div>


                <div className="flex items-center justify-center w-full mt-20 ">
                    <Link to={SelectedArticleWriter || ''} className="" >
                        <button className="xl:px-8 xl:py-2.5 px-4 py-1.5 xl:text-lg xl:font-semibold text-white rounded-md bg-custom-dark-orange">START WRITING</button>
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default WriterStep