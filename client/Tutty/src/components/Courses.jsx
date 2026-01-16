/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import CourseCard from './CourseCard';
import { SERVER_ADDRESS } from '../Secrets/Secrets';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';

const Courses = () => {
  const [allCourses,setAllCourses]=useState(null);
  useEffect(()=>{
    try {
        const getAllCourses=async()=>{
            const response= await axios.get(SERVER_ADDRESS+"/course/preview")
            const courses=(response.data.courses)
            setAllCourses(courses.slice(0, 3));
            // setAllCourses(response.data.courses)
        }
        getAllCourses()

    } catch (error) {
        console.error("couldn't get courses ",error)
    }
  },[])

  const navigate=useNavigate()

  if(!allCourses){
    const data={_id:"1",}
    return (
      <div className="md:flex flex-wrap max-h-[1000px] w-11/12 justify-center not-md:flex-col not-md:items-center overflow-scroll h-fit pb-8  mx-auto mt-24 border-b-2 border-cyan-700 not-md:max-h-[1320px] not-md:overflow-clip ">
        <Loader2 className="animate-spin w-12 h-12" />
      </div>
    );
    }
  return(
    
    <div 
    
    className='md:flex flex-wrap max-h-[1000px] w-11/12 justify-center not-md:flex-col not-md:items-center overflow-scroll h-fit pb-8  mx-auto mt-24 border-b-2 border-cyan-700 not-md:max-h-[1320px] not-md:overflow-clip '>
      
      {allCourses.map((course,index)=>{
        return(
            <div key={index} onClick={()=>{
              navigate(`/buyCourse`)
            }} className='hover:scale-105 hover:mx-2 transform duration-200'>
              <CourseCard data={course}/>
            </div>

        )
      })}

    
    </div>

  )
}
export default Courses
