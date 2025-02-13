import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="text-xl text-center font-medium mb-3">All Appointments</p>

      <div className="bg-white border-gray-400 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-2xl shadow-neutral-500">
        <div className="max-sm:hidden grid sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr_1fr] place-items-center grid-flow-col  py-3 px-6 border-b bg-stone-100">
          <p>Sr.No.</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Age</p>
          <p>Payment</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {appointments.reverse().map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_2fr_1fr_1fr] place-items-center gap-2 py-3 px-6 border-b hover:bg-gray-200"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            <div className="flex items-center gap-1">
              <img
                className="w-10 rounded-full"
                src={item.userData.image}
                alt=""
              />{" "}
              <p>{item.userData.name}</p>
            </div>

            <p className="text-center">
              {" "}
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>

            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

            <div className="text-xs inline border border-gray-500 px-2 rounded-full">
              <p>{item.payment ? "Online" : "Cash"}</p>
            </div>

            <p>
              {currency}
              {item.amount}
            </p>

            {item.cancelled ? (
              <p className="text-red-500 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
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
  );
};

export default DoctorAppointments;
