import React from 'react'

const Loading = () => {
  return (
    <div className='w-full min-h-svh flex justify-center items-center'>
        <div className='border-t-2 rounded-full animate-spin w-12 h-12 border-cyan-600 '></div>
    </div>
  )
}

export default Loading