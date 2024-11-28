import React, { useState, useEffect } from 'react'
import AdminNavbar from '../Components/Admin/AdminNavbar'
import Sidebar from '../Components/Sidebar/Sidebar'
import Axiosinstance from '../Axios/Axiosinstance'
import { FaRegBookmark } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import OpacityLoader from '../Components/GeneralComponets/Loaders/OpacityLoader';
import FileViewer from '../Components/GeneralComponets/FileViewer/FileViewer';
import { getPageNumber, getTotalPagesCount } from '../Utils/Helperfunctions';
import Pagination from '../Components/GeneralComponets/Pagination';
import { Toaster, toast } from 'sonner';
import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';
import CustomToolTip from '../Components/ArticleGenerationComponents/SmallComponents/CustomToolTip';
import DropdownComponent from '../Components/DropdownComponent';
import _ from 'lodash';  // Import Lodash


function History() {

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [SavedFiles, setSavedFiles] = useState([])
    const [IsLoading, setIsLoading] = useState(true)
    const [VisibleFile, setVisibleFile] = useState('')

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [TotalPages, setTotalPages] = useState(null)

    const [SortByDropdown, setSortByDropdown] = useState(false)
    const [SelectedSortByOption, setSelectedSortByOption] = useState('')


    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [IsTyping, setIsTyping] = useState(false)

    const TableColumns = ['', 'Title', 'Type', 'Generated on', '']
    const Sortby = ['Show All', 'Bookmarked', 'Oldest First'];

    const cellStyle = '2xl:py-8   py-2 px-4'


    const fetchSavedFiles = async (page = 1, articleId = null) => {
        try {
            // let url = articleId
            //     ? `api/generated-files-history?id=${articleId}`  // Fetch a specific article by ID
            //     : `api/generated-files-history?page=${page}`;  // Fetch the paginated list of articles

            const response = await Axiosinstance.get(`api/generated-files-history?page=${page}&sortby=${SelectedSortByOption}`);

            if (articleId) {
                // Handle the fetched article data for a specific ID
                setSavedFiles([response.data]);  // If it's a single article, you might want to wrap it in an array
                setIsLoading(false);
                return;  // Exit here since we're only fetching one article
            }

            // const response = await Axiosinstance.get(`api/generated-files-history?page=${page}`)
            setCurrentPage(page)
            const nextpage = getPageNumber(response.data.next)
            const previous = getPageNumber(response.data.previous)
            setNextPage(nextpage)
            setPrevPage(previous)

            const totalPages = getTotalPagesCount(response.data.count, 5)
            setTotalPages(totalPages)
            setSavedFiles(response.data.results)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }


    const fetchFile = async () => {
        toast.dismiss()
        if(!query){
            return 
        }

        try {
        
            const response = await Axiosinstance.get(`api/get-file?title=${query}`);

                // Handle the fetched article data for a specific ID
                setSavedFiles([response.data]);
                setIsLoading(false);
            setIsTyping(false)


    
        }
        catch (error) {
            console.log(error)
            ErrorToast(error.response.data.error)
            setIsTyping(false)

            setIsLoading(false)
        }
    }



    const HandleFavorite = async (Id) => {
        toast.dismiss()
        try {
            const response = await Axiosinstance.post('api/toggle-favourite', { 'id': Id })
            SuccessToast(response.data.message)
            await fetchSavedFiles(currentPage)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }



    const fetchSuggestions = _.debounce(async (input) => {
        if (input.length > 0) {
            try {
                const response = await Axiosinstance(`api/search-titles?q=${input}`);
                setSuggestions(response.data)

            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    }, 300);


    const handleInputChange = (e) => {
        setIsTyping(true)
        const input = e.target.value;
        setQuery(input);
        fetchSuggestions(input);
    };

    const ConfirmSuggestionClick = () => {
       fetchFile(query);  // Fetch the article with the selected ID
    };

    const handleSelectSuggestion =(title) =>{
        setIsTyping(false)

        setQuery(title)
    }

    const HandleClearQuery =()=>{
        setIsTyping(false)
        setQuery('')
        fetchSavedFiles(currentPage)
    }


    const handleShowSavedArticle = (file) => {
        const article = file.replace("```html", "").replace("```", "").trim();
        setVisibleFile(article)
        // setVisibleFile(file)

    }

    const HandleCloseFileViwer = () => {
        setVisibleFile(null)
    }

    const handleToggleDropdown = () => {
        setSortByDropdown(!SortByDropdown)
    }

    const handleSortByOption = (option) => {
        setSelectedSortByOption(option)
        setSortByDropdown(false)
    }


    useEffect(() => {

        fetchSavedFiles()
    }, [SortByDropdown])


    return (
        <>
            {/* <AdminNavbar isDashboard={false} isFullWidth={true} /> */}
            <div className="flex justify-center h-full font-poppins ">
                <div className=" 2xl:w-2/12 lg:w-3/12 max-lg:hidden">
                    <Sidebar setIsProfilePopup={setIsProfilePopup} />
                </div>
                
                {VisibleFile ? (

                    <FileViewer File={VisibleFile} onClose={HandleCloseFileViwer} />
                ) : (
                    <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">
                        <h2 className="text-3xl tracking-wider font-semibold text-custom-black-text">Saved Files</h2>
                        <div className="w-full flex space-x-20  mt-10  justify-between  items-center ">
                            <div className="w-2/12">

                                <DropdownComponent
                                    label='Sort By'
                                    IsLabel={false}
                                    IsDarkBackground={false}
                                    options={Sortby}
                                    IsOpened={SortByDropdown}
                                    ToggleAction={handleToggleDropdown}
                                    value={SelectedSortByOption}
                                    HandleSelection={handleSortByOption}
                                    isActive={true}

                                />
                            </div>
                            {/* INPUT COMPONENT */}
                            <div className=" relative w-full ">
                                <div className="flex border items-center  border-opacity-55 p-1.5 space-x-2 rounded-md   border-custom-dark-orange">
                                    <input onChange={handleInputChange} value={query} type="text" placeholder='search by title' className=" px-2 rounded-md w-full  text-slate-900 outline-none " />
                                  {query && <span onClick={HandleClearQuery} className=""><RxCross2/></span> }
                                    <button onClick={ConfirmSuggestionClick} className="border border-custom-dark-orange  border-opacity-35  bg-custom-light-orange  hover:bg-custom-lighter-orange rounded-md px-4 py-1 ">Search</button>
                                </div>

                                {(query && IsTyping) && (<ul className={`absolute left-0 right-0 z-10 mt-1 overflow-auto   rounded-md shadow-lg max-h-40`}>
                                    {suggestions.length > 0 ? (
                                        suggestions.map((suggestion, index) => (
                                            <li
                                                key={index}
                                                onClick={()=>handleSelectSuggestion(suggestion.title)}
                                                className={`block px-4 py-2  z-70 bg-white text-sm lg:text-base text-gray-900 hover:bg-stone-50  cursor-pointer  `}
                                            >
                                                {suggestion.title}
                                            </li>
                                        ))
                                    ) : (

                                        <li

                                            className={`block px-4 py-2  z-70 bg-white text-sm lg:text-base text-gray-900 hover:bg-stone-50  cursor-pointer  `}
                                        >
                                            No results
                                        </li>
                                    )}
                                </ul>)}
                            </div>
                        </div>
                        {IsLoading ? (
                            <OpacityLoader />

                        ) : (

                            <table className="min-w-full mt-6 bg-white ">
                                <thead >
                                    <tr className="border-b border-slate-400">
                                        {TableColumns.map((column, index) => (
                                            <th key={index} className='px-4 py-6 font-semibold text-left  text-gray-800 uppercase max-2xl:text-sm'>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* Add multiple rows as needed */}
                                    {SavedFiles.length > 0 && SavedFiles.map((file, index) => (

                                        <tr key={index} className="border-b  ">

                                            <td onClick={() => HandleFavorite(file.id)} className='2xl:py-4 py-6 cursor-pointer     px-4'>
                                                <CustomToolTip title={file.is_favourited ? 'Unfavourite' : 'Add to Favourites'} position='bottom'>

                                                    <span className="">
                                                        <FaRegStar className={` ${file.is_favourited ? 'text-custom-dark-orange' : ''}`} />
                                                    </span>
                                                </CustomToolTip >
                                            </td>

                                            <td className={cellStyle}>{file.title}</td>
                                            <td className={cellStyle}>{file.type}</td>
                                            <td className={cellStyle}>{file.created_at}</td>
                                            <td onClick={() => handleShowSavedArticle(file.content)} className={cellStyle}><button className="px-4 py-0.5 border   hover:bg-custom-lighter-orange border-custom-dark-orange rounded-lg">view</button></td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                        {(!IsLoading && SavedFiles.length > 1 ) && (<Pagination
                            prevPage={prevPage}
                            nextPage={nextPage}
                            function_to_call={fetchSavedFiles}
                            currentPage={currentPage}
                            TotalPages={TotalPages}
                        />)}

                    </div>
                )}
                <Toaster />

            </div>
        </>
    )
}

export default History