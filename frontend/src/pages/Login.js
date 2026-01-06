import React from 'react'
import axios from 'axios'
import {serverURL} from '../index.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUserData, setUserData } from '../redux/userSlice.js'

const Login = () => {
  const [show, setShow] = useState(false)
  const navigate = useNavigate()
  const [email, setemail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, seterr] = useState('')
  const dispatch = useDispatch()
  // const {userData} = useSelector(state=>state.user)
  // console.log(userData)
  const submitHandler = async(e)=>{
    setLoading(true)
    e.preventDefault()
    try{
      const response = await axios.post(`${serverURL}/auth/login`,{
      email,
      password
    },{
      withCredentials:true
    })

    dispatch(setUserData(response.data))
    dispatch(setSelectedUserData(null))
    setLoading(false)
    // console.log(response.data)
    seterr("")
  }catch(error){
    seterr(error.response.data.message)
    setLoading(false)
  }
  }

  return (
     <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[40px]'>
        <div className='w-full h-[200px] bg-[#53abe1] rounded-b-[20%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-300 text-2xl font-bold '>Welcome Back To <span className='text-[#142c36bb]'>HeyBuddy</span></h1>
        </div>
        <form className='flex flex-col gap-[20px] items-center' onSubmit={submitHandler}>
          {/* <input type='text' placeholder='username' className='w-[90%] h-[50px] py-2 px-4 border-2 border-[#53abe1] rounded-xl outline-none shadow-gray-400 shadow-lg text-gray-700 text-[19px]'/> */}
          <input type='text' placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} className='w-[90%] h-[50px] border-2 border-[#53abe1] py-2 px-4 outline-none shadow-gray-400 shadow-lg rounded-xl text-gray-700 text-[19px] '/>

          <div className='w-[90%] h-[50px] rounded-xl relative  px-4 py-2 outline-none shadow-gray-400 shadow-lg border-2 border-[#53abe1] text-gray-700 text-[19px]'>
          <input type={`${show ? 'text':'password'}`} placeholder='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} className='outline-none'/>
          <span className='absolute right-[16px] text-[#030930]' onClick={()=>{ setShow(prev=>!prev)}}><i className="ri-eye-line"></i></span>
          </div>
          {err && <p className='text-red-700'>{err}</p>}
          <button className='w-[90%] h-[50px] rounded-xl bg-[#53abe1] text-[#142c36bb] font-bold text-xl mt-4 shadow-gray-400 shadow-lg hover:shadow-inner' >{`${loading?"Loading...":"Login"}`}</button>
          <p className='cursor-pointer'>Don't have an account? <span className='text-blue-700 font-bold' onClick={()=>{navigate('/register')}}>register</span></p>
        </form>
        
      </div>
      
    </div>
  )
}

export default Login