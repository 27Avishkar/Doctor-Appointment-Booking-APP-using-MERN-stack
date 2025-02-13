import { useContext, useState } from 'react'

import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {

  const { userData, setUserData, token, apiUrl, getUserData } = useContext(AppContext)

  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState(false);

  // Update user profile
  const updateUserProfile = async () => {

    try {
      const formData = new FormData()

      formData.append('name',userData.name)
      formData.append('phone',userData.phone)
      formData.append('address',JSON.stringify(userData.address))
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      
      image && formData.append('image',image) //image update is optional

      const {data} = await axios.post(`${apiUrl}/api/user/update-profile`,formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      })

      if (data.success) {
        toast.success(data.message);
        await getUserData()
        setEdit(false)
        setImage(false)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='flex flex-col max-w-lg gap-2 text-sm md:mx-10 p-1 '>

      {
        edit 
        ? <label htmlFor='image'>
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded-full opacity-75' src={image ? URL.createObjectURL(image): userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '': assets.upload_icon} alt="" />
          </div>
          <input type="file" id="image" hidden onChange={(event) => setImage(event.target.files[0])}/>
        </label>
        : <img className='w-36 rounded-full mt-2' src={userData.image} alt="" />
      }

      

      {
        edit ? <input type="text" value={userData.name} onChange={(event) => setUserData((prev) => ({...prev, name:event.target.value}))} className ='bg-stone-200 text-3xl font-medium max-w-60 mt-4 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
        : <p className ='text-neutral-800 text-3xl font-medium max-w-60 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1.5px] w-full border-none'/>

      <div>
        <p className='font-medium text-xl mt-4'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-4 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-black'>{
          edit ? <input type="email" value={userData.email} onChange={(event) => setUserData((prev) => ({...prev, email:event.target.value}))} className ='bg-stone-200 text-lg font-medium max-w-60 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
          : <p>{userData.email}</p>
          }</p>

          <p className='font-medium'>Phone:</p>
          <p>{
          edit ? <input type="text" value={userData.phone} onChange={(event) => setUserData((prev) => ({...prev, phone:event.target.value}))} className ='bg-stone-200 text-lg font-medium max-w-60 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
          : <p>{userData.phone}</p>
          }</p>

          <p className='font-medium'>Address:</p>
          {
            edit
            ? <p>
              <input type="text" value={userData.address.line1} onChange={(event) => setUserData(prev => ({...prev, address:{...prev.address,line1: event.target.value}}))} className ='bg-stone-200 text-lg font-medium max-w-60 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
              <br />
              <input type="text" value={userData.address.line2} onChange={(event) => setUserData(prev => ({...prev, address:{...prev.address,line2: event.target.value}}))} className ='bg-stone-200 text-lg font-medium max-w-60 mt-[4px] px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
              </p>
            : <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          }
        </div>

        <div>
        <p className='font-medium text-xl mt-4'>BASIC INFORMATION</p>
        <div  className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-4 text-neutral-700'>

          <p className='font-medium'>Gender:</p>
          {
          edit ? <select value={userData.gender} onChange={(event) => setUserData((prev) => ({...prev, gender:event.target.value}))} className ='bg-stone-200 text-lg font-medium max-w-60 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
            <option value='Others'>Others</option>
          </select>
          : <p>{userData.gender}</p>
          }

          <p className='font-medium'>Date of Birth:</p>
          {
            edit ? <input type="date" value={userData.dob} onChange={(event) => setUserData((prev) => ({...prev, dob:event.target.value}))} className ='bg-stone-200 text-lg font-medium max-w-60 mt-[4px] px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'/>
            : <p>{userData.dob}</p>
          }
        </div>
      </div>

      </div>
          {
            edit
            ? <button onClick={updateUserProfile} className ='bg-green-500 text-white px-8 py-3 mt-6 mx-auto rounded-full font-medium  cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400'>SAVE</button>
            : <button onClick={() => setEdit(true)} className ='bg-amber-500 text-white px-8 py-3 mt-6 mx-auto rounded-full font-medium  cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400'>EDIT</button>
          }
      <div>

      </div>
    </div>
  )
}

export default Profile