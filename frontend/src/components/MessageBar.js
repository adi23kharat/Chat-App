import React,{useEffect, useRef, useState} from 'react'
import dp from '../assets/dp.webp'

import { useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { setSelectedUserData } from '../redux/userSlice'
import EmojiPicker from 'emoji-picker-react';
import SenderMsg from './SenderMsg'
import ReceiverMsg from './ReceiverMsg'
import axios from 'axios'
import { serverURL } from '..'
import { addMessage, setMessageData } from '../redux/messageSlice.js'

const MessageBar = () => {
  const { selectedUserData,userData,socket } = useSelector(state => state.user)
  const { messageData } = useSelector(state => state.message)
  const dispatch = useDispatch()
  const [showEmoji, setShowEmoji] = useState(false)
  const [input, setInput] = useState('')
  const [frontendImage, setFrontendImage] = useState(null)
  const [backendImage, setBackendImage] = useState(null)
  const imageRef = useRef()

  const handleImage = (e)=>{
    const file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }
  const handleSendMsg = async(e)=>{
    e.preventDefault()
    if(input.length == 0 && backendImage == null){
      return
    }

    try{
      const formData = new FormData()
      formData.append('message',input)
      
      if(backendImage){
        formData.append('image',backendImage)
      }
      console.log(formData)
      let response = await axios.post(`${serverURL}/message/send/${selectedUserData._id }`,formData,{
        withCredentials:true
      })
      
      dispatch(addMessage(response.data))
      setInput("")
      setFrontendImage(null)
      setBackendImage(null)
      
      
    }catch(err){
      console.log(`Error - ${err}`)
    }

  }

  const onEmojiClick = (emojiData)=>{
    setInput(prevInput=>prevInput+emojiData.emoji)
  }

  useEffect(()=>{
   socket.on('newMessage',(msg)=>{
    dispatch(setMessageData([...messageData,msg]))
   })
   return ()=>socket.off("newMessage")
  },[messageData,setMessageData])

  return (
    <div className={`lg:w-[70%] relative ${selectedUserData?"flex":"hidden"} lg:block w-full h-full bg-slate-200 border-l-2 border-gray-400 `}>
      {
      selectedUserData && 

      <div className='w-full h-[100vh] flex flex-col '>
        <div className='w-full h-[100px] bg-[#5996bc] rounded-b-[20%] shadow-gray-400 shadow-lg flex items-center gap-[20px] px-[20px]'>
        <div>
          <i onClick={()=>dispatch(setSelectedUserData(null))} className="ri-arrow-left-line  cursor-pointer text-black text-3xl"></i>
        </div>
          
        <div  className="bg-white   w-[50px] h-[50px] shadow-gray-500 shadow-lg rounded-full overflow-hidden flex justify-center items-center">
          <img src={selectedUserData?.image || dp} alt="Dp photo" className="object-cover w-full h-full"/>
        </div>

        <h1 className='text-black font-semibold text-[20px]'>{selectedUserData?.name || "user"}</h1>

        </div> 
      
        <div className='w-full h-[calc(100dvh-200px)] flex flex-col gap-[10px] py-[30px] px-[20px] overflow-auto '>

        {
           messageData && messageData.map((msg)=>(
            msg.sender == userData.user._id ? <SenderMsg image={msg.image} message={msg.message}/> : <ReceiverMsg image={msg.image} message={msg.message}/>
          ))
        }

        </div>

        {/* EMOJI PICKER (OUTSIDE SCROLL) */}
        {showEmoji && (
        <div className="absolute bottom-[140px] left-[20px] z-[9999]">
          <EmojiPicker width={350} height={400} onEmojiClick={onEmojiClick} />
        </div>
    )}
      </div>
      }

      {
        !selectedUserData && 
        <div className='w-full h-full flex flex-col items-center justify-center '>
          <h1 className='text-gray-700 font-bold text-[40px]'>Welcome to Chatly</h1>
          <h3 className='text-[#0e98e8] font-bold text-[25px]'>Chat Friendly !!!</h3>
        </div>
      }

      { selectedUserData &&
      <div className='w-full lg:w-[70%] h-[100px] fixed bottom-[20px]  flex justify-center items-center'>
          <img src={frontendImage} className='w-[80px] absolute bottom-[90px] right-[30px] lg:right-[120px] rounded-lg  shadow-gray-800 shadow-lg'/>
        <form onSubmit={handleSendMsg} className='w-[95%] px-3 flex justify-start items-center  gap-[20px] lg:w-[80%] h-[50px] shadow-gray-400 shadow-lg rounded-full bg-white'>
          <div onClick={()=>{setShowEmoji(prev=>!prev)}}>
            <i className="ri-emoji-sticker-line text-[25px] py-2 px-2 bg-[#5996bc] rounded-full "></i>
          </div>
          <input type='file' accept="image/*" ref={imageRef} hidden onChange={handleImage}/>
          <input type='text' value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder='Messages' className='outline-none border-0 text-black-400 w-full h-full '/>
           <div onClick={()=>imageRef.current.click()}>
            <i className="ri-image-line text-[20px] py-2 px-2 bg-[#5996bc] rounded-full"></i>
          </div>
           <div>
            <button><i className="ri-send-plane-2-fill text-[20px]  py-2 px-2 bg-[#5996bc] rounded-full"></i></button>
          </div>

        </form>
      </div>
      }
    </div>
  )
}

export default MessageBar