import React, { useContext, useState } from 'react'

import { AdminContext } from '../context/AdminContext.jsx'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext.jsx'


const Login = () => {

    const [status, setStatus] = useState('Admin')
    const {setAToken,apiUrl} = useContext(AdminContext)
    const { setDToken } = useContext(DoctorContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            if (status === 'Admin'){
                const {data} = await axios.post(apiUrl + '/api/admin/login',{email,password})

                if (data.success) {
                    //console.log(data.token)
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }
                else {
                    toast.error(data.message)
                }
            }
            else {
              const { data } = await axios.post(`${apiUrl}/api/doctor/login`,{email, password})

              if (data.success) {
                //console.log(data.token)
                localStorage.setItem('dToken',data.token)
                setDToken(data.token)
            }
            else {
                toast.error(data.message)
            }
            }
            
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong!");
            console.log(error)
        }
    }


  return (
    
    <form onSubmit={handleSubmit} className="flex items-center min-h-[80vh]">
      <ToastContainer />  
        <div className="flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border border-gray-300 rounded-2xl text-zinc-700 shadow-2xl shadow-neutral-500">
            <p className="text-center text-2xl font-semibold"><span className='text-blue-400'>{status}</span> Login</p>

            <div className='w-full'>
                <p >Email</p>
                <input onChange={()=> setEmail(event.target.value)} value={email} type="email" required className="border border-gray-300 rounded-xl shadow-xs hover:shadow-xl shadow-neutral-500 w-full py-2 px-3 m-1 hover:bg-stone-100 hover:scale-105 transition-all duration-400"/>
            </div>

            <div className='w-full'>
                <p>Password</p>
                <input onChange={()=> setPassword(event.target.value)} value={password} type="password" required className="border border-gray-300 rounded-xl shadow-xs hover:shadow-xl shadow-neutral-500 w-full py-2 px-3 m-1 hover:bg-stone-100 hover:scale-105 transition-all duration-400"/>
            </div>

            <button className="bg-amber-500 text-white px-8 py-3 mt-6 mx-auto rounded-full font-medium  cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400">LOGIN</button>

            {status === "Admin" ? (
          <p className="mt-2 text-sm">
            Doctor Login?{" "}
            <span
              onClick={() => setStatus("Doctor")}
              className="text-blue-500 cursor-pointer hover:font-semibold hover:underline"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="mt-2 text-sm">
            Admin Login?{" "}
            <span
              onClick={() => setStatus("Admin")}
              className="text-blue-500 cursor-pointer hover:font-semibold hover:underline"
            >
              Click here
            </span>
          </p>
        )}
        </div>
    </form>
  )
}

export default Login