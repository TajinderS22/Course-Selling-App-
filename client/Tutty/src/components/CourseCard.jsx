import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router'

const CourseCard = ({data}) => {
    // console.log(data)
    const {isAdmin}=useContext(AppContext)
    const navigate=useNavigate()
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
  return (
    <div key={data._id} className='bg-[#56DFCF]/40 dark:bg-slate-950/30 min-w-[300px] flex flex-col  justify-between  mt-14 min-h-[250px] h-fit max-h-[800px] rounded-xl m-2 p-2 shadow-xl shadow-[#024240]   '>
    
        <img className='w-11/12 rounded-t-xl mx-auto max-w-[400px]' src="https://res.cloudinary.com/dcpz5001o/image/upload/v1721051183/mohammad-rahmani-oXlXu2qukGE-unsplash_aufok0.jpg" alt="Course Image" />
        <div className='text-xl font-semibold mx-3 '>
            {data.title}
        </div>
        <p className=' mx-3 '>
            {data.description}  
        </p>
        <p className="text-xl font-bold mt-4 mx-3">
            {data.price}
        </p>
        {!isAdmin?
            <div  className='flex w-full justify-between p-2 px-6' >
                <button className='bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ' 
                    onClick={()=>{
                        buyCourse()
                    }}
                >
                    Buy Now
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