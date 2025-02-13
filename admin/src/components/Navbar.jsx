import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'


const Navbar = () => {
    
    const navigate = useNavigate()
    const {aToken,setAToken} = useContext(AdminContext);
    const {dToken,setDToken} = useContext(DoctorContext);
    

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex bg-white justify-between items-center px-4 sm:px-10 py-3 border-b'>

        <div className='flex items-center gap-1 text-xs'>
            <img onClick={()=> navigate('/')} className='w-36 sm:w-40 cursor-pointer hover:scale-105 transition-all duration-400' src={assets.admin_logo} alt="" />
            <p onClick={()=> navigate('/')} className='text-slate-600 border font-medium border-gray-400 px-2.5 py-0.5 rounded-full shadow-xl shadow-neutral-500 hover:scale-105 hover:shadow-lg hover:bg-sky-200 transition-all duration-400'>
                {aToken ? 'Admin' : 'Doctor'}
            </p>
        </div>

        <button onClick={logout} className="bg-amber-500 text-white px-6 py-3 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400">Logout</button>
    </div>
  )
}

export default Navbar