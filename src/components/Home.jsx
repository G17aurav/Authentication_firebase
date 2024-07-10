
import React from 'react'
import { NavLink } from 'react-router-dom'
import 'animate.css';

function Home() {
  return (
    <div className='flex items-center justify-center w-full animate__animated animate__fadeInLeft duration-500'>
        <div className='mt-32 md:mt-40 lg:mt-48 text-2xl md:text-4xl lg:text-5xl text-richblack-5 text-center'>
            Welcome to Home Page!!
        </div>
    </div>
  )
}

export default Home
