import React from 'react'
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

function InputBox({ placeholder, name, value, onchange, is_null, Is_check_password=false, is_password_field = false, HandlePasswordVisibility, isPasswordVisible, Is_password_null, IsPasswordNotMatching = false, IsPasswordStrong = false }) {


  return (
    <div className="w-1/2 ">

    <div className="relative py-2 text-base text-black border-b border-slate-400 ">
      <input onChange={onchange} value={value} name={name} type={!isPasswordVisible && is_password_field ? 'password' : 'text'} className="w-11/12 outline-none " placeholder={placeholder} />
      {(is_password_field && !Is_password_null) && <span onClick={HandlePasswordVisibility} className="absolute bottom-3 -right-1 sm:right-0">{isPasswordVisible ? <IoEyeOutline /> : <IoEyeOffOutline />}</span>}
      {/* {is_null && <span className="absolute left-0 text-xs text-red-500 -bottom-5 ">*This field is required</span>} */}
      {/* {(IsPasswordNotMatching && !Is_password_null) && <span className="absolute left-0 text-xs text-red-500 -bottom-5 "> passwords are not matching</span>}
     
      {(!IsPasswordStrong && !Is_password_null && Is_check_password) && <span className="absolute left-0 text-xs text-red-500 -bottom-9 2xl:-bottom-5 ">Password must be 8+ characters and contain letters and numbers.</span>} */}



    </div>

    {is_null && <span className="text-xs text-red-500 ">*This field is required</span>}


    {(IsPasswordNotMatching && !Is_password_null) && <span className="text-xs text-red-500 "> passwords are not matching</span>}
     
     {(!IsPasswordStrong && !Is_password_null && Is_check_password) && <div className=""><span className="text-xs text-red-500 ">Password must be 8+ characters and contain letters and numbers.</span></div> }

    </div>

  )
}



export default InputBox