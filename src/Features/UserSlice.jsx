import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../API/axiosInstance'

const fetchUser= createAsyncThunk('/fetchUserDetails',async()=>{
  const res= await axiosInstance.get('/users/getLoggedInUser')
  return res.data.user
})
const authKey= JSON.parse(localStorage.getItem('authorization'))
const authKeySession=JSON.parse(sessionStorage.getItem('authorization'))
const initialState = {
  user:'',
  login: authKey?authKey.login:false || authKeySession?authKeySession.login:false,
  token: authKey?authKey.token:'' || authKeySession?authKeySession.token:'',
  loader:false,
  chatting:false,
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
     updateLoader:(state,action)=>{
         state.loader=action.payload
     },
     updateLogin:(state,action)=>{
      state.login=action.payload.login
      state.token=action.payload.token
      state.user=action.payload.user
     },
     updateChatting:(state,action)=>{
      state.chatting=action.payload
     }
  },
  extraReducers:(builder)=>{
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
              state.user=action.payload
        })
  }
})

// Action creators are generated for each case reducer function
export const { updateLoader,updateLogin,updateChatting } = userSlice.actions
export {fetchUser}
export default userSlice.reducer