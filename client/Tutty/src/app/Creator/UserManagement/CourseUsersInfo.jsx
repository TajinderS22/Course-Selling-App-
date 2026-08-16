import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { SERVER_ADDRESS } from '../../../Secrets/Secrets';
import axios from 'axios';
import useActiveSessionCreator from '../../../hooks/useActiveSessionCreator';
import { useState } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from "../../Sidebar";
import UserCard from './UserCard';


const CourseUsersInfo = () => {
    const { id: courseId } = useParams(); 

    const [users,setUsers]=useState(null)

    const {jwtCreator}=useActiveSessionCreator()

    const getAllUsersOfCourse= async()=>{
        const userIds=await axios.get(SERVER_ADDRESS+`/creator/course-userIds/${courseId}`,{ 
            headers:{
                authorization:jwtCreator
            }
        })

        if(userIds.data.userIds.length>=0){
            const users= await axios.post(SERVER_ADDRESS+"/creator/users-info",{
                userIds:userIds.data.userIds
            },{
                headers:{
                    authorization:jwtCreator
                }
            })

            setUsers(users.data.users);
        }
    }


    useEffect(()=>{
        getAllUsersOfCourse()
    },[])

return (
  <div className="min-h-[100svh] bg-app text-ink">
    <Navbar />
    <div className="flex min-h-svh">
      <Sidebar />
      <div className="h-full flex-1 overflow-y-auto pb-10 pt-20">
        <p className="font-display m-2 p-2 text-lg font-semibold">
          Users of the course
        </p>

        {users && users.length > 0 ? (
          <div className="m-2 w-full max-w-2xl md:m-4">
            {users.map((user) => {
              return <UserCard key={user._id} user={user} />;
            })}
          </div>
        ) : (
          <div className="card m-4 w-fit p-6 text-ink-soft">
            No users have purchased this course yet.
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default CourseUsersInfo