
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axiosInstance from '../API/axiosInstance';

const ChatFriendList = () => {
   
      const [friends, setfriends] = useState([]);
      const {user}= useSelector((state)=>state.user)
        // const filteredFriends = friends?.filter((friend) => friend.name?.toLowerCase().includes(searchInput.toLowerCase()))
        const [showSidebar, setShowSidebar] = useState(true)
        
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }
    const [selectedFriend, setSelectedFriend] = useState(1)


   
  
       
    async function getContacts (){
  
      const res= await axiosInstance.get('/messages/getContacts')
      console.log(res.data.contacts)
      res.data.contacts?.forEach((ele)=>{
             console.log(ele)
             const friend= ele.members.find((member)=>member._id != user._id)
             friend.lastMessage= ele.message[ele.message?.length-1]
             setfriends((prev)=> [...prev,friend])
      })
      
    }
    useEffect(()=>{
        if(user){  
         getContacts()
        }
    },[user])
  return (
    <div className='h-full '>
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 fixed md:relative md:translate-x-0 z-20  h-full bg-white border-r border-gray-200 flex flex-col`}
      >
         <button className="md:hidden mr-2 text-gray-600 fixed z-20 block -right-2 top-6" onClick={toggleSidebar}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <Link to={'/profile'} state={user._id} className="flex items-center">
            <img src={user.profilePic} alt="Your profile" className="w-10 h-10 rounded-full object-cover mr-3" />
            <div>
              <h2 className="font-semibold text-gray-800">{user.name}</h2>
              
            </div>
          </Link>
          
        </div>

        {/* Search */}
        {/* <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search friends..."
              className="w-full py-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div> */}

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto shadow px-2">
          <div className="">
            <h3 className="text-xs py-4 px-4 font-semibold text-gray-500 uppercase tracking-wider mb-2">Recent Chats</h3>
            <div className="space-y-1">
              {friends.map((friend) => {
              return <div  key={friend._id}>
                 <Link to={'/chats/chatArea'} state={friend}
                 
                  className={`flex items-center gap-2 p-2  bg-gray-50 border rounded-xl border-gray-100  cursor-pointer  ${
                    selectedFriend === friend._id ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedFriend(friend._id)
                    if (window.innerWidth < 768) {
                      setShowSidebar(false)
                    }
                  }}
                >
                  <div className="relative">
                    <img
                      src={friend.profilePic || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-center flex-col gap-1 items-start">
                      <h3 className="text-sm font-medium text-gray-900 capitalize">{friend.name}</h3>
                      <span className="text-sm text-gray-600">{friend.lastMessage.text}</span>
                    </div>
                   
                  </div>
                </Link>
              </div>
})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatFriendList
