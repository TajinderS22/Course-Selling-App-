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
    <div className='min-h-[90svh] dark:bg-slate-800 dark:text-white '>
        <Navbar/>
        <div className='flex h-svh overflow-scroll '>
            <Sidebar/>
            <div className='not-dark:bg-white/50 h-full overflow-scroll  flex-1'>    
                <p className='p-2 m-2 text-lg font-medium '>
                    Users of the course
                </p>

                {users &&(
                    <div className='w-9/12 m-4'>
                        {users.map((user)=>{
                            return(
                                <UserCard user={user}/>
                            )
                        })}
                    </div>
                )}

            </div>
        </div>
    </div>
  )
}

export default CourseUsersInfo