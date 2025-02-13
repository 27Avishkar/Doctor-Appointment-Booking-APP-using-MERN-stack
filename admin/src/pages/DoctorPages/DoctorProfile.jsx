import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, apiUrl } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  // Update doctor profile
  const updateDocProfile = async () => {

    try {
      
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(`${apiUrl}/api/doctor/update-profile`, updateData, {headers: {dToken}})

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="lg:mx-auto">
        <div className="flex flex-col gap-4 m-5">
          <div className="mx-auto">
            <img
              className="bg-teal-200 w-full sm:max-w-64 rounded-full shadow-2xl shadow-neutral-500"
              src={profileData.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-stone-100 rounded-2xl p-8 py-7 bg-white shadow-2xl shadow-neutral-500">
            {/*  Doctor information */}

            <p className="flex items-center text-3xl font-medium text-gray-700 gap-2">
              {profileData.name}
            </p>

            <div className="flex items-center text-gray-500 mt-1 gap-2">
              <p>
                {profileData.degree} - {profileData.speciality}
              </p>

              <button className="text-xs font-medium border border-neutral-700 rounded-full px-2 py-0.5">
                {profileData.experience}
              </button>
            </div>

            <p className="text-gray-600 font-medium mt-3">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currency}{" "}
                {isEdit ? (
                  <input
                    type="number"
                    className ='bg-stone-200 font-medium max-w-45 px-3 py-0.5 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400'
                    onChange={(event) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: event.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </span>
            </p>

            <div className="flex py-2 gap-2">
              <p>Address:</p>
              <p className="text-sm">
                {isEdit ? (
                  <input type="text" className ='bg-stone-200 text-lg font-medium max-w-64 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400' onChange={(event) => setProfileData(prev => ({...prev, address:{...prev.address,line1: event.target.value}}))}  value={profileData.address.line1}/>
                ) : (
                  profileData.address.line1
                )}

                <br />
                
                {isEdit ? (
                  <input type="text" className ='bg-stone-200 text-lg font-medium max-w-64 mt-1 px-3 py-1 rounded-xl shadow-xl hover:scale-105 hover:shadow-xs transition-all duration-400' onChange={(event) => setProfileData(prev => ({...prev, address:{...prev.address,line2: event.target.value}}))}  value={profileData.address.line2}/>
                ) : (
                  profileData.address.line2
                )}
              </p>
            </div>

            <div className="flex pt-2 gap-2">
              <input
                type="checkbox"
                checked={profileData.available}
                onChange={()=>isEdit && setProfileData(prev => ({...prev, available: !prev.available}))}
              />
              <label htmlFor="">Available</label>
            </div>

            <div>
              <p className="flex text-sm font-medium text-neutral-800 items-center mt-3 gap-1">
                About:
              </p>
              <p className="text-sm text-gray-700 max-w-[700px] mt-1 mb-3">
                {profileData.about}
              </p>
            </div>

            {
              isEdit
              ?
                <button
                onClick={updateDocProfile}
                className="bg-green-500 text-white px-4 py-1 mt-6 rounded-full font-medium cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400"
              >
                SAVE
              </button>

            :
              <button
                onClick={() => setIsEdit(true)}
                className="bg-amber-500 text-white px-4 py-1 mt-6 rounded-full font-medium cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-400"
              >
                EDIT
              </button>
            }

            

            
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
