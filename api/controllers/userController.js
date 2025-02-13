import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";

//import razorpay from 'razorpay'

// API for User register
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check for name, email, password not entered
    if (!name || !email || !password) {
      return res
        .status(403)
        .json({ success: false, message: "Details missing!" });
    }

    // check valid details
    // validate email
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter valid email!" });
    }
    // check password length
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a strong password!" });
    }
    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user object
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for User login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    // check user is available
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User does not exists!" });
    }

    //if user available, match password
    const matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid Credentials!" });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get User profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId).select("-password");

    res.status(200).json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for update User profile
const updateProfile = async (req, res) => {
  try {
    const { name, phone, address, gender, dob, userId } = req.body;
    const imageFile = req.file;

    // check data
    if (!name || !phone || !gender || !dob) {
      return res.status(401).json({ success: false, message: "Data missing!" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      gender,
      dob,
    });

    // if image is available upload to cloudinary
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res
      .status(201)
      .json({ success: true, message: "Profile updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API for appointment book
const appointmentBook = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    //check doctor is available or not
    if (!docData) {
      return res
        .status(403)
        .json({ success: false, message: "Doctor not available!" });
    }

    let slots_booked = docData.slots_booked;

    //check slots available or not
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(403)
          .json({ success: false, message: "Slot not available!" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slots_booked; // removes previous

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    // save this to database
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // update slots
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res
      .status(201)
      .json({ success: true, message: "Appointment booked successfully!" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to get User Appointments
const getAppointment = async (req, res) => {
  try {
    const { userId } = req.body;

    const appointments = await appointmentModel.find({ userId });

    res.status(201).json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: error.message });
  }
};

// API to cancel Appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    //verify appointment
    if (appointmentData.userId !== userId) {
      return res.status(401).json({ success: false, message: "Unauthorized!" });
    }

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

// // API to online payment using razorpay

// //key-id & key_secret work when razorpay website KYC completed
// const razorpayInstance = new razorpay ({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

// const paymentRazorpay = async (req, res) => {
//   try {
//     const { appointmentId } = req.body;
//     const appointmentData = await appointmentModel.findById(appointmentId);

//     // check appointment available or cancelled
//     if (!appointmentData || appointmentData.cancelled) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Appointment Not Found!" });
//     }

//     //create options for payment method
//     const options = {
//       amount: appointmentData.amount * 100,
//       currency: process.env.CURRENCY,
//       receipt: appointmentId,
//     };

//     //create order
//     const order = await razorpayInstance.create(options);  //Not working

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ success: false, message: error.message });
//   }
// };

// //API to verify payment
// const verifyRazorpay = async (req,res) => {

//     try {

//         const { razorpay_order_id } = req.body
//         const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

//         // check status of payment
//         if (orderInfo.status === 'paid') {
//             await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})

//             res.status(200).json({ success: true, message: "Payment Successful!" });
//         }
//         else{
//             res.status(401).json({ success: false, message: "Payment Failed!" });
//         }

//     } catch (error) {
//         console.log(error);
//         res.status(401).json({ success: false, message: error.message });
//     }
// }

export {
  userRegister,
  userLogin,
  getProfile,
  updateProfile,
  appointmentBook,
  getAppointment,
  cancelAppointment,
  //paymentRazorpay, verifyRazorpay,
};
