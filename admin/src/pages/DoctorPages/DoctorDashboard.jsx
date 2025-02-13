import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const { dToken, dashboardData, setDashboardData, getDashboardData, completeAppointment, cancelAppointment, } =
    useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashboardData();
    }
  }, [dToken]);

  return (
    dashboardData && (
      <div className="m-5 lg:mt-8 lg:mx-auto">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-white min-w-52 p-4 gap-3 rounded-2xl border border-gray-300 shadow-2xl shadow-neutral-500 cursor-pointer hover:scale-105 hover:shadow-xs transition-all duration-300">
            <img className="w-14" src={assets.earning_icon} alt="" />
            <div className="text-center">
              <p className="text-xl font-semibold">
                {currency} {dashboardData.earning}
              </p>
              <p className="text-sm text-gray-500">Earning</p>
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
              <p className="text-xl font-semibold">{dashboardData.patients}</p>
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
            {dashboardData.latest_appointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-4 gap-3 hover:bg-gray-200 border-b"
              >
                <img
                  className="w-10 rounded-full"
                  src={item.userData.image}
                  alt=""
                />

                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.userData.name}</p>
                  <p className="text-gray-600 text-sm mt-1">
                    {slotDateFormat(item.slotDate)}, {item.slotTime}
                  </p>
                </div>

                {item.cancelled ? (
                  <p className="text-red-500 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex gap-1">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer rounded-full hover:scale-110"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer rounded-full hover:scale-110"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
