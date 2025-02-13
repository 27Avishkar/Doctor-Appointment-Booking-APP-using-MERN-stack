import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

import Login from './pages/Login'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/AdminPages/Dashboard'
import AllAppointments from './pages/AdminPages/AllAppointments'
import AddDoctor from './pages/AdminPages/AddDoctor'
import DoctorsList from './pages/AdminPages/DoctorsList'
import DoctorDashboard from './pages/DoctorPages/DoctorDashboard'
import DoctorAppointments from './pages/DoctorPages/DoctorAppointments'
import DoctorProfile from './pages/DoctorPages/DoctorProfile'


const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />

        <Routes>
          {/*  AdminPage Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/*  DoctorPage Route */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  )
  :
  (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App