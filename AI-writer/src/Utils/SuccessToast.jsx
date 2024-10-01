import React from 'react'
import { Toaster, toast } from 'sonner';
import { GoVerified } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon

function SuccessToast(message) {

    const defaultOptions = {
        unstyled: true,
            classNames: {
              toast: 'bg-[#44AA55] text-nowrap flex  px-8 py-4 text-center text-lg  rounded-full  text-white',
              title: 'text-white text-xl',
              actionButton: 'bg-[#44AA55]',
            //   cancelButton: 'bg-[#44AA55]',
            //   closeButton: 'bg-[#44AA55]', // Remove background with bg-transparent
            },
        duration: 5000, // Set duration in milliseconds (e.g., 4000ms = 4 seconds)
        position: 'bottom-center', // Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        action: {
            label: (
                <AiOutlineClose
                    className="ml-6 text-2xl text-white cursor-pointer "
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