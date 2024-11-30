import React, { useState, useEffect } from 'react'
import Axiosinstance from '../Axios/Axiosinstance'
import { getPageNumber, getTotalPagesCount, truncateText } from '../Utils/Helperfunctions'
import Pagination from './GeneralComponets/Pagination'
import { Toaster, toast } from 'sonner';
import OpacityLoader from './GeneralComponets/Loaders/OpacityLoader';
import ToggleButtton from './GeneralComponets/Buttons/ToggleButtton';
import DropdownComponent from './DropdownComponent';
import CustomToolTip from './ArticleGenerationComponents/SmallComponents/CustomToolTip';
import { FaRegBookmark } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import PlagiarismReport from './PlagiarismReport';
import { HandleForbiddenGenericErrors } from '../Utils/ErrorMessageHandler';
import { useDispatch } from 'react-redux';
import SuccessToast from '../Utils/SuccessToast';



function PlagiarismHistory() {

    const dispatch = useDispatch()

    const Sortby = ['Show All', 'Bookmarked', 'Oldest First'];
    const cellStyle = '2xl:py-8   py-2 px-4'

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [VisibleFile, setVisibleFile] = useState(null)

    const [SavedFiles, setSavedFiles] = useState([])
    const [IsLoading, setIsLoading] = useState(true)
    const TableColumns = ['', 'Article', 'Type', 'Generated on', '']

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [TotalPages, setTotalPages] = useState(null)
    const [SortByDropdown, setSortByDropdown] = useState(false)
    const [SelectedSortByOption, setSelectedSortByOption] = useState('')



    const handleToggleDropdown = () => {
        setSortByDropdown(!SortByDropdown)
    }

    const handleSortByOption = (option) => {
        setSelectedSortByOption(option)
        setSortByDropdown(false)
    }

    const HandleCloseFileViwer = () => {
        setVisibleFile(null)
    }

    const handleShowPlagiarismReport = (file) => {
        console.log(file)
        setVisibleFile(file)
    }

    const fetchPlagairismHistory = async (page = 1) => {
        try {

            const response = await Axiosinstance.get(`api/plagiarism-check-history?page=${page}&sortby=${SelectedSortByOption}`);
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
            HandleForbiddenGenericErrors(error, dispatch)
            console.log(error)
            setIsLoading(false)
        }
    }


    const HandleFavorite = async (Id) => {

        toast.dismiss()

        try {
            const response = await Axiosinstance.post('api/toggle-plagiarism-report-favourite', { 'id': Id })
            SuccessToast(response.data.message)
            await fetchPlagairismHistory(currentPage)
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            HandleForbiddenGenericErrors(error, dispatch)

            setIsLoading(false)
        }
    }




    useEffect(() => {

        fetchPlagairismHistory()

    }, [SelectedSortByOption])



    return (
        <>
            {VisibleFile ? (

                <PlagiarismReport File={VisibleFile} onClose={HandleCloseFileViwer} />
            ) : (

                <div className="w-full h-screen px-6 py-10 md:px-8 xl:px-12 lg:w-10/12">
                    <div className="flex ">
                        <h2 className="text-3xl font-semibold tracking-wider text-custom-black-text">Saved Files</h2>
                        <ToggleButtton />
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

                                            <td className={cellStyle}>{truncateText(file.article, 150)}</td>
                                            <td className={cellStyle}>plagiarism</td>
                                            <td className={cellStyle}>{file.created_at}</td>
                                            <td onClick={() => handleShowPlagiarismReport(file)} className={cellStyle}><button className="px-4 py-0.5 border   hover:bg-stone-50 border-custom-dark-orange rounded-lg">view</button></td>

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
                    {(!IsLoading && SavedFiles.length > 0) && (<Pagination
                        prevPage={prevPage}
                        nextPage={nextPage}
                        function_to_call={fetchPlagairismHistory}
                        currentPage={currentPage}
                        TotalPages={TotalPages}
                    />)}

                </div>

            )

            }
        </>
    )
}

export default PlagiarismHistory