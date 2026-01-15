import React from 'react'
import Navbar from '../Navbar'
import Courses from '../Courses'
import HomePageChooseUs from './HomePageChooseUs'
import HomePageCategories from './HomePageCategories'
import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext'


const Home = () => {

  return (
    <div className='mx-auto dark:bg-slate-800  dark:text-white bg-[#e8fffdcf] min-h-[100svh]'>
        
        <Navbar/>
        <div className='pb-6 w-11/12 flex not-md:flex-col-reverse justify-between mt-16'>
            <div className='mx-6 mt-8 max-w-[600px] flex-1 xl:ml-32 pr-4'>
                <p className='md:text-6xl text-4xl font-bold  w-full'>
                    Shape Your Future with Expert-Led Courses
                </p>
                <p className='text-lg font-normal mt-6 w-[80%] ml-4 '> 
                    Kickstart your career with 100+ high-quality, job-focused courses. Learn at your pace, anytime, anywhere.
                </p>
                <Link to='/authentication'>
                <button className='bg-[#0ABAB5] p-3 rounded-lg mt-10 ml-4' 
                
                >
                    Start your Journey
                </button>
                </Link>
            </div>

            <div>
                <img className='not-lg:w-[300px] lg:w-[400px] xl:w-[600px] not-md:mx-auto w-96 md:rounded-l-4xl  not-md:rounded-2xl  ' src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg" alt=" Langing image top" />
            </div>
        </div>

        {/* Courses Preview */}
        <div className='text-center w-11/12 mx-auto relative top-18 text-6xl font-semibold dark:bg-teal-300/20 dark:text-[#98faeba1] text-[#014442] bg-[#56DFCF]/40 p-6 md:rounded-[50px] dark:border border-teal-200/80 rounded-2xl backdrop-blur-3xl   '>
            Browse All Courses
        </div>
        <Courses/>
        <HomePageChooseUs></HomePageChooseUs>
        <HomePageCategories/>
    </div>
  )
}

export default Home