import { useState } from "react"
import ChatFriendList from "../components/ChatFriendList"
import ChatAreaPage from "./ChatAreaPage"
import { Outlet } from "react-router-dom"

const ChatApp = () => {

  return (
    <div className="max-h-[calc(100vh-68px)] shadow  border-black rounded-xl overflow-hidden  w-full bg-gray-100  ml-auto grid grid-cols-12 max-md:block">
      {/* Friends Sidebar */}
     <div className="col-span-3 h-full">
       <ChatFriendList/>
     </div>

      {/* Chat Area */}
      <div className="col-span-9  border-black ">
        <Outlet/>
      </div>
    </div>
  )
}

export default ChatApp
