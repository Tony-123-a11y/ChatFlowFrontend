
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'

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
import ChatAreaPage from './pages/ChatAreaPage'
import EmptyChat from './pages/EmptyChat'
import { connectSocket } from './Features/SocketSlice'
import UserDashboard from './pages/UserDashboard'
import Home from './pages/Home'
import About from './pages/About'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Settings from './pages/Settings'
import TermsOfService from './pages/TermsOfServices'
import { BottomNav } from './components/BottomNav'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
};
function App() {
const{login,loader,user}=useSelector((state)=>state.user)

const dispatch = useDispatch()
useEffect(() => {
  setupInterceptors(dispatch)
  }
, [])

useEffect(()=>{
  if(login){
    console.log('hello')
    dispatch(fetchUser())
  }
},[login])

 useEffect(() => {
        if(user){
         dispatch(connectSocket(user._id)) 
         console.log('hello socket')
        }
       
       }, [user])


  return (

    <>
      
      <ToastContainer/>
     <BrowserRouter>
     <ScrollToTop/>
     {
      (loader &&   <Loader/>)
     }
   
     {
      login && <><Header/>
      </>
     }
     <Routes>
      <Route path='/' element={login ? <UserDashboard/> : <Navigate to={'/login'} />}>
      
       <Route index path='/' element={login ? <Home/> : <Navigate to={'/login'} />}/>
       <Route path='profile' element={login ? <ProfilePage/> : <Navigate to={'/login'} />}/>
       <Route path='saved' element={login ? <SavedPosts/> : <Navigate to={'/login'} />}/>
       <Route path='chats' element={login ? <ChatApp/> : <Navigate to={'/login'} />}>
      <Route index  element={<EmptyChat/>}/>
        <Route  path='chatArea' element={<ChatAreaPage/>}/>
        </Route>
        <Route path='settings' element={<Settings/>}/>
     </Route>
     
      <Route path='/signup' element={!login ? <SignupForm/> : <Navigate to={'/'} />}></Route>
      <Route path='/login' element={!login ?  <LoginForm/> : <Navigate to={'/'}/>}></Route>
     <Route path='/about' element={<About/>}/>       
     <Route path='/privacy' element={<PrivacyPolicy/>}/>       
     <Route path='/terms' element={<TermsOfService/>}/>       
        
      
     

     </Routes>
     <BottomNav/>
     </BrowserRouter>
    </>
  )
}

export default App
