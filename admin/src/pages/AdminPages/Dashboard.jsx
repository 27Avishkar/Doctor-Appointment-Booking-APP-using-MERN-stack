import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const { aToken, dashboardData, getDashData, cancelAppointment } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashboardData && (
      <div className="m-5 lg:mt-8 lg:mx-auto">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-white min-w-52 p-4 gap-3 rounded-2xl border border-gray-300 shadow-2xl shadow-neutral-500 cursor-pointer hover:scale-105 hover:shadow-xs transition-all duration-300">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div className="text-center">
              <p className="text-xl font-semibold">{dashboardData.doctors}</p>
              <p className="text-sm text-gray-500">Doctors</p>
            </div>
          </div>

          <div className="flex items-center bg-white min-w-52 p-4 gap-3 rounded-2xl border border-gray-300 shadow-2xl shadow-neutral-500 cursor-pointer hover:scale-105 hover:shadow-xs transition-all duration-300">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div className="text-center">
              <p className="text-xl font-semibold">
                {dashboardData.appointments}
              </p>
              <p className="text-sm text-gray-500">Appointments</p>
            </div>
          </div>

          <div className="flex items-center bg-white min-w-52 p-4 gap-3 rounded-2xl border border-gray-300 shadow-2xl shadow-neutral-500 cursor-pointer hover:scale-105 hover:shadow-xs transition-all duration-300">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div className="text-center">
              <p className="text-xl font-semibold">{dashboardData.users}</p>
              <p className="text-sm text-gray-500">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-2xl">
          <div className="flex items-center rounded-t-2xl mt-10 px-4 py-4 gap-3 border shadow-2xl">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Appointments</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashboardData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-3 hover:bg-gray-200 border-b"
              >
                <img
                  className="w-10 rounded-full"
                  src={item.docData.image}
                  alt=""
                />

                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.docData.name}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 font-medium text-xs">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 font-medium text-xs">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer rounded-full shadow-2xl shadow-neutral-900 hover:scale-110"
                    src={assets.cancel_icon}
                    alt="cancel"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
