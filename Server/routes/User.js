import { Router } from "express"
import {boolean, z, ZodError } from "zod/v4"
import bcrypt from "bcrypt"
import { courseModel, purchaseModel, userModel } from "../db.js";
import jwt from 'jsonwebtoken'
import { userMiddleware } from "../middleware/User.js";



const zodschema=z.object({
    email:z.string(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string()
})
const saltRounds=10;


export const userRouter=Router()

userRouter.post("/signup",async (req,res)=>{
    const {email,password,firstname,lastname}=req.body;

    const data={
        email,
        password,
        firstname,
        lastname
    }

    try {
        zodschema.parse(data);
        const isUserRegistered= await userModel.findOne({
            email
        })
        if(isUserRegistered){
            return res.send({"message":"User is already registered please Signin"})
            
        }
        const hashedPassword= await bcrypt.hash(password,saltRounds);


        userModel.create({
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
        console.error("plese check  log");
        } else {
        res.status(500).json({"message":"Internal server error We are working on it."})
        }
    }
 
})

userRouter.post("/signin",async (req,res)=>{
    const {email,password}=req.body;
    console.log(email,password)

    try{
        const User= await userModel.findOne({
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

userRouter.get("/purchases",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const purchasedCourses=await purchaseModel.find({
        userId
    })
    const coursesData= await courseModel.find({
        _id:{ $in: purchasedCourses.map(x=>x.courseId)}
    })

    res.json({
        purchasedCourses,
        coursesData
    })
})

