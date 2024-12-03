import React, { useEffect, useState, useRef } from 'react'
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader'
import Pagination from '../GeneralComponets/Pagination'
import { SlCalender } from "react-icons/sl";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { VscCheck } from "react-icons/vsc";
import Calender from '../GeneralComponets/Layouts/Calender';
import ErrorToast from '../../Utils/ErrorToast';
import { Toaster, toast } from 'sonner';
import { convertDate } from '../../Utils/Helperfunctions';


function Subscriptions({ GetSubscriptionsListofUsers, IsLoading, SubscriptionsData, nextPage, prevPage, currentPage, TotalPages }) {
  const TableColumns = ['ID', 'Email', 'Plan', 'Amount', 'Payment date', 'Transaction ID', 'View invoice']
  const cellStyle = '2xl:py-4 text-center  py-2 px-4'


  const [FromDate, setFromDate] = useState(null)
  const [IsFromCalender, setIsFromCalender] = useState(false)
  const [ToDate, setToDate] = useState(null)
  const [IsToCalender, setIsToCalender] = useState(false)


  useEffect(() => {

    GetSubscriptionsListofUsers(currentPage)

  }, [])


  const GetSubscriptionsFromDates = () => {
    if (!FromDate || !ToDate) {
      return
    }
    const convertedFromDate = convertDate(new Date(FromDate))
    const convertedToDate = convertDate(new Date(ToDate))

    GetSubscriptionsListofUsers(1, convertedFromDate, convertedToDate)

  }



  const handleFromDateCalender = () => {
    setIsToCalender(false)
    setIsFromCalender(true)
    // setIsFromCalender(!IsFromCalender)
  }

  const handleToDateCalender = () => {
    if (!FromDate) {
      toast.dismiss()
      ErrorToast('Choose a valid From Date to proceed')
      return
    }
    // setIsFromCalender(false)
    setIsToCalender(true)
  }


  useEffect(() => {
    if (IsFromCalender) {
      setIsFromCalender(false)
    }

    if (IsToCalender) {
      setIsToCalender(false)
    }

    GetSubscriptionsFromDates()

  }, [FromDate, ToDate])


  const fromCalendarRef = useRef(null);
  const toCalendarRef = useRef(null);


  useEffect(() => {

    const handleCloseFromCalender = (e) => {
      if (fromCalendarRef.current &&
        !fromCalendarRef.current.contains(e.target)) {
        setIsFromCalender(false);

      }
    }

    const handleCloseToCalender = (e) => {
      if (toCalendarRef.current &&
        !toCalendarRef.current.contains(e.target)) {
        setIsToCalender(false);

      }
    }

    document.addEventListener('mousedown', handleCloseFromCalender)
    document.addEventListener('mousedown', handleCloseToCalender)

    return () => document.removeEventListener('mousedown', handleCloseFromCalender)
  }, [])



  return (
    <div className="w-full mt-4 ">

      {IsLoading ? (

        <div className="flex items-center justify-center w-full ">
          {/* <GeneralLoader isLoaderColor={true} LoaderSize='5xl' /> */}
        </div>

      ) : (

        <div className="p-2 overflow-x-auto   min-h-[380px] " >

          <div className="flex space-x-10 ">

            <div ref={fromCalendarRef} onClick={handleFromDateCalender} className="relative flex items-center justify-between h-16 px-3 space-x-2 rounded-md cursor-pointer bg-custom-dark ">
              <div className="flex flex-col text-sm ">
                <span className="text-white"> From Date</span>
                <span className="text-white">{FromDate}</span>
              </div>

              <SlCalender className='text-2xl text-white' />

              {IsFromCalender && <div onMouseDown={(e) => e.stopPropagation()} className="absolute left-0 z-30 top-20 ">
                <Calender setDate={setFromDate} />
              </div>}
            </div>


            <div ref={toCalendarRef} onClick={handleToDateCalender} className="relative flex items-center justify-between h-16 px-3 space-x-2 duration-150 rounded-md cursor-pointer bg-custom-dark hover:bg-slate-900 ">
              <div className="flex flex-col text-sm ">
                <span className="text-white "> To Date</span>
                <span className="text-white ">{ToDate}</span>
              </div>
              <SlCalender className='text-2xl text-white' />

              {IsToCalender && <div className="absolute left-0 z-30 top-20 ">
                <Calender setDate={setToDate} minDate={FromDate} />
              </div>}
            </div>
          </div>

          {/* {FromDate && <p className="">from : {convertDate(new Date(FromDate))}</p>} */}


          {SubscriptionsData.length > 0 ? (
            <>

              <table className="min-w-full mt-6 bg-white ">
                <thead >
                  <tr className="border-t border-b border-slate-400">
                    {TableColumns.map((column, index) => (
                      <th key={index} className='px-4 py-6 font-semibold text-center text-gray-800 uppercase max-2xl:text-sm'>{column}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>

                  {/* Add multiple rows as needed */}
                  {SubscriptionsData && SubscriptionsData.map((user, index) => (

                    <tr key={index} className="border-b hover:bg-stone-50">
                      <td className={cellStyle}>{index + 1}</td>
                      <td className={cellStyle}>{user.email ? user.email : 'N/A'}</td>
                      <td className={cellStyle}>{user.name_of_plan ? user.name_of_plan : 'N/A'}</td>
                      <td className={cellStyle}>${user.cost_of_plan ? user.cost_of_plan / 100 : 'N/A'}</td>

                      <td className={cellStyle}>{user.created_at ? user.created_at : 'N/A'}</td>
                      <td className={cellStyle}>{user.invoice_id ? user.invoice_id : 'N/A'}</td>

                      <td className='px-4 py-2 text-center cursor-pointer hover:underline 2xl:py-4 text-custom-dark-orange'>View details</td>

                    </tr>
                  ))}
                </tbody>
              </table>


              <Pagination
                prevPage={prevPage}
                nextPage={nextPage}
                function_to_call={GetSubscriptionsListofUsers}
                currentPage={currentPage}
                TotalPages={TotalPages}
              />
            </>

          ) : (
            <div className="flex items-center justify-center w-full h-screen">
              <h5 className="-mt-64 text-3xl text-custom-dark">No results found</h5>

            </div>
          )}

        </div >


      )

      }

      {/* {IsUserDetailsPopup && <ManageUsers userDetails={userDetails} formData={formData} ShowUserDetails={ShowUserDetails} />} */}
      <Toaster />


    </div>
  )
}

export default Subscriptions