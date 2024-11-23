import React, { useEffect } from 'react'
import GeneralLoader from '../GeneralComponets/Loaders/GeneralLoader'

function Subscriptions({ GetSubscriptionsListofUsers,IsLoading,SubscriptionsData }) {
  const TableColumns = ['ID', 'Email',  'Plan', 'Amount', 'Payment date', 'Transaction ID','View invoice']
  const cellStyle = '2xl:py-4 text-center  py-2 px-4'


  useEffect(() => {

    GetSubscriptionsListofUsers()

  }, [])


  return (
    <div className="w-full ">
      {IsLoading ? (

        <div className="flex items-center justify-center w-full ">
          {/* <GeneralLoader isLoaderColor={true} LoaderSize='5xl' /> */}
        </div>

      ) : (
        <div className="p-2 overflow-x-auto   min-h-[380px] " >
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
                  <td className={cellStyle}>${user.cost_of_plan ? user.cost_of_plan/100 : 'N/A'}</td>

                  <td className={cellStyle}>{user.created_at ? user.created_at : 'N/A'}</td>
                  <td className={cellStyle}>{user.invoice_id ? user.invoice_id : 'N/A'}</td>

                  <td  className='px-4 py-2 text-center cursor-pointer hover:underline 2xl:py-4 text-custom-dark-orange'>View details</td>
                
                </tr>
              ))}

            </tbody>
          </table>
        </div >
      )

      }

      {/* {IsUserDetailsPopup && <ManageUsers userDetails={userDetails} formData={formData} ShowUserDetails={ShowUserDetails} />} */}


    </div>
  )
}

export default Subscriptions