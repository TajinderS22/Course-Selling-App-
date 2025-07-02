import React from 'react'
import Navbar from './Navbar'
const AboutUs = () => {
  return (
    <div >
        <Navbar></Navbar>
        <div className=' pb-6 min-h-[94svh] h-fit  dark:bg-slate-800 dark:text-white bg-[#e8fffdcf]  '>
          <div className='mx-auto w-11/12 pt-6 '>
            <div className='bg-amber-200/20  rounded-2xl  hover:shadow-sm shadow-cyan-500 p-6 pb-4 hover:p-8 hover:pb-6  transform ease-in-out duration-300'>
              <p className='text-4xl font-bold pt-6'>
                📘 About Us | Tutty
              </p>
              <p className=' font font-medium m-4'>
                Welcome to Tutty — Your Gateway to Smarter Learning.
              </p>

              <div className=' font-medium md:text-2xl text-lg md:w-10/12 m-4 mt-8'>
                At Tutty, we're on a mission to make high-quality education accessible, affordable, and engaging for every learner. Whether you're a student preparing for competitive exams, a professional upgrading your skills, or someone curious to learn something new — Tutty is here to support your journey
              </div>

            </div>
            <div className=' mt-12 bg-[#FFA725]/30 p-6 pb-4 hover:p-8 hover:pb-6  transform ease-in-out duration-300 rounded-2xl hover:shadow-sm shadow-[#0ABAB5] '>
              <p className='text-4xl font-bold'>
                🎯 What We Do
              </p>
              <p className='md:w-10/12 m-4 font-medium'>
                Tutty is a modern learning platform designed to bridge the gap between expert instructors and motivated learners. We offer:
              </p>
              <ul className='list-none m-4'>
                <li className=' m-2 text-lg  '>
                  <span className='font-bold' >🎓 Expert-led courses</span> in technology, business, personal development, and more
                </li>
                <li className=' m-2 text-lg  '>
                  <span className='font-bold'>🧠 Bite-sized lessons</span> to fit your busy schedule
                </li>
                <li className=' m-2 text-lg '>
                  📱 A clean, mobile-first experience — learn anywhere, anytime
                </li>
                <li className=' m-2 text-lg  '>
                 <span className='font-bold'>  🛒 Simple purchasing & lifetime</span> access to your courses
                </li>
                <li className=' m-2 text-lg  '>
                  ✅ Secure authentication and personalized dashboard
                </li>
              </ul>
            </div>

            <div className=' mt-12 bg-[#FF8282]/30 p-6 pb-4 hover:p-8 hover:pb-6 transform ease-in-out duration-300 rounded-2xl hover:shadow-sm shadow-[#0ABAB5] '>
              <p className='text-4xl font-bold'>
              💡 Why Tutty?
              </p>
              
              <ul className='list-none m-4'>
                <li className=' m-2 text-lg  '>
                <span className='font-bold'>Built for learners</span> by a team who understands how education should work
                </li>
                <li className=' m-2 text-lg  '>
                  <span className='font-bold'>Seamless user experience</span> — fast, intuitive, and clutter-free
                </li>
                <li className=' m-2 text-lg  '>
                  <span className='font-bold'>Community-first:</span> We're not just a platform, we're a tribe of learners
                </li>
                <li className=' m-2 text-lg  '>
                  <span className='font-bold'>No fluff. Just value.</span> Your time and attention matter to us
                </li>
              </ul>
            </div>

            <div className=' mt-12 bg-[#003092]/30 p-6 pb-4 hover:p-8 hover:pb-6 transform ease-in-out duration-300 rounded-2xl hover:shadow-sm shadow-[#0ABAB5] ' >
              <p className='text-4xl font-bold m-2'>🔐 Trusted & Secure</p>
              <p className='font-medium md:text-2xl text-lg w-11/12 m-6'>Tutty uses industry-standard security protocols to ensure your personal data and learning progress are safe. Your trust is everything.</p>
            </div>

          </div>

        </div>
    </div>
    
  )
}

export default AboutUs