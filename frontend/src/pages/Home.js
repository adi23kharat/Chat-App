import React from 'react'
import { useState } from 'react'
import SideBar from '../components/SideBar'
import MessageBar from '../components/MessageBar'
import { useSelector } from 'react-redux'
import useGetMessages from '../customHooks/useGetMessages'

const Home = () => {

  const {selectedUserData} = useSelector(state=>state.user)
  
  useGetMessages()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
        <SideBar/>
        <MessageBar/>
    </div>
  )
}

export default Home