import express from 'express'
import { userRouter } from './routes/User.js';
import { courseRouter } from './routes/Courses.js';
import { adminRouter } from './routes/Admin.js';
import mongoose from "mongoose";
import cors from 'cors'



const app=express()
const port =3000;
app.use(cors())

app.use(express.json())
app.use("/user",userRouter)
app.use("/course",courseRouter)
app.use("/admin",adminRouter)


const main=async()=>{
    await mongoose.connect(process.env.MONGO_DB_URL+"CoursesHub") 
    
    app.listen(port,()=>{
        console.log(`App is running on port ${port}.`)
    })
}
main()