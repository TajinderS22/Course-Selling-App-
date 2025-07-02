import React from 'react'

const HomePageCategories = () => {
  return (
    <div>
        <p className='md:text-6xl text-4xl font-semibold w-11/12 mx-auto mt-14 mb-12' >
            🔍 Explore Our Categories
        </p> 
        <div className='md:w-10/12 w-11/12 mx-auto flex flex-col not-md:list-none md:right-8 relative'>   
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                Web Development
                </li>
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                Data Science & AI
                </li>
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                    Cloud & DevOps
                </li>
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                UI/UX Design
                </li>
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                Digital Marketing
                </li>
                <li className='text-2xl p-2 dark:bg-slate-700 bg-[#ADEED9] m-2 rounded-2xl px-6  ' >
                Business & Finance
                </li>
            
        </div>

    </div>
  )
}

export default HomePageCategories