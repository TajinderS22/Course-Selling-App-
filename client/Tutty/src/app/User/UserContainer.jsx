
import React, {  useEffect, useState, } from 'react'
import { useRecoilValue } from 'recoil'
import { UserAtom } from '../../recoil/userAtom'
import axios from 'axios'
import CourseCard from '../../components/CourseCard'
import { AppContext } from '../../context/AppContext'
import Sidebar from '../Sidebar'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'
import { Link } from 'react-router'

const MainContent = () => {

    const [purchasedCourses,setPurchasedCourses]=useState()
    // const {open}=useContext(AppContext)
    
    useEffect(()=>{
        const getPurchasedCourses=async()=>{
            try {
                const jwt=localStorage.getItem('jwt')
                const response= await axios.get(SERVER_ADDRESS+'/user/purchases',{
                    headers :{
                        authorization: jwt
                    }
                })
                console.log(response?.data?.coursesData)
                if(response?.data?.coursesData.length!=0){
                    setPurchasedCourses(response?.data?.coursesData)
                }else{
                    setPurchasedCourses(false)
                }
            } catch (error) {
                console.log(error)
            }
        }
        getPurchasedCourses()

    },[])
    
    const user=useRecoilValue(UserAtom)

    if(purchasedCourses){
    return (
    <div className=' w-full max-w-[1920px] bg-[url("https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center h-96 '>
        
        <div className='dark:bg-slate-800  bg-slate-100  relative w-full min-h-[400px] h-fit  top-[200px] z-20  px-4 md:px-12 flex not-lg:flex-col not-lg:items-center'>
            <div className={`block md:hidden top-0   ${open&&"w-[30px] "} h-fit backdrop-blur-2xl bg-amber-200 rounded-2xl  pr-96  z-30`}>
                <Sidebar/>
            </div>
            <div className={`dark:bg-slate-600 bg-slate-300 shadow-lg  h-fit min-w-[200px] col-span-3 rounded-xl max-w-[250px] -translate-y-16  `}>
                
                <div className='flex flex-col  justify-around items-center p-4'>
                    <img className='w-28 mt-8 rounded-2xl my-2 font-bold text-4xl' src="https://images.pexels.com/photos/18932250/pexels-photo-18932250.jpeg" alt="profile image" />
                    <p className='dark:text-white'>{user.firstname+" "+user.lastname}</p>
                    <p className='dark:text-gray-100 my-1'>{user.email}</p>
                    <p className='dark:text-gray-100 my-1'>{user.mNumber || "Please update your profile"}</p>
                    <p className='dark:text-gray-100 my-4'>{user.location || "Please update your profile"}</p>

                </div>
            </div>
           
            <div className='col-span-9 lg:mt-14 no-lg:-translate-y-48 flex-1 md:ml-12 text-black dark:text-white'>

                <div className='pb-8'>
                    <p className='text-2xl'>Date and time </p>
                    <p className='text-4xl font-semibold'>Good morning, {user.firstname+" "+user.lastname}</p>
                </div>
                <div className='flex not-lg:flex-col items-center w-full flex-wrap i  '>
                    {purchasedCourses.map((course)=>{
                        return(
                            <CourseCard  key={course._id} data={course} />
                        )
                    })}
                </div>
                
                
            </div>
        </div>
        {/* <div className='  absolute  -top-[200px] max-w-[1920px]  bg-black z-0'>
            <img className='max-w-[1920px] w-full' src="https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background image" />
        </div> */}
    </div>
  )
}else{
    return(
    <div className=' w-full max-w-[1920px] bg-[url("https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-cover bg-center h-96 '>
        
        <div className='dark:bg-slate-800  bg-slate-100  relative w-full min-h-[400px] h-fit  top-[200px] z-20  px-4 md:px-12 flex not-lg:flex-col not-lg:items-center'>
            <div className={`block md:hidden top-0   ${open&&"w-[30px] "} h-fit backdrop-blur-2xl bg-amber-200 rounded-2xl  pr-96  z-30`}>
                <Sidebar/>
            </div>
            <div className={`dark:bg-slate-600 bg-slate-300 shadow-lg  h-fit min-w-[200px] col-span-3 rounded-xl max-w-[250px] -translate-y-16  `}>
                
                <div className='flex flex-col  justify-around items-center p-4'>
                    <img className='w-28 mt-8 rounded-2xl my-2 font-bold text-4xl' src="https://images.pexels.com/photos/18932250/pexels-photo-18932250.jpeg" alt="profile image" />
                    <p className='dark:text-white'>{user.firstname+" "+user.lastname}</p>
                    <p className='dark:text-gray-100 my-1'>{user.email}</p>
                    <p className='dark:text-gray-100 my-1'>{user.mNumber || "Please update your profile"}</p>
                    <p className='dark:text-gray-100 my-4'>{user.location || "Please update your profile"}</p>

                </div>
            </div>
           
            <div className='col-span-9 lg:mt-14 no-lg:-translate-y-48 flex-1 md:ml-12 text-black dark:text-white'>

                <div className='pb-8'>
                    <p className='text-2xl'>Date and time </p>
                    <p className='text-4xl font-semibold'>Good morning, {user.firstname+" "+user.lastname}</p>
                </div>
                <Link to={'/buyCourse'}>
                    <div className='flex not-lg:flex-col items-center w-full flex-wrap i  '>
                      Click Here to Buy courses of your Choice
                    </div>
                </Link>
                
                
            </div>
        </div>
        {/* <div className='  absolute  -top-[200px] max-w-[1920px]  bg-black z-0'>
            <img className='max-w-[1920px] w-full' src="https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="background image" />
        </div> */}
    </div>
    )

}


}


const WorkComp = ({time,task, status})=>{
    return(
        <div className='flex border-b-2 p-2  '>
            <div className='flex flex-col px-2 items-start w-fit border-r-2 min-w-[100px] text-xs  dark:border-zinc-300 border-zinc-800'>
                <div className='text-base  font-semibold'>
                    {time}
                </div>
                <p>
                    {time}
                </p>
            </div>
            <div className='w-full mx-2'>
                <div className='text-xs'>
                    {status}
                </div>
                <div className='text-lg font-bold'>
                    {task}
                </div>
            </div>
        </div>
    )
}


const DateBar=({Date})=>{
    return(
        <div className='bg-slate-600   sticky -top-20  mt-2 p-4'>
            <div className='flex justify-between  p-6 dark:bg-slate-500 bg-slate-400/70 rounded-lg py-2'>
            <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
            </svg>

            </div>
            <div className='w-full px-6'>
                {Date}
            </div>
            <div className='flex justify-between'>
                <div className='mx-6'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>

                </div>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>


                </div>

            </div>
        </div>
        </div>
    )
}



export default MainContent