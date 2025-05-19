
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import SideBarNavigation from './components/SideBarNavigation'
import LoginForm from './pages/LoginForm'
import { useDispatch, useSelector } from 'react-redux'
import SignupForm from './pages/SignUpForm'
import Loader from './components/Loader'
import { setupInterceptors } from './API/axiosInstance'
import { useEffect } from 'react'
import { fetchUser } from './Features/UserSlice'
import ProfilePage from './pages/ProfilePage'
import ChatApp from './pages/ChatApp'
import SavedPosts from './pages/SavedPosts'
import { ToastContainer } from 'react-toastify'

function App() {
const{login,loader}=useSelector((state)=>state.user)

const dispatch = useDispatch()
useEffect(() => {
  setupInterceptors(dispatch)
  }
, [])

useEffect(()=>{
  if(login){
    dispatch(fetchUser())
  }
},[login])


  return (
  
    <>
      <ToastContainer/>
     <BrowserRouter>
     {
      (loader &&   <Loader/>)
     }
   
     {
      login && <><Header/>
      <SideBarNavigation /></>
     }
     <Routes>
      <Route path='/' element={login ? <Home/> : <Navigate to={'/login'} />}></Route>
      <Route path='/signup' element={!login ? <SignupForm/> : <Navigate to={'/'} />}></Route>
      <Route path='/login' element={!login ?  <LoginForm/> : <Navigate to={'/'}/>}></Route>
      <Route path='/profile' element={login ? <ProfilePage/> : <Navigate to={'/login'} />}></Route>
      <Route path='/chats' element={login ? <ChatApp/> : <Navigate to={'/login'} />}></Route>
      <Route path='/saved' element={login ? <SavedPosts/> : <Navigate to={'/login'} />}></Route>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
