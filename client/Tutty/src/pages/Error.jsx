import React from 'react'
import Navbar from '../components/Navbar'

const Error = () => {
  return (
    <div className=''>
      <Navbar/>
      <div className='h-svh w-full flex flex-col items-center justify-center text-center items '>

        <p className='text-3xl font-bold '>
          404 Sorry this page does not exist.
        </p>
      </div>
    </div>
  )
}

export default Error