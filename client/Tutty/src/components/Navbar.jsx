/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React,{useContext, useEffect, useState} from 'react'
import { AppContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../recoil/userAtom'
import { AdminAtom } from '../recoil/adminAtom'


const Navbar = () => {
    const {onSignup,setOnSignup,setAuthenticationMessage}=useContext(AppContext)
    const [isExtended,setIsExtended]=useState(false)
    const [isDark,setisDark]=useState(document.querySelector('html').classList[0]=='dark')
    const {isAdmin,setIsAdmin}=useContext(AppContext)
    console.log(isAdmin)

    const [adminUser,setAdminUser] = useRecoilState(AdminAtom);
    const [normalUser,setNormalUser] = useRecoilState(UserAtom);
    const [user, setUser] = useState(null);
    const navigate=useNavigate()

    useEffect(() => {
      if (isAdmin) {
        setUser(adminUser);
      } else {
        setUser(normalUser);
      }
    }, [isAdmin, adminUser, normalUser]);
    console.log(user)

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
                <Link to={'/Aboutus'}>
                    <li className='p-2'>
                    About us
                </li>
                
            </Link>
            
            <Link to={`${user?isAdmin?"/admin/dasbboard":"/dashboard":"/home"}`}>
                <li className='p-2'>
                    {user?"Dashboard":"Pricing"}
                </li>
            
            </Link>


            {isAdmin?
            
            null  
            :
            <Link to={'/buyCourse'} >
                <li className='p-2'>
                    Courses
                </li>
            </Link>
            }

            <div  onClick={()=>{
                document.querySelector("html").classList.toggle("dark")
                setisDark(!isDark)
            }}
            className=' flex justify-between p-2 '>
                <div className=' dark:bg-slate-500 bg-amber-300/40 w-14 h-7 rounded-2xl border-1 hover:w-16 hover:h-8 hover:p-1 border-cyan-700   '>
                {(isDark)?
                    <div className='dark:pl-7 flex items-center h-full p-1 transform ease-in-out duration-300'>
                        <LightSvg  />
                    </div>
                    :
                    <div className=' flex items-center h-full p-1 transform ease-in-out duration-300'>
                        <DarkSvg/>
                    </div>
                }

                    
                </div>
            </div> 




            {
                user?
                    <button className='bg-[#0ABAB5] p-2 rounded-md'
                        onClick={()=>{
                            setOnSignup(true)
                            setAuthenticationMessage(null)
                            setUser(null)
                            if(isAdmin){
                                setAdminUser(null)
                                localStorage.removeItem('jwtAdmin')
                            }else{
                                setNormalUser(null)
                                localStorage.removeItem('jwt')
                            }
                            navigate("/admin/authentication")
                            
                        }}

                    >
                        Logout
                    </button>

                :

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

            }
              
        </div>
        

    </div>
    </div>
  )
}


const LightSvg=()=>{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:rotate-90 transform ease-in-out duration-200 ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>


        </div>
    )
}
const DarkSvg=()=>{
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" className="w-6 hover:rotate-50 transform ease-in-out duration-300">
              <path  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>

        </div>
    )
}




export default Navbar