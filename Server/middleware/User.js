import jwt from "jsonwebtoken"
import { userModel } from "../db.js";

export const userMiddleware=async (req,res,next)=>{
    const token= req?.headers?.authorization;
    // console.log(token)
    const decoded=jwt.verify(token,process.env.JWT_USER_PASSWORD)
    // console.log(decoded.id)

    if(decoded){
        req.userId= decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"your are not signed in"
        })
    }

}

// module.exports={
//     userMiddleware
// }