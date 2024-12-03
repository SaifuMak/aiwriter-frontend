import React, { useState, useEffect } from 'react'
import Axiosinstance from '../Axios/Axiosinstance';
import { FaRegStar } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import OpacityLoader from './GeneralComponets/Loaders/OpacityLoader';
import FileViewer from './GeneralComponets/FileViewer/FileViewer';
import { getPageNumber, getTotalPagesCount } from '../Utils/Helperfunctions';
import Pagination from './GeneralComponets/Pagination';
import { Toaster, toast } from 'sonner';
import SuccessToast from '../Utils/SuccessToast';
import ErrorToast from '../Utils/ErrorToast';
import CustomToolTip from './ArticleGenerationComponents/SmallComponents/CustomToolTip';
import DropdownComponent from './DropdownComponent';
import _ from 'lodash';  // Import Lodash
import ToggleButtton from './GeneralComponets/Buttons/ToggleButtton';
import { useDispatch } from 'react-redux';
import { HandleForbiddenGenericErrors } from '../Utils/ErrorMessageHandler';


function ArticleHistory({ handleToggle, SelectedTab }) {

    const dispatch = useDispatch()

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
            HandleForbiddenGenericErrors(error, dispatch)
            setIsLoading(false)
        }
    }

    const fetchFile = async () => {
        toast.dismiss()
        if (!query) {
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
            HandleForbiddenGenericErrors(error, dispatch)
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

    const handleSelectSuggestion = (title) => {
        setIsTyping(false)

        setQuery(title)
    }

    const HandleClearQuery = () => {
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
            {VisibleFile ? (

                <FileViewer File={VisibleFile} onClose={HandleCloseFileViwer} />
            ) : (


                <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">
                    <div className="flex ">
                        <h2 className="text-3xl font-semibold tracking-wider text-custom-black-text">Saved Files</h2>
                       
                        {/* <ToggleButtton /> */}
                        <div className="flex p-1.5 ml-6 rounded-md cursor-pointer w-42 bg-custom-light-orange">
                            <button onClick={() => handleToggle('Article')} className={`px-2 py-1  tracking-wider ${SelectedTab === 'Article' ? 'bg-custom-dark-orange font-semibold text-white  rounded-md' : ''}   `}>Article</button>
                            <button onClick={() => handleToggle('Plagiarism')} className={`px-2 py-1  tracking-wider ${SelectedTab === 'Plagiarism' ? 'bg-custom-dark-orange font-semibold text-white  rounded-md' : ''}`}>Plagiarism</button>
                        </div>
                  
                    </div>
                    <div className="flex items-center justify-between w-full mt-10 space-x-20 ">
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
                        <div className="relative w-full ">
                            <div className="flex border items-center  border-opacity-55 p-1.5 space-x-2 rounded-md   border-custom-dark-orange">
                                <input onChange={handleInputChange} value={query} type="text" placeholder='search by title' className="w-full px-2 rounded-md outline-none text-slate-900" />
                                {query && <span onClick={HandleClearQuery} className=""><RxCross2 /></span>}
                                <button onClick={ConfirmSuggestionClick} className="px-4 py-1 border rounded-md border-custom-dark-orange border-opacity-35 bg-custom-light-orange hover:bg-custom-lighter-orange ">Search</button>
                            </div>

                            {(query && IsTyping) && (<ul className={`absolute left-0 right-0 z-10 mt-1 overflow-auto   rounded-md shadow-lg max-h-40`}>
                                {suggestions.length > 0 ? (
                                    suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectSuggestion(suggestion.title)}
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

                        SavedFiles.length > 0 ? (
                            <table className="min-w-full mt-6 bg-white ">
                                <thead >
                                    <tr className="border-b border-slate-400">
                                        {TableColumns.map((column, index) => (
                                            <th key={index} className='px-4 py-6 font-semibold text-left text-gray-800 uppercase max-2xl:text-sm'>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* Add multiple rows as needed */}
                                    {SavedFiles.length > 0 && SavedFiles.map((file, index) => (

                                        <tr key={index} className="border-b ">

                                            <td onClick={() => HandleFavorite(file.id)} className='px-4 py-6 cursor-pointer 2xl:py-4'>
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

                        ) : (
                            <div className="flex items-center justify-center mt-32">
                                <h3 className="text-2xl text-custom-black-text">You dont have any saved files</h3>
                            </div>
                        )
                    )}

                    {(!IsLoading && SavedFiles.length > 1) && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={fetchSavedFiles}
                        currentPage={currentPage}
                        TotalPages={TotalPages}
                    />)}

                </div>
            )}
        </>
    )
}

export default ArticleHistory