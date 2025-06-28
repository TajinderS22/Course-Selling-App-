import React from 'react'

const CourseCard = ({data}) => {
    console.log(data)
  return (
    <div key={data._id} className='bg-[#56DFCF]/40  min-w-[350px] flex flex-col  justify-between  mt-14 min-h-[250px] h-fit max-h-[800px] rounded-xl m-2 p-2 shadow-xl shadow-[#024240]   '>
    
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
        <div  className='flex w-full justify-between p-2 px-6' >
            <button className='bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ' >
                Buy Now
            </button>
            <button className='bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl ' >
                More Details
            </button>
        </div>
    
    </div>
  )
}

export default CourseCard