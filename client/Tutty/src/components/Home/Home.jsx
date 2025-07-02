import React,{useContext} from 'react'
import Navbar from '../Navbar'
import Courses from '../Courses'
import HomePageChooseUs from './HomePageChooseUs'
import HomePageCategories from './HomePageCategories'
import { Link } from 'react-router'
import { AppContext } from '../../context/AppContext'


const Home = () => {
    const {setOnSignup}=useContext(AppContext)
  return (
    <div className='mx-auto dark:bg-slate-800 dark:text-white bg-[#e8fffdcf] min-h-[100svh]'>
        
        <Navbar/>
        <div className='pb-6 flex not-md:flex-col-reverse justify-between mt-16'>
            <div className='mx-6 mt-8 max-w-[600px] xl:ml-32 pr-4'>
                <p className='md:text-4xl text-3xl font-bold max-w-[600px]'>
                    Shape Your Future with Expert-Led Courses
                </p>
                <p className='text-lg font-normal mt-6 md:max-w-[300px] '> 
                    Kickstart your career with 100+ high-quality, job-focused courses. Learn at your pace, anytime, anywhere.
                </p>
                <Link to='/authentication'>
                <button className='bg-[#0ABAB5] p-3 rounded-lg mt-6 ml-4' 
                    onClick={()=>{
                        setOnSignup(true)
                    }}
                >
                    Sign up
                </button>
                </Link>
            </div>

            <div>
                <img className='md:w-[600px] not-md:mx-auto w-96 md:rounded-l-4xl  not-md:rounded-2xl  ' src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg" alt=" Langing image top" />
            </div>
        </div>

        {/* Courses Preview */}
        <div className='text-center relative top-18 text-6xl font-semibold dark:bg-slate-700 dark:text-[#98faeba1] text-[#014442] bg-[#56DFCF]/40 p-6 md:rounded-[50%] rounded-[40%] mx-2 '>
            Browse All Courses
        </div>
        <Courses/>
        <HomePageChooseUs></HomePageChooseUs>
        <HomePageCategories/>
    </div>
  )
}

export default Home