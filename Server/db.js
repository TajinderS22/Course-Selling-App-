import mongoose, { Schema } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
// const Schema=mongoose.Schema;
const ObjectId=mongoose.Types.ObjectId;

const userSchema= new Schema({
    email:{type:String, unique:true},
    password:String,
    firstname:String,
    lastname:String

})

const adminSchema= new Schema({
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
    creatorId:ObjectId
})

const purchaseSchema= new Schema({
    userId:ObjectId,
    courseId:ObjectId
})

export const userModel=mongoose.model("user",userSchema)
export const adminModel=mongoose.model("admin",adminSchema)
export const courseModel=mongoose.model("course",courseSchema)
export const purchaseModel=mongoose.model("purchase",purchaseSchema)

// module.export={
//     userModel,
//     adminModel,
//     courseModel,
//     purchaseModel
// } 