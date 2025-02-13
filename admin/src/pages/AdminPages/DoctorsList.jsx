import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {

  const { doctors, getAllDoctors, aToken, changeAvailability } = useContext(AdminContext);

  //if aToken change
  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  },[aToken])

  return (
    <div className='max-h-[90vh] m-5 overflow-y-scroll shadow-2xl'>
      <h1 className='text-center sm:text-xl md:text-2xl lg:text-3xl font-medium mt-2 mb-5'>All Doctors</h1>

      <div className='flex flex-wrap w-full gap-4 pt-5 gap-y-6 md:ml-16'>
        {
          doctors.map((item,index)=>(
            <div className='border border-gray-300 rounded-2xl max-w-56 overflow-hidden cursor-pointer group shadow-2xl shadow-neutral-500 mx-5 ml-5 mr-2 hover:scale-105 hover:shadow-lg transition-all duration-400' key={index}>
              <img className='bg-teal-200 rounded-2xl group-hover:bg-teal-300 transition-all duration-300' src={item.image} alt="" />

              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className=' text-gray-700 text-sm'>{item.speciality}</p>

                <div className='flex gap-2 text-sm'>
                  <input type="checkbox" checked={item.available} onChange={() => changeAvailability(item._id)}/>
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList