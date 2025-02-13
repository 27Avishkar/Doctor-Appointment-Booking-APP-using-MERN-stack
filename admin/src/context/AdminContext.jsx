import { createContext, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const apiUrl = import.meta.env.VITE_API_URL;

  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [dashboardData, setDashboardData] = useState(false);

  // Get all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/admin/all-doctors`,
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // change available or not
  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        `${apiUrl}/api/admin/change-availability`,
        { docId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get all appointments
  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/admin/appointments`, {
        headers: { aToken },
      });

      if (data.success) {
        setAppointments(data.appointments);
        //console.log(data.appointments);
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
        `${apiUrl}/api/admin/cancel-appointment`,
        { appointmentId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // get dashboard data
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/api/admin/dashboard`, {
        headers: { aToken },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
        console.log(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    apiUrl,
    aToken,
    setAToken,
    doctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashboardData,
    getDashData,
  };

  return (
    <AdminContext.Provider value={value}>
      <ToastContainer />
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
