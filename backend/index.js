import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config()
import connectDB from "./src/db/db.js"
import cors from 'cors'
import userRouter from "./src/routes/user.routes.js"
import authRouter from './src/routes/auth.routes.js'
import messageRouter from './src/routes/message.route.js'
import { app,server } from './socket/socket.js';
const PORT = process.env.PORT || 8000


app.use(express.json())
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true
})) 
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())


app.use('/user',userRouter)
app.use('/auth',authRouter)
app.use('/message',messageRouter)

server.listen(PORT,()=>{
  connectDB()
  console.log("server is running on 5000")
})