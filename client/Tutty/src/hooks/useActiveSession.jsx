/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser, setUser } from '../store/slices/userSlice'
import {setUserCourses} from '../store/slices/userCourses'
import { SERVER_ADDRESS } from '../Secrets/Secrets'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { useState } from 'react'

const useActiveSession = () => {
    const user=useSelector(state=>state.user) 
    const dispatch=useDispatch()
    const pathname=useLocation().pathname
    const jwt=localStorage.getItem("jwt");
    const navigate=useNavigate()
    // eslint-disable-next-line no-unused-vars
    const [loading,setLoading]=useState(true)
    const userCourses=useSelector(state=>state.userCourses)

    if(jwt){
      localStorage.removeItem("jwtCreator")
    }


    const getAllCoursesOfUser=async()=>{
      const courses= await axios.get(SERVER_ADDRESS+"/user/courses",{
        headers:{
          authorization:jwt
        }
      })
      dispatch(setUserCourses(courses.data.courses))
    }

    

    const ifSessionActive = async () => {
        try {
          const response = await axios.post(
            SERVER_ADDRESS + "/user/verify",
            {},
            {
              headers: {
                authorization: jwt,
              },
            }
          );
          const user = response.data.user;

    
          if (response.status === 200) {
            dispatch(setUser(user));
          } else {
            dispatch(clearUser());
            navigate("/authentication");
          }
        } catch (err) {
          console.error("Session check failed:", err);
          dispatch(clearUser());
          navigate("/authentication");
        } finally{
            setLoading(false)
        }
      };

    useEffect(()=>{
        if (!user && jwt) {
          ifSessionActive()
        } else if (!jwt && pathname!=="/") {
          dispatch(clearUser());
          navigate("/authentication")
        } else if (user) {
           if(!userCourses){
            getAllCoursesOfUser()
           }
          setLoading(false)
        }

    },[user,jwt])


    return {loading,jwt,setLoading}

}

export default useActiveSession