import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const apiUrl = import.meta.env.VITE_API_URL;

  const [appointments, setAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(false);
  const [profileData, setProfileData] = useState(false)

  // function for get appointments
  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/doctor/appointments`, {
        headers: { dToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        // console.log(data.appointments)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //complete appointment
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/doctor/complete-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //cancel appointment
  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/doctor/cancel-appointment`,
        { appointmentId },
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //for dashboard data
  const getDashboardData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/doctor/dashboard`, {
        headers: { dToken },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
        //console.log(data.dashboardData)
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  //get profile
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/doctor/profile`, {
        headers: { dToken },
      });
      
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData)
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const value = {
    apiUrl,
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashboardData,
    setDashboardData,
    getDashboardData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
