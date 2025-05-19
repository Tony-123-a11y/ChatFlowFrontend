import axios from "axios";
import { updateLoader, updateLogin } from "../Features/UserSlice";
import { Slide, toast } from "react-toastify";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers:{
        'Content-Type':'application/json'
    },
    cors:true,
    withCredentials:true
  });

  export const setupInterceptors = (dispatch)=>{

  
  axiosInstance.interceptors.request.use(function (config) {
    const authKey= JSON.parse(localStorage.getItem('authorization'))
const authKeySession= JSON.parse(sessionStorage.getItem('authorization'))

    // Do something before request is sent
    dispatch(updateLoader(true))
    if(authKey || authKeySession){
        config.headers.Authorization=  authKey?.token ||  authKeySession?.token
    }

    return config;
  }, function (error) {
    dispatch(updateLoader(false))
    // Do something with request error
    return Promise.reject(error);
  });

  axiosInstance.interceptors.response.use(function (response) {
    dispatch(updateLoader(false))
   
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    console.log(error)
    if(error.response.data.msg='msg expired'){
      toast.dismiss()
      toast.error('You were logged out!',{
        position:'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false,
             transition:Slide,
      })
      localStorage.removeItem('authorization')
        localStorage.removeItem('page')
        sessionStorage.removeItem('authorization')
         dispatch(updateLogin({login:false,token:'',user:''}))
    }
    dispatch(updateLoader(false))
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.status==409){
      toast.dismiss()
      toast.error('User already exists',{
        position:'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false,
             transition:Slide,
      })
    }
    if(error.status==404){
      toast.dismiss()
      toast.error('Something went wrong',{
        position:'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false,
             transition:Slide,
      })
    }
    
    if(error.status==401){
      toast.dismiss()
      toast.error('Email is not registered',{
        position:'top-center',
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false,
             transition:Slide,
      })
    }
    
    
    return Promise.reject(error);
  });
}

  export default axiosInstance