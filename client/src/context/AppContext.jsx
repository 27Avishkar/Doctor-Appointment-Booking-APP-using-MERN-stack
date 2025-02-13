import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)

    const [userData, setUserData] = useState(false)

    
    const currencySymbol ='₹';
    const apiUrl = import.meta.env.VITE_API_URL;

    // attach doctor data to frontend
    const getDoctorData = async () => {

        try {
            
            const {data} = await axios.get(`${apiUrl}/api/doctor/list`)

            if(data.success){
                setDoctors(data.doctors)
                toast.success(data.message)
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // attach user data to frontend
    const getUserData = async () => {

        try {
            const {data} = await axios.get(`${apiUrl}/api/user/get-profile`, {headers:{token}})

            if (data.success) {
                setUserData(data.userData)
            }
            else{
                toast.error(data.message) 
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message) 
        }
    }

    // if doctor data changes
    useEffect(() => {
        getDoctorData()
    },[apiUrl])

     // if user data changes
     useEffect(() => {
        if (token) {
            getUserData()
        }
        else{
            setUserData(false)
        }
    },[token])

    const value = {
        token,
        setToken,
        doctors, getDoctorData,
        currencySymbol,
        userData,
        setUserData,
        getUserData,
        apiUrl
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider