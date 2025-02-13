import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const { doctors, currencySymbol, apiUrl, token, getDoctorData } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  const [slots, setSlots] = useState([]); //for Slots
  const [slotId, setSlotId] = useState(0); //for slot index
  const [slotTime, setSlotTime] = useState(""); //for slot time

  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // Get Doctors info
  const getDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
    //console.log(docInfo);
  };

  // Check Slot availability
  const getAvailSlot = async () => {
    setSlots([]);

    // get current date
    let today = new Date(); //using Date constructor
    // for 7 days
    for (let i = 0; i < 7; i++) {
      // get current date and time
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i); // got future 7 dates

      // set end time of date with id
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0); // end Time of slot is 9 PM

      // set Hours, Minutes
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year   //format for date
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true 

        if (isSlotAvailable) {
          // add slot to timeSlots
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }

        // increment current time by 30 min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setSlots((prev) => [...prev, timeSlots]);
    }
  };

  //appointment book
  const appointmentBook = async () =>{
    if (!token) {
      toast.warn('Login to Book Appointment!')
      return navigate('/login');
    }

    try {
      const date = slots[slotId][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year
      //console.log(slotDate);

      const {data} = await axios.post(`${apiUrl}/api/user/book-appointment`, {docId, slotDate, slotTime}, {headers: {token}})

      if (data.success) {
        toast.success(data.message)
        getDoctorData()
        navigate('/my-appointments')
      }
      else{
        toast.error(data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // if Doctor id changes
  useEffect(() => {
    getDocInfo();
  }, [doctors, docId]);

  // if Doctor info changes
  useEffect(() => {
    getAvailSlot();
  }, [docInfo]);

  // if slots changes
  useEffect(() => {
    console.log(slots);
  }, [slots]);

  return (
    docInfo && (
      <div className="md:mx-10">
        {/*  Doctor Info */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/*  Left Side (image) */}
          <div>
            <img
              className="w-full sm:max-w-72 bg-teal-300 rounded-full border border-gray-400 hover:scale-105"
              src={docInfo.image}
              alt=""
            />
          </div>

          {/*  Right Side (info) */}
          <div className="flex-1 border border-gray-400 rounded-2xl p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex gap-2 items-center text-2xl font-medium">
              {docInfo.name}{" "}
              <img
                className="w-5 hover:scale-105"
                src={assets.verified_icon}
                alt="verified"
              />
            </p>

            {/* Degree, Speciality and Experience */}
            <div className="flex items-center text-gray-700 text-sm mt-1 gap-2">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="border border-gray-300 rounded-full px-2 py-1 text-xs shadow-2xl shadow-neutral-600 hover:bg-gray-300 hover:shadow-xs hover:scale-105">
                {docInfo.experience}
              </button>
            </div>

            {/* About */}
            <div className="">
              <p className="flex items-center gap-2 text-sm font-medium mt-3 mb-1">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-700 max-w-2xl">{docInfo.about}</p>
            </div>

            {/* Fees */}
            <p className="items-start font-medium mt-4 text-gray-600">
              Appointment fees:{" "}
              <span className="text-gray-800">
                {currencySymbol} {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/*  Booking Slots */}
        <div className="font-medium sm:ml-72 sm:pl-4 mt-5 py-2">
          <p>Booking Slots</p>

          <div className="flex items-center w-full gap-3 overflow-x-scroll mt-4 px-2 py-2">

            {slots.length &&
              slots.map((item, index) => (

                <div
                  onClick={() => setSlotId(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer shadow transition-all duration-300 hover:scale-105 hover:bg-emerald-200 hover:shadow-xl hover:shadow-neutral-500 hover:border-gray-500 ${
                    slotId === index
                      ? "bg-emerald-300 text-gray-900 font-medium"
                      : "border border-gray-300 text-gray-500"
                  }`}
                  key={index}
                >

                  <p>{item[0] && days[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>

                </div>
              ))}
          </div>

          <div className="flex items-center w-full gap-3 overflow-x-scroll mt-4 px-3 py-3">
            {slots.length && slots[slotId].map((item, index) => (
              <p onClick={() => setSlotTime(item.time)} className={`flex-shrink-0 text-sm font-light px-5 py-2 rounded-full cursor-pointer border shadow shadow-neutral-500 hover:scale-105 hover:shadow-2xs transition-all duration-300 ${item.time === slotTime ? 'bg-teal-300 text-gray-900 font-medium shadow-2xs' : 'text-gray-500 border-gray-300'}`} key={index}>
                {item.time.toLowerCase()}
              </p>
            ))}
          </div>

          <button onClick={appointmentBook} className="bg-amber-500 text-white items-center px-8 py-3 mt-4 rounded-full font-light cursor-pointer shadow-neutral-600 shadow-xs hover:shadow-xl hover:opacity-80 hover:scale-105 transition-all duration-300">Book an Appointment</button>
        </div>

        {/*  Related Doctors*/}

        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default Appointment;
