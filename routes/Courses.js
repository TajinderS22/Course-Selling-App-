import { Router } from "express"


export const courseRouter=Router();


courseRouter.post("/purchases",(req,res)=>{
    res.json({
        message:"User Registered "
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message: "alll the courses"
    })
})
    
