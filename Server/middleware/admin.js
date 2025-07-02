import jwt from "jsonwebtoken"

export const adminMiddleware= (req,res,next)=>{
    const token=req.headers.authorization;
    console.log(token)
    const decoded=jwt.verify(token,process.env.JWT_ADMIN_PASSWORD)

    if(decoded){
        req.userId=decoded.id;
        next()
    }else{
        res.status(403).json({
            message:"your are not signed in"
        })
    }
}

// module.exports={
//     adminMiddleware
// }