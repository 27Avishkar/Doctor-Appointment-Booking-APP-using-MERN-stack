import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currency = '₹'

    const calculateAge = (dob) => {
        const day = new Date()
        const birthday = new Date(dob)

        let age = day.getFullYear() - birthday.getFullYear()

        return age
    }

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

    const value = {
        calculateAge,
        slotDateFormat,
        currency,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider