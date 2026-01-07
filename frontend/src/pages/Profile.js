import React, { useRef } from 'react'
import axios from 'axios'
import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { setUserData } from '../redux/userSlice'
import {useNavigate} from 'react-router-dom'
import dp from '../assets/dp.webp'
import 'remixicon/fonts/remixicon.css'
import { serverURL } from '..'

// Function to compress image
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (event) => {
      const img = new Image()
      img.src = event.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height
        
        // Resize if image is larger than 800px
        if (width > height) {
          if (width > 800) {
            height = Math.round((height * 800) / width)
            width = 800
          }
        } else {
          if (height > 800) {
            width = Math.round((width * 800) / height)
            height = 800
          }
        }
        
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)
        
        canvas.toBlob(
          (blob) => {
            resolve(blob)
          },
          'image/jpeg',
          0.8 // 80% quality
        )
      }
    }
  })
}

const Profile = () => {
  const dispatch = useDispatch()
  const {userData} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const [name, setName] = useState()
  const [frontImage, setFrontImage] = useState(userData?.user?.image || dp)
  const [backImage, setBackImage] = useState(null)
  const imageRef = useRef()
  const [save, setSave] = useState(false)

  const handleImage = (e)=>{
    const file = e.target.files && e.target.files[0]
    if(!file) return

    // compress the image and convert back to File
    compressImage(file).then((blob)=>{
      const compressedFile = new File([blob], file.name, { type: 'image/jpeg' })
      setBackImage(compressedFile)
      setFrontImage(URL.createObjectURL(compressedFile))
    }).catch((err)=>{
      // fallback to original file on error
      setBackImage(file)
      setFrontImage(URL.createObjectURL(file))
    })
  }

  const handleprofile = async(e)=>{
    e.preventDefault()
    setSave(true)
    try{
      let formData = new FormData()
      formData.append("name",name || userData.user.name)
      if(backImage){
        formData.append("image",backImage)
        // console.log(backImage)
      }

      const response = await axios.put(`${serverURL}/user/profile`,formData,{
        withCredentials:true
      })
      dispatch(setUserData(response.data))
      setSave(false)
      navigate('/')
    }catch(err){
      console.log(`Error is - ${err}`)
      setSave(false)
    }
  }
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center'>
      <div onClick={()=>{navigate('/')}}><i className="ri-arrow-left-long-line cursor-pointer text-gray-500 fixed top-[20px] left-[20px] text-3xl" ></i></div>
      <div onClick={()=>imageRef.current.click()} className=' relative bg-white  rounded-full border-4 border-[#53abe1] shadow-gray-400 shadow-lg'>
        <div className="w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center">

        <img src={userData.user.image || frontImage} alt="Dp photo" className=" bg-cover"/>
        </div>
      <div className=' text-gray-800 absolute bottom-4  right-4'>
      <i className="ri-camera-4-line rounded-full text-3xl p-1 bg-[#53abe1]"></i>

      </div>
      </div>
      <form className='w-[95%] mt-4 max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleprofile}>

        <input type="file" accept="image/*" ref={imageRef} hidden onChange={handleImage}/>

        <input type="text" placeholder={`${userData.user.name?userData.user.name:'Enter your name'}`} value={name} onChange={(e)=>setName(e.target.value)} className='w-[90%] h-[50px] border-2 border-[#53abe1] py-2 px-4 outline-none shadow-gray-400 shadow-lg rounded-xl text-gray-900 text-[19px] placeholder:text-gray-600 '/>
        <input type="text" value={userData?.user.username}readOnly className='w-[90%] h-[50px] border-2 border-[#53abe1] py-2 px-4 outline-none shadow-gray-400 shadow-lg rounded-xl text-gray-400 text-[19px] '/>
        <input type="text" value={userData?.user.email}readOnly className='w-[90%] h-[50px] border-2 border-[#53abe1] py-2 px-4 outline-none shadow-gray-400 shadow-lg rounded-xl text-gray-400 text-[19px] '/>
        <button className='w-[90%] h-[50px] rounded-xl bg-[#53abe1] text-[#142c36bb] font-bold text-xl mt-4 shadow-gray-400 shadow-lg hover:shadow-inner' disabled={save}>{`${save?'Saving...':'Save Profile'}`}</button>
      </form>
    </div>
  )
}

export default Profile
