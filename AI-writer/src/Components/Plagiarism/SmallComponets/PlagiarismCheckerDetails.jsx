import React from 'react'
import { GoDotFill } from "react-icons/go";



function PlagiarismCheckerDetails() {
  return (
    <div className="border border-[#FB923C] p-3 mt-10  w-3/4">
    <p className="">25% Plagiarism - 146 similar words</p>
    <a href="" className=" text-[#0176FF] ">https://www.loremipsum.com</a>
    <ul className="mt-6 space-y-2">
        <li className="flex items-center "> <GoDotFill className=' text-custom-dark-orange' /> Lorem Ipsum is simply dummy text of the printing...</li>
        <li className="flex items-center "> <GoDotFill className=' text-custom-dark-orange' /> Lorem Ipsum is simply dummy text of the printing...</li>

    </ul>
</div>
  )
}

export default PlagiarismCheckerDetails