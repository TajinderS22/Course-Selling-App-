import { Router } from "express"
import {boolean, z, ZodError } from "zod/v4"
import bcrypt from "bcrypt"
import { courseModel, purchaseModel, userModel } from "../db.js";
import jwt from 'jsonwebtoken'
import { userMiddleware } from "../middleware/User.js";
import { Cloudinary } from "../upload/Cloudinary.js";
import {instance} from "../Razorpay/razorpay.js"



const zodschema=z.object({
    email:z.string(),
    password:z.string(),
    firstname:z.string(),
    lastname:z.string()
})
const saltRounds=10;


export const userRouter=Router()

userRouter.post("/update/profile",userMiddleware,async(req,res)=>{
    const userId= req.userId
    try {
        const existing =await userModel.findOne({
            _id:userId
        })
        if(existing){
            await userModel.updateOne({
                _id:userId
            },{
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                phoneNumber:req.body.phone,
                profileImageUrl:req.body.profileImage,
                address:req.body.address
            })

            res.status(200).json({
                message:"Profile Updated"
            })
            return 
        }else{
            res.status(404).json({
                message:"Some error occured please report devs"
            })
        }
    } catch (error) {
        console.error(error)
    }
})




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

    try{
        const User= await userModel.findOne({
            email
        })

        if(!User) return res.status(403).json({"message":"User is not registered"})
        
        const passwordMatched= await bcrypt.compare(password,User.password)

        if(!passwordMatched){
            return res.status(401).json({"message":"Password is incorrect"})
        }
        let token;
        if(User){

            token=jwt.sign({
                id:User._id
            },process.env.JWT_USER_PASSWORD)
            // WE can add cookies logic here 
        }

        res.status(200).json({message:"Loging Successful",token:token, user: User})

    }catch(e){
        console.error("error during signin",e)
        res.status(500).json({message:"Internal error we are working on it."})
    }

})

userRouter.get("/courses",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const response= await purchaseModel.find({
        userId:userId
    })
    const courseIds=response.map(x=>x.courseId)

    const courses=await courseModel.find({
        _id:{
            $in:courseIds
        }
    })

    res.status(200).json({
        courses
    })
    
})




userRouter.post("/verify",async(req,res)=>{
    const token=req.headers.authorization

    const decoded=jwt.verify(token,process.env.JWT_USER_PASSWORD)
    const user = await userModel.findOne({
        _id:decoded.id
    })
    if(!token) return null
    if(user){
    res.json({user})
    } 
        
    
})


userRouter.get("/purchases",userMiddleware,async(req,res)=>{
    const userId=req.userId
    const userPayments= (await instance.payments.all()).items
    const paymentsAll=userPayments.filter((payment)=>{
        return payment.notes.userId===userId
    })

    res.status(200).json({
        payments:paymentsAll
    })
})




userRouter.post("/image/upload", userMiddleware, async (req, res) => {
  const image = req.body?.image;
  try {
    Cloudinary.uploader.upload(
      image,
      {
        upload_preset: "TuttyCourseHub",
        allowed_formats: ["png", "jpg", "jpeg", "svg", "ioc", "webp"],
      },
      function (error, result) {
        if (error) {
          return console.error(error);
        }

        res.status(200).json(result.secure_url);
      }
    );
  } catch (error) {
    console.error(error);
  }
});
