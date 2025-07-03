import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useRecoilState} from 'recoil'
import { UserAtom } from '../recoil/userAtom'
import CourseCard from './CourseCard'
import CardShimmer from './CardShimmer'
import { SERVER_ADDRESS } from '../Secrets/Secrets'
import { AppContext } from '../context/AppContext'


const BuyCourse = () => {
    const jwt=localStorage.getItem('jwt');
    const navigate=useNavigate()
    const [user,setUser]=useRecoilState(UserAtom)
    const [courses,setCourses]=useState("")
    const {isAdmin}=useContext(AppContext)

    const getAllCourses=async()=>{
        const response=await axios.get(SERVER_ADDRESS+"/course/preview")
        setCourses(response?.data?.courses);
        
    }

    const ifSessionActive=async()=>{
        try {
            const response= await axios.post(SERVER_ADDRESS+"/user/verify",{},{
                headers:{
                    authorization:jwt
                }
            })
            
            const user=response.data.user
            if(response.status==200){
                setUser(user)
            }else{
                setUser(false)
            navigate('/authentication')
            }


        } catch (error) {
            console.log(error)
            setUser(false)
            navigate('/authentication')
        }
    }
    

    useEffect(()=>{
        if(jwt){
            if(isAdmin){
                navigate("/admin/Authentication")
            }
            if (!user && jwt) {
                ifSessionActive()
            }
            getAllCourses()
        }else{
            navigate('/authentication')
        }    
    },[user,jwt])

  return (
    <div className='dark:bg-slate-800 pb-6'>
        <Navbar></Navbar>
        
        {courses?
            <div className='h-fit min-h-[800px] p-6 dark:bg-slate-800 dark:text-amber-50 bg-[#ADEED9]/30 ' >
                <p className='text-2xl lg:text-3xl font-semibold dark:text-amber-100 text-teal-900 mx-auto w-11/12 m-6 mb-0' >Buy from wide Range of courses covering all the fields.</p>
                <div className='flex flex-wrap  md:w-11/12 justify-around md:px-14 mx-auto'>
                    {courses.map((x)=>{
                        return(
                            <CourseCard key={x._id} data={x}/>
                        )
                    })}
    
                    
                </div>
            </div>
        :
            <div className='h-fit min-h-[800px] bg-[#ADEED9]/30  mx-auto ' >
                <div className='flex flex-wrap justify-around w-10/12 mx-auto'>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                    <CardShimmer/>
                </div>
            </div>
        }
    </div>
  )
}

export default BuyCourse