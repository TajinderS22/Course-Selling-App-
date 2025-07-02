import React,{useContext, useState} from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router'


const Navbar = () => {
    const {onSignup,setOnSignup,setAuthenticationMessage}=useContext(AppContext)
    const [isExtended,setIsExtended]=useState(false)
  return (
    <div className='h-16'>
        <div className={`w-full max-w-[1920px] absolute z-30 mb-96 top-0 dark:bg-slate-700 dark:text-white bg-[#ADEED9]/80 flex justify-between p-2 px-4
    ${isExtended&&"items-center justify-around flex-col h-[600px]"}
    `}>
        <div className='flex justify-between md:w-[10%] w-full'>
            <div className='w-full'>
                <img className='w-14' src="https://res.cloudinary.com/dcpz5001o/image/upload/v1750935602/Tuty_pffuhw.png" alt="Tuty Logo " />
            </div>

            <div className={`md:hidden m-3   `}
                onClick={()=>{
                    setIsExtended(!isExtended)
                }}
            >
                <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 `}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </div>

        </div>

        <div className={`list-none md:flex justify-between items-center min-w-[400px] mx-2 ${isExtended?"flex flex-col justify-between flex-1 mt-14 font-bold items-end pr-8 pb-14 ":"hidden"} `} >
            <Link to={'/'}>
                <li className='p-2'>
                    Home
                </li>
            
            </Link>
                <Link to={'/'}>
                    <li className='p-2'>
                    About us
                </li>
                
                </Link>
            <Link to={'/'}>
                <li className='p-2'>
                    Pricing
                </li>
            
            </Link>
            <Link to={'/buyCourse'}>
                <li className='p-2'>
                    Courses
                </li>
            </Link>
            <Link to={'/'}>
                <li className='p-2'>
                    extra
                </li>
            </Link>
            <Link to="/authentication">
                <button className='bg-[#0ABAB5] p-2 rounded-md'
                    onClick={()=>{
                        setOnSignup(!onSignup)
                        setAuthenticationMessage(null)
                    }}
                    
                >
                    {onSignup?"Login":"Sign Up"} 
                </button>
            </Link>
        </div>
        

    </div>
    </div>
  )
}

export default Navbar