import React, { useState, useEffect } from 'react'
import Axiosinstance from '../Axios/Axiosinstance'
import { getPageNumber, getTotalPagesCount,truncateText } from '../Utils/Helperfunctions'
import Pagination from './GeneralComponets/Pagination'
import { Toaster, toast } from 'sonner';
import OpacityLoader from './GeneralComponets/Loaders/OpacityLoader';

function PlagiarismHistory() {
    const cellStyle = '2xl:py-8   py-2 px-4'

    const [IsProfilePopup, setIsProfilePopup] = useState(false)
    const [SavedFiles, setSavedFiles] = useState([])
    const [IsLoading, setIsLoading] = useState(true)
    const TableColumns = ['', 'Article', 'Type', 'Generated on', '']

    const [nextPage, setNextPage] = useState(null); // Next page URL
    const [prevPage, setPrevPage] = useState(null); // Previous page URL
    const [currentPage, setCurrentPage] = useState(1)
    const [TotalPages, setTotalPages] = useState(null)



    const fetchPlagairismHistory = async (page = 1) => {

        try {


            const response = await Axiosinstance.get(`api/plagiarism-check-history?page=${page}`);


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


    useEffect(() => {

        fetchPlagairismHistory()

    }, [])



    return (
        <div className="">
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

                                {/* <td onClick={() => HandleFavorite(file.id)} className='2xl:py-4 py-6 cursor-pointer     px-4'>
                                    <CustomToolTip title={file.is_favourited ? 'Remove Bookmark' : 'Mark as Bookmark'} position='bottom'>

                                        <span className="">
                                            <FaRegBookmark className={` ${file.is_favourited ? 'text-custom-dark-orange' : ''}`} />
                                        </span>
                                    </CustomToolTip >
                                </td> */}
                                <td className={cellStyle}>id</td>

                                <td className={cellStyle}>{truncateText(file.article,150)}</td>
                                <td className={cellStyle}>plagiarism</td>
                                <td className={cellStyle}>{file.created_at}</td>
                                <td onClick={() => handleShowSavedArticle(file.content)} className={cellStyle}><button className="px-4 py-0.5 border   hover:bg-stone-50 border-custom-dark-orange rounded-lg">view</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {(!IsLoading && SavedFiles.length > 1) && (<Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                function_to_call={fetchPlagairismHistory}
                currentPage={currentPage}
                TotalPages={TotalPages}
            />)}

        </div>
    )
}

export default PlagiarismHistory