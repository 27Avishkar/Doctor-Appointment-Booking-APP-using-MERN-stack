import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className='lg:pl-[122px] lg:pr-[122px] lg:justify-center md:mx-10'>

      <div className='text-center text-2xl pt-10 font-medium text-gray-600'>
        <p>ABOUT <span className='text-gray-700'>US</span></p>
      </div>

      <div className='flex flex-col md:flex-row gap-10 my-10 lg:justify-center'>
        <img className='w-full md:max-w-[360px] rounded-2xl shadow-2xl shadow-neutral-600' src={assets.about_image} alt="" />

        <div className='flex flex-col justify-center md:w-2/4 gap-5 text-sm text-gray-600 border border-gray-300 rounded-2xl px-4 md:py-2'>
          <p>At DocTime, we believe that healthcare should be simple, accessible, and efficient. Our platform is designed to connect patients with experienced and trusted doctors, making it easy to schedule appointments with just a few clicks. Whether you need a routine check-up or specialized medical consultation, DocTime ensures a hassle-free experience, allowing you to focus on what truly matters—your health.</p>

          <p>Our mission is to bridge the gap between healthcare professionals and patients by providing a seamless, secure, and user-friendly solution. With a strong commitment to quality care, we bring together expert doctors from various specializations, ensuring you receive the best medical attention when you need it the most. We prioritize reliability, efficiency, and convenience, making healthcare more accessible to everyone.</p>

          <p>Join us in revolutionizing the way healthcare works—because at DocTime, your well-being is our priority!</p>
        </div>
      </div>

      <div className='lg:pl-[122px] lg:pr-[122px] lg:justify-center'>
        <p className='text-xl my-4'>Why Choose Us?</p>

        <div className='flex flex-col gap-5 px-6 py-4'>
          <div>
            <p className='font-medium'>✅ Trusted & Experienced Doctors</p>
            <p className='px-8 lg:pr-44 text-sm mt-2'>At DocTime, we connect you with highly qualified and experienced doctors from various specialties, ensuring top-notch medical care tailored to your needs.</p>
          </div>

          <div>
            <p className='font-medium'>✅ Seamless Appointment Booking</p>
            <p className='px-8 lg:pr-44 text-sm mt-2'>Our user-friendly platform allows you to book appointments effortlessly, saving you time and eliminating long waiting hours at clinics.</p>
          </div>

          <div>
            <p className='font-medium'>✅ Secure & Reliable Healthcare</p>
            <p className='px-8 lg:pr-44 text-sm mt-2'>Your health and privacy are our top priorities. We provide a secure and reliable system to ensure confidential and hassle-free medical consultations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About