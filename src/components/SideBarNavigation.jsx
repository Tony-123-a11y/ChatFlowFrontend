import { Home, User, Users, Bookmark, Settings,  LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { updateChatting, updateLogin } from "../Features/UserSlice"
import { useState } from "react"

export default function SideBarNavigation() {
  const dispatch=useDispatch()
  const {login,chatting,user}= useSelector((state)=>state.user)

  const menuItems = [
    { icon: <Home size={22} />, label: "Home" ,path:'/'},
    { icon: <User size={22} />, label: "Profile" ,path:'/profile'},
    { icon: <Users size={22} />, label: "Chats",path:'/chats',chat:true },
    { icon: <Bookmark size={22} />, label: "Saved" ,path:'/saved'},
   
   
  ]
   const linkClasses = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3  rounded-lg  ${
              isActive
                ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`;

  return (
    <div className={` bg-gray-50 sticky  top-22 `}>
    <div className=" rounded-xl  bg-white shadow-sm p-2">
      <nav className="space-y-1 ">
        {menuItems.map((item, index) => (
          <NavLink 
            key={index}
           to={item.path}
           state={user?._id}
            className={linkClasses}
           >
             {item.icon}
            {
              (!chatting &&  <span className="">{item.label}</span>)
            }
           
            
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-200 my-4 "></div>
     
     {
      login ? <button onClick={()=>{
        localStorage.removeItem('authorization')
        localStorage.removeItem('page')
        sessionStorage.removeItem('authorization')
         dispatch(updateLogin({login:false,token:'',user:''}))
         
      }}
      className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <LogOut size={26} />
      {
              (!chatting &&   <span className="">Logout</span>)
            }
     
    </button>

    : <Link to={'/login'}
    className="flex items-center gap-3 px-4 py-3 cursor-pointer rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
  >
    <LogOut className="h-6 w-6" />
    
    <span>Login</span>
  </Link>

  
     }
      
    </div>
    </div>
  )
}
