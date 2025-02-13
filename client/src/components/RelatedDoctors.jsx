import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({speciality, docId}) => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const [relateDoc, setRelateDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);

            setRelateDoc(doctorsData);
        }
    }, [doctors, speciality, docId])
  return (
    <div className='flex flex-col items-center text-gray-700 gap-4 my-16 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='text-center text-sm sm:w-1/3'>Browse through our extensive list of Trusted Doctors</p>

        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5 pt-5 gap-y-6 px-3 sm:px-0 items-center lg:grid-cols-[repeat(auto-fill,minmax(300px,0fr))] lg:justify-center lg:pl-[240px] lg:pr-[240px]'>
            {relateDoc.slice(0,5).map((item, index)=>(
                <div onClick={() => {navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='rounded-2xl overflow-hidden cursor-pointer hover:translate-y-[-5px] shadow-neutral-400 shadow-2xl hover:shadow-xl hover:border-sky-800 transition-all duration-400'>
                    <img className='bg-teal-300 rounded-2xl' src={item.image} alt='' />
                    <div className='p-4'>
                    <div className={`flex items-center text-sm text-center  gap-2 ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                            <p className={`w-2 h-2 ${item.available ? ' bg-green-500' : 'bg-red-500'} rounded-full hover:scale-110 transition-all duration-300`}></p> <p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-gray-700 text-lg font-medium hover:text-gray-900 transition-all duration-300'>{item.name}</p>
                        <p className='text-gray-500 text-sm hover:text-gray-800 transition-all duration-300'>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={() =>{ navigate('/doctors'); scrollTo(0,0)}} className='text-white bg-blue-400 rounded-full px-12 py-3 mt-10 font-semibold cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-300'>more</button>
    </div>
  )
}

export default RelatedDoctors