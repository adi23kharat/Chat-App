import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs" 
import jwt from 'jsonwebtoken'

export const registerUser = async(req,res)=>{
  const {username , email , password } = req.body
  // console.log(req.body)

  const isAlreadyEmail = await userModel.findOne({email})
  if(isAlreadyEmail){
    return res.status(400).json({
      message:"email is already exists"
    })
  }

  const isAlreadyUsername = await userModel.findOne({username})
  if(isAlreadyUsername){
    return res.status(400).json({
      message:"username is already exists"
    })
  }

  const hashPassword = await bcrypt.hash(password,10)

  const user = await userModel.create({
    email,
    username,
    password:hashPassword
  })

  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  res.cookie("token",token,{
    httpOnly:true,
    sameSite:'Strict', 
    secure:false
  })

  return res.status(201).json({
    message:"user register Successfully !!!",
    user
  })
 
} 

export const loginUser = async(req,res)=>{
  
  const {email, password } = req.body
  
  const user = await userModel.findOne({email})

  if(!user){
    return res.status(404).json({
      message:"user is not exists "
    })
  }

  const isPasswordValid = await bcrypt.compare(password,user.password)
  if(!isPasswordValid){
    return res.status(400).json({
      message:'invalid user'
    })
  }
  const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
  res.cookie("token",token,{
    httpOnly:true,
    sameSite:'Strict',
    secure:false
  })
  return res.status(200).json({
    message:"user login Successfully !!!",
    user
  })  
}

export const logoutUser = (req,res)=>{
  res.clearCookie("token")
  return res.status(200).json({
    message:"user logout successfully "
  })
}