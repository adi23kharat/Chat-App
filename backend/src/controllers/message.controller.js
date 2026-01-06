import conversationModel from "../models/conversation.model.js"
import messageModel from "../models/message.model.js"
import { getReceiverSocketId } from "../../socket/socket.js"
import { uploadFile } from "../service/storage.service.js"
import { io } from "../../socket/socket.js"

export const sendMsg = async(req,res)=>{
  try{

    const {receiver} = req.params
    const sender = req.user._id || req.user.id
    const {message} = req.body

    let image
    if(req.file){
        image = await uploadFile(req.file.buffer,req.file.originalname)
    }

    const conversation = await conversationModel.findOne({
      participants:{$all:[sender,receiver]}
    })

    const newMessage = await messageModel.create({
      sender,
      receiver,
      message,
      image
    })

    if(!conversation){

      const conversation = await conversationModel.create({
        participants:[sender,receiver],
        messages:[newMessage._id ]
      })

    }else{
       conversation.messages.push(newMessage._id)
       conversation.save()
    }

    const receiverSocketId = getReceiverSocketId(receiver)
    // console.log(receiverSocketId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit('newMessage',newMessage)
      
    }
    return res.status(200).json(newMessage)

  }catch(err){
    return res.status(500).json({
      message:`send Message Error -${err} `
    })
  }
}
export const getMessages = async(req,res)=>{
  try{
    
    const sender = req.user.id || req.user._id
    const {receiver} = req.params

    const conversation = await conversationModel.findOne({
      participants:{$all:[sender,receiver]}
    }).populate('messages')

    if(!conversation){
      return res.status(400).json({
        message:"conversation not found"
      })
    }

    return res.status(200).json(conversation?.messages)

  }catch(err){
    return res.status(500).json({
      messages:`error - ${err}`
    })
  }
}