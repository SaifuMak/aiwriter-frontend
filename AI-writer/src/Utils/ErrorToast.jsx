import React from 'react'
import { Toaster, toast } from 'sonner';
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon
import { LuAlertCircle } from "react-icons/lu";

function ErrorToast(message, ) {
    // toast(message, { 
    //     icon: <LuAlertCircle className='text-3xl text-red-600 ' />, 
    //     className: 'py-4 text-lg space-x-4 border-2 border-red-500' 
    // });

    const defaultOptions = {
        unstyled: true,
            classNames: {
              toast: `bg-[#E53E3E] text-nowrap   flex  px-8 py-4 text-center   rounded-full  text-white`,
              title: 'text-white text-xl',
              actionButton: 'bg-[#E53E3E]',
          
            },
        duration: Infinity, // Set duration in milliseconds (e.g., 4000ms = 4 seconds)
        position: 'bottom-center', // Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        action: {
            label: (
                <AiOutlineClose
                    className="ml-6 text-2xl text-white cursor-pointer "
                    style={{ background: '#E53E3E', padding: '2px', borderRadius: '50%' }}
                />
            ), // Close icon styling with transparent background
            onClick: () => toast.dismiss() // Dismiss the toast when clicked
        },

    };


    toast(message,defaultOptions);

}

export default ErrorToast