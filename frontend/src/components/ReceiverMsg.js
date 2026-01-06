import React from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'
const ReceiverMsg = ({image,message}) => {

  const {selectedUserData} = useSelector(state=>state.user)
  const scroll = useRef()
    useEffect(()=>{ 
      scroll?.current.scrollIntoView({behavior:"smooth"})
    },[message,image])

    const imageScroll =()=>{
      scroll?.current.scrollIntoView({behavior:"smooth"})

    }

  return (
    <div  className='flex items-start gap-[10px]' >
      <div  className=" overflow-hidden bg-white w-[30px] h-[30px] shadow-gray-500 shadow-lg rounded-full  flex justify-center items-center">
      
        <img src={selectedUserData?.image || dp} alt="Dp photo" className="rounded-full"/>
      </div>


    <div ref={scroll} className='w-fit max-w-[500px] bg-[#89a7b6] flex flex-col gap-[10px] text-black py-2 px-4 rounded-tl-none rounded-2xl relative left-0 mr-auto shadow-gray-400 shadow-lg'>

    { image && <img src={image} onLoad={imageScroll} ref={scroll} alt="" className='w-[150px]  rounded-lg'/>}
    { message && <span >{message}</span>}
      </div>

    </div>
  )
}

export default ReceiverMsg