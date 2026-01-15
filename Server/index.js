import express from 'express'
import { userRouter } from './routes/User.js';
import { courseRouter } from './routes/Courses.js';
import { creatorRouter } from './routes/Creator.js';
import mongoose from "mongoose";
import cors from 'cors'

import dotenv from "dotenv"
import { s3Router } from './routes/S3.js';
dotenv.config()


const app=express()
const port =process.env.SERVER_PORT||3000;
app.use(cors())


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/creator",creatorRouter)



await mongoose.connect(process.env.MONGO_DB_URL+"CoursesHub") 

app.listen(port,()=>{
    console.log(`App is running on port ${port}.`)
})

