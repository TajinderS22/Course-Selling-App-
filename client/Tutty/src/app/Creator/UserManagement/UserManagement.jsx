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


    if (loading) {
    return (
      <div className="mx-auto h-[90svh]">
        <Loading />
      </div>
    );
  }
  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar></Navbar>
      <div className="flex min-h-svh">
        <Sidebar />
        {/* Actual logic and display here */}
        <div className="min-h-[90svh] flex-1 overflow-y-auto pb-10 pt-20">
          <div className="m-4 mb-0 flex flex-wrap gap-1 md:ml-8">
            <p className="font-display text-lg font-semibold">
              Hi {creator?.firstname} {creator?.lastname}
            </p>
            <p className="text-lg text-ink-soft">
              — select your course to see info
            </p>
          </div>
          {/* Courses card */}
          {courses && (
            <div className="mt-4">
              {courses.map((course) => {
                return <CourseCard key={course._id} course={course} />;
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserManagement