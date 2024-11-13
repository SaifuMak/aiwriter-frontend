import React from 'react'
import { LuLoader2 } from "react-icons/lu";

function GeneralLoader({isLoaderColor=false, LoaderSize='xl'}) {
  return (
    <LuLoader2 className={`text-${LoaderSize} ${isLoaderColor ? 'text-custom-dark-orange': 'text-white'}  animate-spin `}/>
  )
}

export default GeneralLoader

