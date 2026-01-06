import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import messageSlice from './messageSlice'

// it creates store 'configureStore'


export const store = configureStore({

  reducer:{
    user:userSlice,
    message:messageSlice
  }

})