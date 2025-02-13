import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {

    const {aToken} = useContext(AdminContext);
    const {dToken} = useContext(DoctorContext);
  return (
    <div className='bg-white min-h-screen border-right p-1'>
        {
            aToken && <ul className='text-gray-600 mt-5'>

                <NavLink to={'/admin-dashboard'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400 hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-4 rounded-l-2xl' : ''}`}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink to={'/all-appointments'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 mt-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400
                hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-5 rounded-l-2xl' : ''}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink to={'/add-doctor'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 mt-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400
                hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-5 rounded-l-2xl' : ''}`}>
                    <img src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>

                <NavLink to={'/doctor-list'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 mt-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400 hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-5 rounded-l-2xl' : ''}`}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
            </ul>
        }

{
            dToken && <ul className='text-gray-600 mt-5'>

                <NavLink to={'/doctor-dashboard'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400 hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-4 rounded-l-2xl' : ''}`}>
                    <img src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink to={'/doctor-appointments'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 mt-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400
                hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-5 rounded-l-2xl' : ''}`}>
                    <img src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink to={'/doctor-profile'} className={({isActive}) =>`flex items-center gap-4 font-medium md:min-w-72 py-3.5 px-3 mt-3 md:px-9 cursor-pointer rounded-l-2xl shadow-xl shadow-neutral-400
                hover:scale-105 hover:shadow-2xs hover:bg-teal-200 hover:border-r-5 hover:border-r-green-400 ${isActive ? 'bg-teal-200 border-green-400 border-r-5 rounded-l-2xl' : ''}`}>
                    <img src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>

                
            </ul>
        }
    </div>
  )
}

export default Sidebar