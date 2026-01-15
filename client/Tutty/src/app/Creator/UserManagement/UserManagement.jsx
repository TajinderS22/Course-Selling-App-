/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Sidebar from "../../Sidebar"
import Navbar from "../../../components/Navbar"
import useActiveSessionCreator from '../../../hooks/useActiveSessionCreator'
import { SERVER_ADDRESS } from '../../../Secrets/Secrets'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Loading from '../../../components/Loading'
import { useNavigate } from 'react-router'
import CourseCard from './CourseCard'

const UserManagement = () => {

    const [courses,setCourses]=useState(null)

    const {loading,jwtCreator}=useActiveSessionCreator()

    const creator=useSelector(state=>state.creator)


    const getAllCoursesOfCreator=async()=>{
        const res=await axios.get(SERVER_ADDRESS+"/creator/courses",{
            headers:{
                authorization:jwtCreator
            }
        })
        setCourses(res.data.courses)
    }


    useEffect(()=>{
        if(creator){
            getAllCoursesOfCreator()
        }
    },[creator])


    if(loading){
        return(
            <div className='h-[90svh] mx-auto'>
                <Loading/>
            </div>
        )
    }
  return (
    <div className='min-h-[90svh] dark:bg-slate-800 dark:text-white'>
      <Navbar></Navbar>
      <div className="flex h-[calc(100svh)] overflow-scroll ">
        <Sidebar />
        {/* Actual logic and display here  */}
        <div className="flex-1 min-h-[calc(90svh-10px)] overflow-scroll not-dark:bg-white/50">
          <div className="md:ml-8 m-4 mb-0 flex  gap-1  ">
            <p className="text-lg font-medium">
              Hi {creator?.firstname} {creator?.lastname}
            </p>
            <p className="text-lg font-medium">
              selcet your course to see info
            </p>
          </div>
            {/* Courses card */}
            {
                courses && (
                    <div>
                        {courses.map((course)=>{
                            return (
                              <CourseCard course={course}/>
                            );
                        })}
                    </div>
                )
            }
        </div>
      </div>
    </div>
  );
}

export default UserManagement