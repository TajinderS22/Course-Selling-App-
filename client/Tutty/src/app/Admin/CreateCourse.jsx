/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import { useRecoilState } from 'recoil'
import { AdminAtom } from '../../recoil/adminAtom'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'
import { AppContext } from '../../context/AppContext'

const CreateCourse = () => {
    const [user,setUser]=useRecoilState(AdminAtom)
    const navigate=useNavigate()
    const {setIsAdmin}=useContext(AppContext)

    const jwt=localStorage.getItem('jwtAdmin')


    const [image,setImage]=useState(null)
    const [file,setfile]=useState()
    const [isImageUploading,setisImageUploading]=useState(false)
    const [imageUrl,setImageUrl]=useState('')
    const [imageUploaded,setImageUploaded]=useState(false)

    const titleRef=useRef()
    const descriptionRef=useRef()
    const priceRef=useRef()

    const imageRef=useRef()


    const createCourseSubmit=async()=>{
      const title=titleRef?.current?.value
      const description=descriptionRef?.current?.value
      const price=priceRef?.current?.value
      


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
            setIsAdmin(true)
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
    

      const handleImagUpload = async () => {
        if (!imageRef.current) return alert("Please select an image");
      
        const reader = new FileReader();
        const image = imageRef.current;
      
        reader.readAsDataURL(image);
      
        reader.onloadend = async () => {
          const base64Image = reader.result;
          setfile(base64Image);
          try {
            const response = await axios.post(
              SERVER_ADDRESS + '/course/image/upload',
              { image: base64Image },
              {
                headers: {
                  authorization: jwt
                }
              }
            );
      
            if (response.status === 200) {
              setImageUploaded(true);
              setImageUrl(response.data)
            }
      
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        reader.onerror = () => {
          alert("Failed to read file");
        };
      };

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
                            <div className='min-w-[300px] max-w-[500px] flex not-md:flex-col '>
                                <p className="top-" htmlFor="img">Image : </p>
                                <div className={`bg-blue-400/30  h-fit m-2 md:w-[75%] p-[4px] not-md:w-[95%]  rounded-2xl`} >
                                  <input required  type="file" accept='image/*'  name='img'className={`bg-blue-400/60  ${file?'h-[30%]':"h-[70%]"} p-3 rounded-xl w-full`}
                                    onChange={async (e)=>{
                                      const imageFile=(e.target.files[0])
                                      imageRef.current=imageFile
                                      setImage(imageFile)
                                    }}

                                  />
                                  {
                                    imageUploaded?
                                    <div className='p-2'>
                                      <img src={file} alt="Thumbnail uploaded by admin" className='rounded-sm' />
                                    </div>
                                    :
                                    <div className='p-2'>
                                    {isImageUploading?
                                      "Uploading..."  
                                      :
                                      null
                                    }
                                    </div>

                                  }
                                  <div className='flex justify-end'>
                                    <button 
                                      onClick={()=>{
                                        setisImageUploading(true)
                                        if(image){
                                          handleImagUpload()
                                        }else{
                                          alert("Please upload the image")
                                        }
                                      }}

                                      className='ring-1 hover:shadow-sm md:bg-transparent bg-gray-300 shadow-amber-400 ring-blue-800 rounded-lg p-1 my-1 mr-4  w-28 '
                                    >
                                      {file?"Change": "Upload"}
                                    </button>
                                  </div>
                                </div>
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