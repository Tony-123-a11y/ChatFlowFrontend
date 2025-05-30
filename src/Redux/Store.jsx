import { configureStore } from '@reduxjs/toolkit'
import  userSlice  from '../Features/UserSlice'
import  socketSlice  from '../Features/SocketSlice'

export const store = configureStore({
  reducer: {
    user:userSlice,
    socket:socketSlice,
  },
})