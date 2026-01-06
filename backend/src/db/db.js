import mongoose from 'mongoose'

const connectDB = async()=>{
  mongoose.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log("mongodb is connected")
  })
  .catch((err)=>{
    console.log("Error  -",err)
  })
}

export default connectDB