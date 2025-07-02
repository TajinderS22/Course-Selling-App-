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
        <CourseCard data={data}/>
    </div>
    )
    }
  return(
    
    <div className='md:flex not-md:flex-col md:overflow-scroll overflow-y-auto h-fit pb-8  mx-auto mt-24 border-b-2 border-cyan-700 '>
      
      {allCourses.map((course)=>{
        return(
            <CourseCard data={course}/>

        )
      })}

    
    </div>

  )
}
export default Courses
