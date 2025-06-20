import jwt from "jsonwebtoken"

const userMiddleware=(req,res,next)=>{
    const token= req.headers.token;
    const decoded=jwt.verify(token,process.env.JWT_USER_PASSWORD)

    if(decoded){
        req.userId=decoded.id;
        next()
    }else{
        res.status(401).json({
            message:"your are not signed in"
        })
    }

}

module.exports={
    userMiddleware
}