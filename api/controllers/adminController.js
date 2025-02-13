import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js"
import appointmentModel from "../models/appointmentModel.js";

// all api are for admin side
// API for add doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // console.log({ name, email, password, speciality, degree, experience, about, fees, address}, imageFile)

    // Check data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res
        .status(401)
        .json({ success: false, message: "Some details missing" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // validate password
    if (password.length < 8) {
      return res
        .status(401)
        .json({ success: false, message: "Please enter a strong password" });
    }
    // encrypt password
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    // console.log("Cloudinary Upload Response:", imageUpload);
    const imageUrl = imageUpload.secure_url;

    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res
      .status(200)
      .json({ success: true, message: "Doctor added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get all doctor list
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get all appointments
const allAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

//API to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // remove doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (event) => event !== slotTime
    );

    //update latest slots booked data
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.status(201).json({ success: true, message: "Appointment cancelled!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for Dashboard
const adminDashboard = async (req,res) => {

    try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        //display only no. and latest data
        const dashboardData = {
            doctors: doctors.length,
            users: users.length,
            appointments: appointments.length,
            latestAppointments: appointments.reverse().slice(0,5)   //only 5 appointments displayed
        }

        res.status(200).json({ success: true, dashboardData});

    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: error.message }); 
    }
}


export {
  addDoctor,
  loginAdmin,
  allDoctors,
  allAppointments,
  appointmentCancel,
  adminDashboard
};
