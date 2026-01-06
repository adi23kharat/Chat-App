import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name : "user",

  initialState:{
    userData : null,
    otherUserData:null,
    selectedUserData : null,
    isLoading: true,
    socket:null,
    onlineUsers:null,
    searchData:null

  },

  reducers:{      // state is accessed intial state 

    setUserData:(state,action)=>{
      state.userData = action.payload
    },
    setOtherUserData:(state,action)=>{
      state.otherUserData = action.payload
    },
    setSelectedUserData:(state,action)=>{
      state.selectedUserData = action.payload
    },
    setIsLoading:(state,action)=>{
      state.isLoading = action.payload
    },
    setSocket:(state,action)=>{
      state.socket = action.payload
    },
    setOnlineUsers:(state,action)=>{
      state.onlineUsers = action.payload
    },
    setSearchData:(state,action)=>{
      state.searchData = action.payload
    }
  }
})

export const {setUserData,setOtherUserData,setSelectedUserData,setIsLoading,setSocket,setOnlineUsers,setSearchData} = userSlice.actions  
export default userSlice.reducer