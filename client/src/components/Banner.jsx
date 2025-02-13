// import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    
    const navigate = useNavigate();

  return (
    <div className='flex bg-teal-300 rounded-2xl px-6 lg:px-12 md:px-14 sm:px-10 my-20 md:mx-10 shadow-neutral-600 shadow-2xl hover:shadow-lg'>
        {/*  Left Side */}
        <div className='flex-1 py-8 lg:py-24 md:py-16 sm:py-10 lg:pl-5'>
            <div className='text-xl lg:text-5xl md:text-3xl sm:text-2xl font-semibold text-white'>
                <p>Book Appointment</p>

                <p className='mt-4'>With Trusted Doctors</p>
            </div>

            <button onClick={()=> {navigate('/login'); scrollTo(0,0)}} className="bg-amber-500 text-white sm:text-base lg:mt-10 md:mt-7 sm:mt-7 px-8 py-3 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-2xl hover:shadow-lg hover:scale-105 transition-all duration-400">Create Account</button>
        </div>


        {/*  Right Side */}
        <div className='hidden md:block md:w-1/2 lg:w-95 relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt='' />
        </div>
    </div>
  )
}

export default Banner