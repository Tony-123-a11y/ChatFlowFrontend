import { Home, User, Users, Bookmark, Settings,  LogOut } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { updateChatting, updateLogin } from "../Features/UserSlice"
import { useState } from "react"

export default function SideBarNavigation() {
  const dispatch=useDispatch()
  const page= JSON.parse(localStorage.getItem('page')) || 0
  const [active, setactive] = useState(page);
  const {login,chatting,user}= useSelector((state)=>state.user)

  const menuItems = [
    { icon: <Home className="h-6 w-6" />, label: "Home" ,path:'/',chat:false},
    { icon: <User className="h-6 w-6" />, label: "Profile" ,path:'/profile',chat:false},
    { icon: <Users className="h-6 w-6" />, label: "Chats",path:'/chats',chat:true },
    { icon: <Bookmark className="h-6 w-6" />, label: "Saved" ,path:'/saved',chat:false},
    { icon: <Settings className="h-6 w-6" />, label: "Settings",path:'',chat:false },
   
  ]

  return (
    <div className={`h-screen  bg-gray-50 fixed px-2 py-6 ${chatting ? 'w-1/15' : 'w-1/6'}  w-1/6 top-16 `}>
    <div className=" rounded-xl  bg-white shadow-sm  p-4">
      <nav className="space-y-1 ">
        {menuItems.map((item, index) => (
          <button key={item.label} className="w-full " onClick={()=> {
            dispatch(updateChatting(item.chat))
            localStorage.setItem('page',index)
            setactive(index)
            }}>
          <Link
            key={index}
           to={item.path}
           state={user?._id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg  ${
              index==active
                ? "bg-gradient-to-r from-purple-50 to-blue-50 text-purple-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item.icon}
            {
              (!chatting &&  <span className="max-xl:hidden">{item.label}</span>)
            }
           
            
          </Link>
          </button>
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
      <LogOut className="h-6 w-6" />
      {
              (!chatting &&   <span>Logout</span>)
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
