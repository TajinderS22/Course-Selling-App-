import { Router } from "express"
import { z } from "zod/v4"
import bcrypt from "bcrypt"
import { creatorModel, courseModel } from "../db.js";
import jwt from 'jsonwebtoken'
import {creatorMiddleware} from "../middleware/creator.js"


const zodschema=z.object({
    email:z.string(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string()
})
const saltRounds=10;


export const creatorRouter=Router()

creatorRouter.get("/stats",(req,res)=>{
    res.json({
        message:"This page will show the stats such as number of Users and all "
    })
})
creatorRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;

    try{
        const User= await creatorModel.findOne({
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
            },process.env.JWT_ADMIN_PASSWORD)
            // WE can add cookies logic here 
        }

        res.status(200).json({message:"Loging Successful",token:token})

    }catch(e){
        console.error("error during signin",e)
        res.status(500).json({message:"Internal error we are working on it."})
    }

})

creatorRouter.post("/signup",async (req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    
        const data={
            email,
            password,
            firstname,
            lastname
        }
    
        try {
            zodschema.parse(data);
            const isUserRegistered= await creatorModel.findOne({
                email
            })
            if(isUserRegistered){
                return res.send({"message":"User is already registered please Signin"})
                
            }
            const hashedPassword= await bcrypt.hash(password,saltRounds);
        
    
            creatorModel.create({
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

creatorRouter.post("/course",creatorMiddleware,async(req,res)=>{
    const creatorId=req.userId;
    const {title,description,price,imageUrl,chapters}=req.body;
    const course=await courseModel.create({
        title,description,price,imageUrl,
        creatorId:creatorId,
        chapters
    })

    res.status(200).json({
        message:"Course created",
        courseId:course._id
    })

})

creatorRouter.put("/course",creatorMiddleware,async(req,res)=>{
    const creatorId=req.userId;
    const {title,description,price,imageUrl,courseId,chapters}=req.body;

    const course=await courseModel.updateOne({
        _id:courseId,
        creatorId:creatorId
    },
        {
            title,
            description,
            price,
            imageUrl,
            chapters
        }
    )

    res.status(200).json({
        message:"Course Updated",
        courseId:course._id
    })
})

creatorRouter.post("/verify",async(req,res)=>{
    const token=req.headers.authorization

    const decoded=jwt.verify(token,process.env.JWT_ADMIN_PASSWORD)
    const user = await creatorModel.findOne({
        _id:decoded.id
    })
    if(!token) return null
    if(user){
    res.json({user})
    } 
        
    
})

creatorRouter.get("/course/bulk",creatorMiddleware,async(req,res)=>{
    const creatorId=req.userId;
    // const {title,discription,price,imageUrl}=req.body;

    const course=await courseModel.find({
       creatorId:creatorId
    })

    res.status(200).json({
        message:`all the courses of ${creatorId} ` ,
        courses:course
    })
})