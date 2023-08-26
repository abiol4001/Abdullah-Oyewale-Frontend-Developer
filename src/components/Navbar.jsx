import React from 'react'
import spacex from "../assets/spacex.svg"

const Navbar = () => {
  return (
    <div className='h-[98px] border-b border-[1px] border-gray-200 flex items-center px-4 lg:px-20 '>
        <img src={spacex} alt="" className='w-[220px] h-[50px] object-contain cursor-pointer' />
    </div>
  )
}

export default Navbar