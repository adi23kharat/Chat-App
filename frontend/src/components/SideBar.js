import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import dp from '../assets/dp.webp'
import axios from 'axios'
import { serverURL } from '..'
import { setUserData,setOtherUserData, setSelectedUserData ,setSearchData} from '../redux/userSlice'


const SideBar = () => {

const {userData,otherUserData,selectedUserData,socket,onlineUsers,searchData} = useSelector(state=>state.user)
const [search, setSearch] = useState(false)
const dispatch = useDispatch()
const navigate = useNavigate()
const [input, setInput] = useState("")

const handlelogout = async()=>{
  try{
    let response = await axios.get(`${serverURL}/auth/logout`,{
      withCredentials:true
    })
    dispatch(setUserData(null))
    dispatch(setOtherUserData(null))
    navigate('/')
  }catch(err){
    console.log(`Error - ${err}`)
  }
}

const handleSearch = async()=>{
  try{
    let response = await axios.get(`${serverURL}/user/search?query=${input}`,{
      withCredentials:true
    })
    dispatch(setSearchData(response.data))
    console.log(response.data)
   
  }catch(err){
    console.log(`Error - ${err}`)
  }
}

useEffect(()=>{
  if(input){

    handleSearch()
  }
},[input])
  return (
    <div className={`lg:w-[30%] relative w-full h-full lg:block ${!selectedUserData?"flex-col":"hidden"} bg-slate-200`}>
      <div onClick={handlelogout} className=' z-[999] w-[50px] h-[50px] fixed bottom-5 left-4 rounded-full shadow-gray-700 shadow-lg flex items-center justify-center bg-[#53abe1] mt-2'>
       <i className="ri-logout-circle-line text-[25px]"></i>
      </div>

    {input.length>0 && search &&
      <div className='flex pl-3 absolute top-[180px] w-full pt-2 mt-3 rounded-t-[10%] rounded-b-[10%] border-b-2 border-gray-700 bg-[#a1b0b0] h-[50%] overflow-auto flex-col gap-[10px] z-[999]  '>
          {
            searchData?.map((users)=>(
              <div onClick={()=>{dispatch(setSelectedUserData(users) ,
              setInput(""))
              setSearch(false)
              }} className='w-[95%] h-[50px] flex justify-start  items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b2ccdf]'>
              <div key={users._id} className="flex relative">

          <div className='w-[50px] h-[50px]  bg-white shadow-gray-500 shadow-lg rounded-full overflow-hidden flex justify-center items-center'>
          <img src={users.image|| dp} alt="Dp photo" className=" bg-cover"/>
          </div>
           
        </div>
        <h1 className='text-gray-800 font-semibold text-[18px]'>{users.name || users.username}</h1>
        </div>
            ))
          }
        </div>
    }

      <div className='w-full h-[250px] bg-[#53abe1] rounded-b-[20%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
      <h1 className='text-white font-bold mt-3  text-[25px]'>Chatly</h1>
      {userData && (
      <div className='w-full flex justify-between items-center'>
        <h1 className='text-gray-800 font-bold text-[20px]'>Hii, {userData?.user?.name || 'User'}</h1>
        <div onClick={()=>{navigate('/profile')}} className="bg-white w-[80px] h-[80px] shadow-gray-500 shadow-lg rounded-full overflow-hidden flex justify-center items-center">

          <img src={userData?.user?.image|| dp} alt="Dp photo" className=" bg-cover"/>
        </div>
      </div>
      )}
    <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[20px]'>

     {
       !search && <div onClick={()=>{setSearch(true)}} className='w-[50px] h-[50px] rounded-full shadow-gray-700 shadow-md flex items-center justify-center bg-white mt-2'>
       <i className="ri-search-line text-[22px]"></i>
      </div>
     }

     {
       search && 
       <form className='relative w-full h-[50px] bg-white shadow-gray-700 shadow-md flex items-center gap-[10px] rounded-full overflow-hidden mt-2'>

        <i className="ri-search-line text-[22px] pl-[15px]"></i>
        <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}} className='border-0 w-full h-full outline-0 p-[10px] ' placeholder='search users...'/>
        <i onClick={()=>{setSearch(false) 
          setInput("")}} className="ri-close-fill cursor-pointer text-[25px] pr-[10px]"></i>

        
      </form>
     }
     {!search && 
      Array.isArray(otherUserData) && otherUserData.map((users)=>(
        onlineUsers?.includes(users._id) &&
        <div key={users._id} className="flex relative" >

          <div  className='w-[50px] h-[50px]  bg-white shadow-gray-500 shadow-lg rounded-full overflow-hidden flex justify-center mt-2 items-center'>
          <img  src={users.image|| dp} alt="Dp photo" className=" bg-cover"/>
          </div>
          <span className='absolute right-[4px] bottom-[-3px] bg-[#61e344] rounded-full w-[16px] h-[16px]'></span>
        </div>
      ))
     }
     </div>
    
      </div>
      <div className='mt-2 w-full h-[68%] overflow-auto flex flex-col gap-[15px] items-center'>
        {
      Array.isArray(otherUserData) && otherUserData.map((users)=>(
        <div onClick={()=>dispatch(setSelectedUserData(users))} className='w-[95%] h-[50px] flex justify-start  items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#b2ccdf]'>
        <div key={users._id} className="flex relative">

          <div className='w-[50px] h-[50px]  bg-white shadow-gray-500 shadow-lg rounded-full overflow-hidden flex justify-center items-center'>
          <img src={users.image|| dp} alt="Dp photo" className=" bg-cover"/>
          </div>
          { onlineUsers?.includes(users._id) &&
          <span className='absolute right-[4px] bottom-[-3px] bg-[#61e344] rounded-full w-[16px] h-[16px]'></span>
          } 
        </div>
        <h1 className='text-gray-800 font-semibold text-[18px]'>{users.name || users.username}</h1>
        </div>
      ))
     }
      </div>
    </div>
  )
}

export default SideBar
