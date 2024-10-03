import React from 'react'
import { Toaster, toast } from 'sonner';
import { AiOutlineClose } from "react-icons/ai"; // Import a close icon
import { LuAlertCircle } from "react-icons/lu";

function ErrorToast(message, IsInCenter=false,IsmarginLeft=false ) {
    // toast(message, { 
    //     icon: <LuAlertCircle className='text-3xl text-red-600 ' />, 
    //     className: 'py-4 text-lg space-x-4 border-2 border-red-500' 
    // });

    const defaultOptions = {
        unstyled: true,
            classNames: {
              toast: `bg-[#E53E3E]    flex ${IsmarginLeft ? 'sm:ml-12' : 'ml-0'}   px-6 py-3.5 text-center max-w-sm sm:max-w-xl whitespace-normal   rounded-full  text-white `,
              title: 'text-white text-base',
              actionButton: 'bg-[#E53E3E]',
          
            },
        duration: Infinity, // Set duration in milliseconds (e.g., 4000ms = 4 seconds)
        position:  IsInCenter ? 'bottom-center' : 'bottom-right', // Can be 'top-left', 'top-right', 'bottom-left', 'bottom-right'
        action: {
            label: (
                <AiOutlineClose
                    className="ml-2 text-2xl text-white cursor-pointer "
                    style={{ background: '#E53E3E', padding: '2px', borderRadius: '50%' }}
                />
            ), // Close icon styling with transparent background
            onClick: () => toast.dismiss() // Dismiss the toast when clicked
        },

    };


    toast(message,defaultOptions);

}

export default ErrorToast