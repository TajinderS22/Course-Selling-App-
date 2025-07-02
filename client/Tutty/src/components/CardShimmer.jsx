import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const CardShimmer = ({data}) => {
    console.log(data)
    const {isAdmin}=useContext(AppContext)
  return (
    <div  className='  bg-[#56DFCF]/40  min-w-[350px] flex flex-col  justify-between  mt-14 min-h-[250px] h-fit max-h-[800px] rounded-xl m-2 p-2 shadow-xl shadow-[#024240]   '>
    
        <img className='  w-11/12 rounded-t-xl mx-auto max-w-[400px] max-h-[300px]' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Course Image" />
        <div className='  text-xl font-semibold mx-3 '>
            
        </div>
        <p className='   mx-3  bg-slate-300 h-6 rounded-2xl '>
              
        </p>
        <p className="  text-xl font-bold mt-4 mx-3  bg-slate-300 h-6 rounded-2xl">
            
        </p>
        {!isAdmin?
            <div  className='  flex w-full justify-between p-2 px-6 ' >
                <button className='    w-[40%] p-2  bg-slate-300 h-6 rounded-2xl ' 
                    onClick={()=>{
                        
                    }}
                >
                    
                </button>
                <button className='  bg-[#c1caca]/80 w-[40%] p-2 h-6 rounded-2xl ' >
                    
                </button>
            </div>
        :
            <div  className='  flex w-full justify-between p-2 px-6' >
                <button className='  bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ' >
                    Edit
                </button>
                <button className='  bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl ' >
                    More Details
                </button>
            </div>

        }
    
    </div>
  )
}

export default CardShimmer