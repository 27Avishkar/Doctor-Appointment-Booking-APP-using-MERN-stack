import jwt from 'jsonwebtoken'

// User authentication

const authUser = async (req,res,next) => {

    try {
        
        // token => user token
        const {token} = req.headers

        if (!token) {
            return res.status(401).json({success:false, message:"Unauthorized"})
        }

        // verify token
        const verify_token = jwt.verify(token, process.env.JWT_SECRET)

        req.body.userId = verify_token.id

        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({success:false, message:error.message})
    }
}

export default authUser