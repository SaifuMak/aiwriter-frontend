import React from 'react'
import { Toaster, toast } from 'sonner';

import { LuAlertCircle } from "react-icons/lu";

function ErrorToast(message) {
    toast(message, { 
        icon: <LuAlertCircle className='text-3xl text-red-600 ' />, 
        className: 'py-4 text-lg space-x-4 border-2 border-red-500' 
    });

}

export default ErrorToast