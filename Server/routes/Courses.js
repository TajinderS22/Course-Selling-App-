import { Router } from "express"
import { userMiddleware } from "../middleware/User.js";
import { courseModel, purchaseModel } from "../db.js";


export const courseRouter=Router();


courseRouter.post("/purchase",userMiddleware,async (req,res)=>{
    const userId=req.userId;
    const courseId=req.body.courseId;
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
    
