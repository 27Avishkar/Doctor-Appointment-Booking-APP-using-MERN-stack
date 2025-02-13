import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import appointmentModel from "../models/appointmentModel.js";

const changeAvailability = async (req, res) => {
  try {
    const { docId } = req.body;
    const docData = await doctorModel.findById(docId);

    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    res.status(200).json({ success: true, message: "Availability changed" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// doctor list
const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select(["-email", "-password"]);

    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for doctor login
const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorModel.findOne({ email });

    //verify doctor => email
    if (!doctor) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }

    //if doctor email is valid, match password
    const matchPassword = await bcrypt.compare(password, doctor.password);

    //if match => create token
    if (matchPassword) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// For Doctor panel
// API to get doctor appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for appointment complete
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // check appointmentData
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return res
        .status(200)
        .json({
          success: true,
          message: "Appointment Completed Successfully!",
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Appointment Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for appointment cancel
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    // check appointmentData
    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return res
        .status(200)
        .json({
          success: true,
          message: "Appointment Cancelled Successfully!",
        });
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Cancellation Failed!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get dashboard data
const doctorDashboard = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.find({ docId });

    //show earning
    let earning = 0;

    appointments.map((item) => {
      // check appointment is completed or payment done then update earning
      if (item.isCompleted || item.payment) {
        earning = earning + item.amount;
      }
    });

    // show no. of patients
    let patients = [];

    appointments.map((item) => {
      // check if patient userId is in array, if not then add to patients array
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashboardData = {
      earning,
      appointments: appointments.length,
      patients: patients.length,
      latest_appointments: appointments.reverse().slice(0, 5),
    };

    res.status(200).json({ success: true, dashboardData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await doctorModel.findById(docId).select("-password");

    res.status(200).json({ success: true, profileData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to update doctor profile
const updateDocProfile = async (req, res) => {
  try {
    const { docId, fees, address, available } = req.body;

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available });

    res
      .status(200)
      .json({ success: true, message: "Profile Updated Successfully!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

export {
  changeAvailability,
  doctorList,
  doctorLogin,
  getDoctorAppointments,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
  doctorProfile,
  updateDocProfile,
};
