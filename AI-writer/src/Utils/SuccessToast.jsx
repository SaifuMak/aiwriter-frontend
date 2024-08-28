import React from 'react'
import { Toaster, toast } from 'sonner';
import { GoVerified } from "react-icons/go";

function SuccessToast(message) {
    toast(message, { 
        icon: <GoVerified className='text-3xl text-[#4FC581] ' />, 
        className: 'py-4 text-lg space-x-4 border-2 border-[#4FC581]' 
    });
}

export default SuccessToast