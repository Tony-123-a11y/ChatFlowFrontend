import { TrendingUp, Hash } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function TrendingSidebar() {
  const {login,user}= useSelector((state)=>state.user)
  console.log(user)
  const trendingTopics = [
    { tag: "design", posts: "12.5k" },
    { tag: "technology", posts: "8.2k" },
    { tag: "webdevelopment", posts: "6.4k" },
    { tag: "artificialintelligence", posts: "5.7k" },
    { tag: "uxdesign", posts: "3.9k" },
  ]
const [suggestedUsers, setsuggestedUsers] = useState();
  useEffect(() => {
         if(user){
          setsuggestedUsers(user?.followings)
         }
  }, [user])
  console.log(suggestedUsers)
  

  return (
    <div className="space-y-4 sticky top-22">
     
      {/* Suggested Users */}
      {
        login ? <div className="bg-white rounded-xl shadow-sm p-4 ">
  
        <h2 className="font-medium text-gray-800 mb-4">Chat with Your Friends</h2>
        <div className="space-y-4">
          {suggestedUsers?.map((friend, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={friend.profilePic || "placeholder.svg"} alt={friend.name} className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-800">{friend.name}</h3>
                  {/* <p className="text-sm text-gray-500">{user.username}</p> */}
                </div>
              </div>
              <Link to={'/chats/chatArea'} state={friend} className="px-3 cursor-pointer py-1 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition-colors">
                Chat
              </Link>
            </div>
          ))}
        </div>
        <Link to={'/chats'} className="w-full mt-5 block text-center text-sm text-purple-600 font-medium hover:text-purple-700 cursor-pointer">Show more</Link>
      </div>
      : <div className="flex-grow bg-white shadow-sm p-4 rounded-xl  border-black">
          <h1 className="text-gray-800 font-medium">Login to chat with your friends</h1>
          <Link to={'/login'} className="px-4 block w-full text-center font-medium rounded-xl mt-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition">Login</Link>
      </div>
}

      {/* Footer Links */}
      <div className="p-4">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-500">
          <Link to={'/about'} className="hover:underline">
            About
          </Link>
         
          <Link to={'/privacy'} className="hover:underline">
            Privacy Policy
          </Link>
          <Link to={'/terms'} className="hover:underline">
            Terms of Service
          </Link>
          
        </div>
        <p className="mt-4 text-xs text-gray-500">-- Created by Abhishek Yadav and Ayush Singh --</p>
      </div>
    </div>
  )
}
