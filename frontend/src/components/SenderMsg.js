import React, { useEffect, useRef } from 'react'
import dp from '../assets/dp.webp'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


const SenderMsg = ({image,message}) => {
  
  const {userData} = useSelector(state=>state.user)
  const scroll = useRef()
  useEffect(()=>{
    scroll?.current.scrollIntoView({behavior:"smooth"})
  },[message,image])

  const imageScroll =()=>{
      scroll?.current.scrollIntoView({behavior:"smooth"})

    }
  return (
    <div  className='flex items-start gap-[20px]'>
      <div ref={scroll} className='w-fit max-w-[500px] bg-[#53abe1] flex flex-col items-start  gap-[10px] text-white py-2 px-4 rounded-tr-none rounded-2xl relative right-0 ml-auto shadow-gray-400 shadow-lg'>
      { image && <img src={image} alt="" onLoad={imageScroll} className='w-[150px]  rounded-lg'/>}
      { message && <span >{message}</span>}
      </div>
        <div  className=" overflow-hidden bg-white w-[30px] h-[30px] shadow-gray-500 shadow-lg rounded-full  flex justify-center items-center">

          <img src={userData?.user?.image|| dp} alt="Dp photo" className="rounded-full"/>
        </div>

      
    </div>
  )
}

export default SenderMsg