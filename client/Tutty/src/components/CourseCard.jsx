/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import {useRecoilValue} from 'recoil'
import {UserAtom} from "../recoil/userAtom"

const CourseCard = ({data}) => {
    // console.log(data)
    const {isAdmin}=useContext(AppContext)
    const navigate=useNavigate()

    const location = useLocation();
    const currentPagePath = location.pathname; // e.g., "/products", "/about"
    
    const user= useRecoilValue(UserAtom)

    const [imageUrl,setImageUrl]=useState("https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg")


    const buyCourse=async ()=>{
        const courseId =data._id
        const jwt=localStorage.getItem('jwt')
        // console.log(jwt)
        try {
            const response= await axios.post('http://192.168.1.7:3000/course/purchase',{courseId},{
                headers:{
                    authorization: jwt
                }
            })
            
            alert(response?.data?.message)
            if(response?.data?.message=='course already purchased'){
                return
            }
            navigate("/dashboard")
        } catch (error) {
            console.log(error)
        }    
    }

    useEffect(
        ()=>{
            if(data?.imageUrl&&data.imageUrl.includes('https://')){
                setImageUrl(data?.imageUrl)
                console.log(imageUrl)
            }
        },
        [imageUrl]
    )


  return (
    <div key={data._id} className='bg-[#56DFCF]/40 dark:bg-slate-950/30 md:min-w-[350px] max-w-[416px] min-w-[200px] flex flex-col  justify-between  mt-14 min-h-[250px] h-fit max-h-[800px] rounded-xl m-2 p-2 hover:shadow-2xl hover:scale-102 transform ease-in-out duration-300 shadow-[#024240] dark:shadow-amber-200/30 ring ring-slate-600/40 dark:ring-[#56dfcf]/40       '>
    
        <img className='w-11/12 rounded-t-xl mx-auto max-w-[400px]' loading='lazy' src={imageUrl} alt="Course Image" />
        <div className='text-xl font-semibold mx-3 '>
            {data.title}
        </div>
        <p className=' mx-3 overflow-hidden max-w-[350px] ml-4 max-h-[500px] '>
            {data.description}  
        </p>
        <p className="text-xl font-bold mt-4 mx-3">
            {data.price}
        </p>
        {!isAdmin?
            <div  className='flex w-full justify-between p-2 px-6 ' >
                <button className='bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ' 
                    onClick={()=>{
                        if(currentPagePath=='/'){
                            return navigate('/authentication')
                        }else{
                            buyCourse()
                        }
                    }}
                >
                    {user?"Start Learning":"Buy Now"}
                </button>
                <button className='bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl ' >
                    More Details
                </button>
            </div>
        :
            <div  className='flex w-full justify-between p-2 px-6' >
                <button className='bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ' >
                    Edit
                </button>
                <button className='bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl ' >
                    More Details
                </button>
            </div>

        }
    
    </div>
  )
}

export default CourseCard