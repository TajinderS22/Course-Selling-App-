import mongoose, { Schema } from "mongoose";
import { number, string } from "zod/v4";

const ObjectId=mongoose.Types.ObjectId;

const userSchema= new Schema({
    email:{type:String, unique:true},
    password:String,
    firstname:String,
    lastname:String,
    profileImageUrl:string
})

const creatorSchema= new Schema({
    email:{type:String, unique:true},
    password:String,
    firstname:String,
    lastname:String
})

const courseSchema= new Schema({
    title:String,
    description:String,
    price: Number,
    imageUrl:String,
    creatorId:ObjectId,
    chapters:[
        {
            number:number,
            chapterName:String,
            chapterDescription:String
        }
    ]
})

const purchaseSchema = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
  razorpay_order_id:String,
  razorpay_payment_id:String,
});




export const userModel=mongoose.model("user",userSchema)
export const creatorModel=mongoose.model("creator",creatorSchema)
export const courseModel=mongoose.model("course",courseSchema)
export const purchaseModel=mongoose.model("purchase",purchaseSchema)

// module.export={
//     userModel,
//     creatorModel,
//     courseModel,
//     purchaseModel
// } 