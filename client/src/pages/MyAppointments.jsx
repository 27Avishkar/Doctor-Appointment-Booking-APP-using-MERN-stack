import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointment = () => {
  const navigate = useNavigate()
  const { apiUrl, token, getDoctorData } = useContext(AppContext);

  const [appointments, setAppointments] = useState([]);

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // create format like 27 Jan 2025 in My Appointments page
  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + ", " + dateArray[2]
    );
  };

  //Get user appointments
  const userAppointments = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/user/appointments`, {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        //console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      //console.log(appointmentId);
      const { data } = await axios.post(
        `${apiUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        userAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // // Pay online function(razorpay)

  // const initPay = (order) => {
  //       const options = {
  //         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  //         amount: order.amount,
  //         currency: order.currency,
  //         name: 'Appointment Payment',
  //         description: 'Appointment Payment',
  //         order_id: order.id,
  //         receipt: order.receipt,
  //         handler: async (response) => {
  //           console.log(response)
  //           try {
              
  //             const {data} = await axios.post(`${apiUrl}/api/user/verify-razorpay`,response, {headers: {token}})

  //             if (data.success) {
  //               userAppointments()
  //               navigate('/my-appointments')
  //             }
  //           } catch (error) {
  //             console.log(error)
  //             toast.error(error.message)
  //           }
  //         }
  //       }

  //       const rzp = new window.Razorpay(options)
  //       rzp.open()
  // }
  // const appointmentRazorpay = async (appointmentId) =>{

  //   try {

  //     const {data} = await axios.post(`${apiUrl}/api/user/payment-razorpay`, {appointmentId}, {headers: {token}})

  //     if (data.success) {
  //       console.log(data.order);
  //       initPay(data.order)    
  //     }

  //   } catch (error) {
  //       console.log(error)
  //       toast.error(error.message)
  //   }
  // }

  // run when page is loaded
  useEffect(() => {
    if (token) {
      userAppointments();
      getDoctorData();
    }
  }, [token]);

  return (
    <div className="md:mx-10">
      <p className="text-center text-2xl font-medium border-b mt-12 pb-3">
        My appointments
      </p>

      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
          >
            <div>
              <img
                className="w-32 bg-indigo-100 rounded-full my-3"
                src={item.docData.image}
                alt=""
              />
            </div>

            <div className="flex-1 text-sm mt-2">
              <p className="font-semibold">{item.docData.name}</p>

              <p className="text-gray-700 font-medium mt-1">
                {item.docData.speciality}
              </p>

              <p className="font-medium my-1">Address:</p>

              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>

              <p className="text-sm my-2">
                <span className="font-medium">Date & Time:</span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}{" "}
              </p>
            </div>
            <div></div>

            <div className="flex flex-col justify-end gap-3">
              {!item.cancelled && item.payment && !item.isCompleted && <p className="border-2 border-green-600 text-stone-500 text-sm text-center py-2 sm:min-w-48 rounded-full shadow-neutral-600 shadow-xs">
                  Paid
                </p>}

              {!item.cancelled && !item.payment &&  !item.isCompleted &&(
                <button
                  // onClick={()=>appointmentRazorpay(item._id)}
                  className="bg-green-500 text-white text-sm text-center py-2 sm:min-w-48 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-400"
                >
                  Pay Online
                </button>
              )}

              {!item.cancelled && !item.isCompleted &&(
                <button
                  onClick={() => cancelAppointment(item._id)}
                  className="bg-red-500 text-white text-sm text-center py-2 sm:min-w-48 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:scale-105 transition-all duration-400"
                >
                  Cancel Appointment
                </button>
              )}

              {item.cancelled && !item.isCompleted &&(
                <p className="border border-red-600 text-red-500 text-sm text-center py-2 sm:min-w-48 rounded-full shadow-neutral-600 shadow-xs">
                  Appointment cancelled
                </p>
              )}

              {item.isCompleted && <button className="sm:min-w-48 border border-green-500 rounded-full text-green-500 py-2">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
