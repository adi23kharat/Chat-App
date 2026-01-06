import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
const messageSlice = createSlice({
  name:"message",

  initialState:{
    messageData:[]
  },

  reducers:{
    setMessageData:(state,action)=>{
      state.messageData = action.payload
    }
    ,addMessage:(state,action)=>{
      state.messageData.push(action.payload)
    }
  }

})

export const {setMessageData,addMessage} = messageSlice.actions
export default messageSlice.reducer