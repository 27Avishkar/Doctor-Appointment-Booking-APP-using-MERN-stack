import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)


  useEffect(()=> {
    if (aToken) {
      getAllAppointments()
    }
  },[aToken])


  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='text-center mb-3 font-medium text-xl'>All Appointments</p>

        <div className='bg-white border border-gray-400 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-2xl shadow-neutral-500'>

          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b place-items-center'>
            <p>Sr. No.</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Actions</p>
          </div>

          {appointments.map((item,index) => (
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] place-items-center py-3 px-6 border-b hover:bg-gray-200'>

              <p className='max-sm:hidden'>{ index + 1}</p>

              <div className='flex items-center gap-2'>
                <img className='w-10 rounded-full' src={item.userData.image} alt="" /> <p>{item.userData.name}</p>
              </div>

              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

              <p> {slotDateFormat(item.slotDate)}, {item.slotTime}</p>

              <div className='flex items-center gap-2'>
                <img className='w-10 rounded-full bg-teal-200' src={item.docData.image} alt="" /> <p>{item.docData.name}</p>
              </div>

              <p>{currency}{item.amount}</p>

              {item.cancelled 
                ?
                  <p className='text-red-500 font-medium text-xs'>Cancelled</p>
                :
                item.isCompleted 
                ? 
                  <p className='text-green-500 font-medium text-xs'>Completed</p> 
                :
                <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer rounded-full shadow-2xl shadow-neutral-900 hover:scale-110' src={assets.cancel_icon} alt="cancel" />
              }
              
            </div>
          ))}

        </div>
    </div>
  )
}

export default AllAppointments