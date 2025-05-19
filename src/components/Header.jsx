import { Search, Bell, MessageSquare, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import axiosInstance from "../API/axiosInstance"
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png'

export default function Header() {
  const [users, setusers] = useState([]);
  const {user}= useSelector((state)=>state.user)

  const handleSearch=async(e)=>{
     const input= e.target.value
     const res= await axiosInstance.get(`/users/searchUser?name=${input}`)
     setusers(res.data.users)
  }
  return (
    <header className="bg-white shadow-sm sticky top-0 z-100">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={'/'} className="flex items-center gap-2">
          <button className="lg:hidden mr-2">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
         <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
           <img src={logo} alt="" />
         </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            Chat Flow
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative max-w-md w-full mx-4">
          <ul className="absolute w-1/2 rounded-xl left-0 top-full overflow-hidden shadow-sm shadow-purple-200 bg-white ">
            {
              users.map((user,i)=>{
          return <li onClick={()=>setusers([])}  key={user?._id}>
            <Link to={'/profile'} state={user?._id} className="py-3 hover:bg-purple-50 transition duration-200  px-6 border-b border-gray-100  flex items-center justify-start gap-2">
                 <img src={user?.profilePic || 'placeholder.svg'} alt="" className="border border-purple-400 w-7 h-7 rounded-full object-cover"/>
                 <h1 className="tracking-wide">{user?.name}</h1>
                 </Link>
          </li>
              })
            }
           
          </ul>
          <input  onChange={handleSearch}
            type="text"
            placeholder="Search..."
            className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
            <Bell className="h-6 w-6 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition">
            <MessageSquare className="h-6 w-6 text-gray-600" />
          </button>
          <div className="flex items-center cursor-pointer transition">
            <img
              src={user?.profilePic}
              alt="Profile"
              className="h-10 w-10 rounded-full border-2 border-purple-500 object-cover object-center"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
