import express from 'express'
import { appointmentBook, cancelAppointment, getAppointment, getProfile, updateProfile, userLogin, userRegister } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

//import { paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', userRegister)
userRouter.post('/login', userLogin)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)

userRouter.post('/book-appointment', authUser, appointmentBook)
userRouter.get('/appointments', authUser, getAppointment)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)

// userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
// userRouter.post('/verify-razorpay', authUser, verifyRazorpay)

export default userRouter