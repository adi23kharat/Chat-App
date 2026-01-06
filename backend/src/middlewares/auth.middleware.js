import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'

export const authMiddleware = async(req,res,next)=>{

  const token = req.cookies.token
  if(!token){
    return res.status(400).json({
      message:"login First!!"
    })
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const user = await userModel.findById(decoded._id || decoded.id).select("-password")
    // console.log(user)
    req.user = user
    next()

  }catch(err){
    return res.status(404).json({
      message:`Error : ${err}`
    })
  }

}