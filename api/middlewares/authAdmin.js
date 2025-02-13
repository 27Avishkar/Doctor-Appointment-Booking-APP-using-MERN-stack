import jwt from 'jsonwebtoken'

// admin authentication

const authAdmin = async (req,res,next) => {

    try {
        // atoken => admin token
        const {atoken} = req.headers

        if (!atoken) {
            return res.status(401).json({success:false, message:"Unauthorized"})
        }

        // verify token
        const verify_token = jwt.verify(atoken, process.env.JWT_SECRET)

        if (verify_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.status(401).json({success:false, message:"Unauthorized"})
        }

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({success:false, message:error.message})
    }
}

export default authAdmin