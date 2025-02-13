import jwt from 'jsonwebtoken'

// Doctor authentication

const authDoctor = async (req,res,next) => {

    try {
        
        // dtoken => doctor token
        const {dtoken} = req.headers

        if (!dtoken) {
            return res.status(401).json({success:false, message:"Unauthorized"})
        }

        // verify token
        const verify_token = jwt.verify(dtoken, process.env.JWT_SECRET)

        req.body.docId = verify_token.id

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({success:false, message:error.message})
    }
}

export default authDoctor