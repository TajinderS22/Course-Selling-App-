/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import { SERVER_ADDRESS } from '../Secrets/Secrets';

const Courses = () => {
  const [allCourses,setAllCourses]=useState(null);
  useEffect(()=>{
    try {
        const getAllCourses=async()=>{
            const response= await axios.get(SERVER_ADDRESS+"/course/preview")
            setAllCourses(response.data.courses)
        }
        getAllCourses()

    } catch (error) {
        console.error("couldn't get courses ",error)
    }
  },[])

  if(!allCourses){
    const data={_id:"1",}
    return(
    <div>  
        <CourseCard k={1} data={data}/>
    </div>
    )
    }
  return(
    
    <div className='md:flex  not-md:flex-col not-md:items-center overflow-scroll h-fit pb-8  mx-auto mt-24 border-b-2 border-cyan-700 not-md:max-h-[1320px] not-md:overflow-clip '>
      
      {allCourses.map((course)=>{
        return(
            <div className='hover:scale-115 hover:mx-12 transform duration-300'>
              <CourseCard data={course}/>
            </div>

        )
      })}

    
    </div>

  )
}
export default Courses
