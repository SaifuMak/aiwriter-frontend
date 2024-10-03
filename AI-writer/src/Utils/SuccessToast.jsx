import React from 'react'
import { Toaster, toast } from 'sonner';
import { GoVerified } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon

function SuccessToast(message) {

    const defaultOptions = {
        unstyled: true,
            classNames: {
              toast: 'bg-[#44AA55] flex  px-6 py-3.5 text-center text-sm  max-w-xl whitespace-normal rounded-full  text-white',
              title: 'text-white text-base ',
              actionButton: 'bg-[#44AA55]',
            //   cancelButton: 'bg-[#44AA55]',
            //   closeButton: 'bg-[#44AA55]', // Remove background with bg-transparent
            },
        duration: 5000, // Set duration in milliseconds (e.g., 4000ms = 4 seconds)
        position: 'bottom-right', // Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        action: {
            label: (
                <AiOutlineClose
                    className="ml-2 text-2xl text-white cursor-pointer "
                    style={{ background: '#44AA55', padding: '2px', borderRadius: '50%' }}
                />
            ), // Close icon styling with transparent background
            onClick: () => toast.dismiss() // Dismiss the toast when clicked
        },

    };
    // toast(message, { 
    //     icon: <GoVerified className='text-3xl text-[#4FC581] ' />, 
    //     className: 'py-4 text-lg  space-x-4 border-2 border-[#4FC581]' 
    // });

    toast(message,defaultOptions);
   
}

export default SuccessToast