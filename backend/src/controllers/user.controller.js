import userModel from "../models/user.model.js";
import { uploadFile } from "../service/storage.service.js";
export const getCurrentUser = async(req,res)=>{
  let user;
  try{
  user = req.user
  if(!user){
    return res.status(400).json({
      message:"User is not found"
    })
  }
  return res.status(200).json({
    message:"user is fetched successfully!",
    user
  })


  }catch(error){
    return res.status(500).json({
      message: "Server error",
      error: error?.message || String(error)
    })
  }
  
}
export const editProfile = async(req,res)=>{
  try{
    
    const {name} = req.body
    const userid = req.user.id
    // const user = await userModel.findById(userid)
    // console.log('req.body', req.body)
    // console.log('content-type', req.headers["content-type"]);

    // console.log(userid)
    // console.log(req.file)
    let fileUploadResult = null;
    if(req.file){
       fileUploadResult = await uploadFile(req.file.buffer,req.file.originalname)
      //  console.log('fileUploadResult', fileUploadResult)
    }
    const user = await userModel.findByIdAndUpdate(userid,{
      name: name,
      image: fileUploadResult
    }, { new: true })
    return res.status(200).json({
      message:"Profile updated successfully!",
      user
    })

  }
  catch(error){
    return res.status(500).json({
      message: "Server error",
      error: error?.message || String(error)
    })
  }
}
export const getOtherUsers = async(req,res)=>{
  try{
  
  const users = await userModel.find({
    _id:{$ne:req.user._id}
  }).select("-password")

  return res.status(200).json({
    users
  })

}catch(err){
  return res.status(400).json({
    message:`Profile Error - ${err}`
  })
}
}
export const searchUser = async(req,res)=>{
  try{
    const {query} = req.query
    if(!query){
      return res.status(400).json({message:"query required"})
    }
    const users = await userModel.find({
      $or:[
        {name:{$regex:query,$options:'i'}},
        {username:{$regex:query,$options:'i'}}
      ]
    })
    return res.status(200).json(users)
  }catch(err){
     return res.status(400).json({
    message:`Search Error - ${err}`
  })
  }
}