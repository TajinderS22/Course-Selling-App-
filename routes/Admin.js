import { Router } from "express"
import { z } from "zod/v4"
import bcrypt from "bcrypt"
import { adminModel, courseModel } from "../db.js";
import jwt from 'jsonwebtoken'



const zodschema=z.object({
    email:z.string(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string()
})
const saltRounds=10;


export const adminRouter=Router()

adminRouter.get("/stats",(req,res)=>{
    res.json({
        message:"This page will show the stats such as number of Users and all "
    })
})
adminRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)

    try{
        const User= await adminModel.findOne({
            email
        })

        if(!User) return res.status(400).json({"message":"User is not registered"})
        
        const passwordMatched= await bcrypt.compare(password,User.password)

        if(!passwordMatched){
            return res.status(401).json({"message":"Password is incorrect"})
        }
        let token;
        if(User){

            token=jwt.sign({
                id:User._id
            },process.env.JWT_USER_PASSWORD)
            console.log(token)
            // WE can add cookies logic here 
        }

        res.status(200).json({message:"Loging Successful",token:token})

    }catch(e){
        console.error("error during signin",e)
        res.status(500).json({message:"Internal error we are working on it."})
    }

})

adminRouter.post("/signup",async (req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    
        const data={
            email,
            password,
            firstname,
            lastname
        }
    
        try {
            zodschema.parse(data);
            const isUserRegistered= await adminModel.findOne({
                email
            })
            if(isUserRegistered){
                return res.send({"message":"User is already registered please Signin"})
                
            }
            const hashedPassword= await bcrypt.hash(password,saltRounds);
        
    
            adminModel.create({
                email,
                password:hashedPassword,
                firstname,
                lastname
            })
            res.status(200).json({
                message:"User successfully registered"
            })
    
        } catch (error) {
            if (error instanceof z.ZodError) {
            console.error("plese check log");
            } else {
            res.status(500).json({"message":"Internal server error We are working on it."})
            }
        }
})

adminRouter.post("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,discription,price,imageUrl}=req.body;

    const course=await courseModel.create({
        title,discription,price,imageUrl,
        creatorId:adminId
    })

    res.status(200).json({
        message:"Course created",
        courseId:course._id
    })

})

adminRouter.put("/course",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    const {title,discription,price,imageUrl,courseId}=req.body;

    const course=await courseModel.updateOne({
        // make sure to have both checks 
        // else any creator can update datails of any course
        // which is unwanted
        _id:courseId,
        creatorId:adminId
    },
        {
            title,
            discription,
            price,
            imageUrl,
        }
    )

    res.status(200).json({
        message:"Course Updated",
        courseId:course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    const adminId=req.userId;
    // const {title,discription,price,imageUrl}=req.body;

    const course=await courseModel.find({
       creatorId:adminId
    })

    res.status(200).json({
        message:`all the courses of ${adminId} ` ,
        courses:course
    })
})