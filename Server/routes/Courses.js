import { Router } from "express"
import { userMiddleware } from "../middleware/User.js";
import { courseModel, purchaseModel } from "../db.js";
import cloudinary from 'cloudinary'
import {adminMiddleware} from '../middleware/admin.js'

export const courseRouter=Router();

const Cloudinary=cloudinary.v2

Cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})


courseRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
    console.log(req.path)
    
    console.log(req.userId)
    // Check the payment here
    const isPurchased=await purchaseModel.exists({
        courseId,
        userId
    })
    console.log(isPurchased)
    if(isPurchased) return res.json({
        message:"course already purchased"
    })

    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message:"Successfully bought the course  "
    })
})

courseRouter.get("/preview",async (req,res)=>{
    const allCourses= await courseModel.find({})

    res.json({
        message: "alll the courses",
        courses:allCourses
    })

    
})


courseRouter.post('/image/upload',adminMiddleware,async(req,res)=>{
    const image=req.body?.image;   
    try {
        Cloudinary.uploader.upload(image,
            {
                upload_preset:'TuttyCourseHub',
                allowed_formats:['png','jpg','jpeg','svg','ioc','webp'],
            },
            function(error,result){
                if(error){
                    return console.log(error)
                }
                
                res.status(200).json(result.secure_url)
            }
        )
    } catch (error) {
        console.log(error)
    }
    console.log("recived data")

})
    
