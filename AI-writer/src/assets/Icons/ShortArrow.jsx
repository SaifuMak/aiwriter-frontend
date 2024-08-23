import React from 'react'

function ShortArrow({ isActive }) {
  return (
    <svg width="29" height="16" viewBox="0 0 109 16" fill="none" xmlns="http://www.w3.org/2000/svg"   className={`fill-current ${isActive ? ' text-custom-dark-orange' : 'text-white'}`} >
    <path d="M108.707 8.70711C109.098 8.31658 109.098 7.68342 108.707 7.29289L102.343 0.928932C101.953 0.538408 101.319 0.538408 100.929 0.928932C100.538 1.31946 100.538 1.95262 100.929 2.34315L106.586 8L100.929 13.6569C100.538 14.0474 100.538 14.6805 100.929 15.0711C101.319 15.4616 101.953 15.4616 102.343 15.0711L108.707 8.70711ZM0 9H108V7H0V9Z" />
    </svg>
    
  )
}

export default ShortArrow