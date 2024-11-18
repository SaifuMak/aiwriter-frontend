import React from 'react';
import GeneralLoader from '../Loaders/GeneralLoader';


const Table = ({ TableColumns,isLoaderColor,LoaderSize, PaymentHistoryData, IsTableLoading }) => {

    const cellStyle = '2xl:py-4  py-2 px-4  '
    console.log(PaymentHistoryData, '-----------------')

    return (
        <>
            {IsTableLoading ? (
                <div className="flex justify-center items-center min-h-[380px]">
                    {/* Add a simple spinner or any other loader */}
                   <GeneralLoader isLoaderColor={isLoaderColor} LoaderSize={LoaderSize} />
                </div>

            ) : (

                PaymentHistoryData ? (
                    <div className="p-2 overflow-x-auto  0  min-h-[380px] " >
                        <table className="min-w-full bg-white ">
                            <thead >
                                <tr className="border-b border-slate-400">
                                    {TableColumns.map((column, index) => (
                                        <th key={index} className='px-4 py-6 font-semibold text-left text-gray-800 uppercase'>{column}</th>
                                    ))}

                                </tr>
                            </thead>
                            <tbody>
                                {/* Add multiple rows as needed */}
                                {PaymentHistoryData && PaymentHistoryData.map((payment, index) => (

                                    <tr key={index} className="border-b hover:bg-gray-50">
                                        <td className={cellStyle}>{payment.created_at}</td>
                                        <td className={cellStyle}>{payment.invoice_id}</td>
                                        <td className={cellStyle}>{payment.name_of_plan}{payment.name_of_plan !== 'Add_on_credits' && '(monthly)'}</td>
                                        <td className={cellStyle}>${payment.cost_of_plan/100}</td>
                                        <td className='px-4 py-4 text-sm underline text-custom-dark-orange'>Download Invoice</td>


                                    </tr>

                                ))}


                            </tbody>
                        </table>
                    </div >

                ) : (
                    <div className="flex items-center justify-center min-h-[380px]  ">
                        <h3 className=" text-slate-600"> No transactions have been recorded so far. </h3>
                    </div>

                )
            )}
        </>

    );
};

export default Table;