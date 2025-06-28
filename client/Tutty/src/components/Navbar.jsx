import React,{useContext} from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router'


const Navbar = () => {
    const {onSignup,setOnSignup,setAuthenticationMessage}=useContext(AppContext)
  return (
    <div className='w-full max-w-[1920px] sticky top dark:bg-slate-700 dark:text-white bg-[#ADEED9]/80 flex justify-between p-2 px-4'>
        <div className='w-[10%]'>
            <img className='w-14' src="https://res.cloudinary.com/dcpz5001o/image/upload/v1750935602/Tuty_pffuhw.png" alt="Tuty Logo " />
        </div>
        <div className='list-none md:flex justify-between items-center min-w-[450px] mx-2 hidden  ' >
            <li className='p-2'>
                Home
            </li>
            <li className='p-2'>
                About us
            </li>
            <li className='p-2'>
                Pricing
            </li>
            <li className='p-2'>
                Courses
            </li>
            <li className='p-2'>
                extra
            </li>
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
  )
}

export default Navbar