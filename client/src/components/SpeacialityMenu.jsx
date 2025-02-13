//import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpeacialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-17 text-gray-700'>
        <h1 className='text-3xl font-medium'>Find Your Specialist</h1>
        <p className='text-center text-sm sm:w-1/3'>Browse through out list of Trusted Doctors, schedule your appointment today!</p>

        <div className='flex gap-4 pt-5 w-full sm:justify-center overflow-scroll'>
            {specialityData.map((item, index) => (
                <Link onClick={() => scrollTo(0,0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-400' key={index} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt='' />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpeacialityMenu