import React from 'react'
import { Link } from 'react-router-dom'

function NoPageFound() {

  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold text-custom-black-text  mb-4">404 - Page Not Found</h1>
    <p className="text-gray-600 mb-6">Sorry, the page you're looking for doesn't exist.</p>
    <Link
      to="/"
      className="text-blue-500 underline hover:text-blue-700"
    >
      Go Back to Home
    </Link>
  </div>
  )
}

export default NoPageFound