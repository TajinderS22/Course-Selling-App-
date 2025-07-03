import React, { useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import { useRecoilState } from 'recoil'
import { AdminAtom } from '../../recoil/adminAtom'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'

const CreateCourse = () => {
    const [user,setUser]=useRecoilState(AdminAtom)
    const navigate=useNavigate()

    const jwt=localStorage.getItem('jwtAdmin')
    
    const titleRef=useRef()
    const descriptionRef=useRef()
    const priceRef=useRef()
    const imageUrlRef=useRef()


    const createCourseSubmit=async()=>{
      const title=titleRef?.current?.value
      const description=descriptionRef?.current?.value
      const price=priceRef?.current?.value
      const imageUrl=imageUrlRef?.current?.value


      const data={
        title,description,price,imageUrl

      }
      const response=await axios.post(SERVER_ADDRESS+"/admin/course",data,{
        headers:{
          authorization:jwt
        }
      })
      if(response.status ==200){
        alert(response?.data?.message)
        navigate("/admin/dashboard")
      }else{
        alert(response?.data?.message)
      }
    }


    
    const ifSessionActive = async () => {
        try {
          const response = await axios.post(SERVER_ADDRESS+"/admin/verify", {}, {
            headers: {
              authorization: jwt
            }
          })
          const user=response?.data?.user
    
          if (response.status === 200) {
            setUser(user)
          } else {
            setUser(false)
            navigate('/admin/authentication')
          }
        } catch (err) {
          console.error("Session check failed:", err)
          setUser(false)
          navigate('/admin/authentication')
        }
      }
    
      useEffect(() => {
        if (!user && jwt) {
          ifSessionActive()
        } else if (!jwt) {
          navigate('/admin/authentication')
        }
      }, [user, jwt])
  return (
    <div>
        <Navbar/>
        <div className='h-fit min-h-[96svh] bg-[#ADEED9]/40 pb-6 '>
            <div className=' max-w-[1080px] mx-auto p-4 pt-12  '>
                <div className='text-4xl font-semibold'>
                    Hi {user.firstname+" " +user.lastname}
                </div>
                <div className='text-xl mt-4 text-amber-700'>
                    Please fill all the details of your course
                </div>
                {/* input   form  */}
                <div className=' mt-12'>
                    <div className='flex flex-col items-center'>
                        <div className='flex not-md:flex-col justify-center mx-auto w-full'>
                        <div className='flex flex-col mx-2'>
                            <div className='min-w-[300px] flex justify-between flex-col md:block '>
                                <label htmlFor="title">Title : </label>
                                <input required ref={titleRef} type="text" name='title' placeholder='title' className='bg-blue-400/30 p-2 m-2 md:w-[80%] rounded-2xl' />
                            </div>
                            <div className='min-w-[300px] flex justify-between  flex-col md:block '>
                                <label htmlFor="description">Discription : </label>
                                <input required ref={descriptionRef} type="text" name='description' placeholder='description' className='bg-blue-400/30 p-2 m-2  md:w-[66%] rounded-2xl' />
                            </div>
                        </div>
                        <div className='flex flex-col mx-2'>
                        <div className='min-w-[300px] flex justify-between flex-col md:block '>
                                <label htmlFor="price">Price : </label>
                                <input required ref={priceRef} type="text" name='price' placeholder='price' className='bg-blue-400/30 p-2 m-2 md:w-[78%]  rounded-2xl' />
                            </div>
                            <div className='min-w-[300px] flex justify-between flex-col md:block '>
                                <label htmlFor="imgUrl">ImageUrl : </label>
                                <input required ref={imageUrlRef} type="text" name='imgUrl' placeholder='imgUrl' className='bg-blue-400/30 p-2 m-2 md:w-[70%]  rounded-2xl' />
                            </div>
                        </div>
                        </div>
                        <button
                            className='bg-blue-400/60 p-3 rounded-lg m-2 mt-6 min-w-[100px] md:translate-x-64'
                            onClick={()=>{
                              createCourseSubmit()
                            }}
                        >
                            Submit
                        </button>
                        
                    </div>
                    
                    

                </div>
            </div>


        </div>
    </div>
  )
}

export default CreateCourse