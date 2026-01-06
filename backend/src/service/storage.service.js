
import imagekit from "imagekit";
import dotenv from 'dotenv'
dotenv.config()
// Cloud Storage Provider Code

const imageKit = new imagekit({
  
  publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT

})

// Upload File Code

export const uploadFile = async(file,fileName)=>{

  const result = await imageKit.upload({
    file:file, // required
    fileName:fileName  // required
  })

  return result.url // return URL of uploaded File
}
// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs'
// export const uploadImg = async(filePath)=>{

//   cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.API_KEY, 
//     api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
//   });

//   try{
//     const uploadResult = await cloudinary.uploader.upload(filePath)
//     fs.unlinkSync(filePath)
//     return uploadResult.secure_url // return URL of uploaded File

//   }catch(error){
//     console.log(error)
//   }
// }