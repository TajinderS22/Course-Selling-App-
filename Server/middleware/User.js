import jwt from "jsonwebtoken"
import { userModel } from "../db.js";

export const userMiddleware=async (req,res,next)=>{
    const token= req?.headers?.authorization;

    if (!token) {
        return res.status(403).json({
            message: "Authentication token missing."
        });
    }

    try {
        const decoded=jwt.verify(token,process.env.JWT_USER_PASSWORD)
        if(decoded && decoded.id){
            req.userId= decoded.id;
            next()
        }else{
            res.status(403).json({
                message:"Invalid token."
            })
        }
    } catch(e) {
        return res.status(403).json({
            message: "Invalid or expired token."
        })
    }
}

// module.exports={
//     userMiddleware
// }