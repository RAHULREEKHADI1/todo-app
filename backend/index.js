import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import todoRoute from "../backend/routes/todo.routes.js"
import userRoute from "../backend/routes/user.routes.js"

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4002;
const DB_URI=process.env.MONGODB_URI;
//Database Connectivity

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[
        process.env.FRONTEND_URL,
        "https://todo-app-frontend-mfhd.onrender.com"
        ],
    credentials:true,
    methods:"GET,POST,PUT,DELETE",
    allowedHeaders:["Content-Type","Authorization"]//add other header you want to allow
}))
app.options('*', cors());
try{
    await mongoose.connect(DB_URI);
    console.log("Connected to MongoDB");
} catch(error){
    console.log(error);
}

//Routes

app.use("/todo",todoRoute);
app.use("/user",userRoute);
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})
