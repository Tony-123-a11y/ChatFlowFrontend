import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from '../API/axiosInstance';
import { Socket } from 'socket.io-client';
import socket from '../API/SocketInstance';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';
import { Smile } from 'lucide-react';

const ChatAreaPage = () => {
  const [messageInput, setmessageInput] = useState("");
  const [emojiPicker, setemojiPicker] = useState(false);
  const handleInput=(e)=>{
     setmessageInput(e.target.value)
     setemojiPicker(false)
    
  }
  const handleEmoji=(e)=>{
  setmessageInput((prev)=>prev+e.emoji)
  }

  
       
          
    const toggleSidebar = () => {
      setShowSidebar(!showSidebar)
    }
 
  
  const location= useLocation()


  let {user}= useSelector((state)=>state.user)
  const {_id}=user

  const [messages, setmessages] = useState([

  ])

  const chatRef=useRef(null)

  


 async function getChat(){
     const res= await axiosInstance.get(`/messages/getMessage/${location.state._id}`)
    
     setmessages(res.data.message)
  }
  useEffect(()=>{
    if(user){
     getChat()  
    }
  },[user,location.state])

  useEffect(()=>{
    chatRef.current.scrollTop=chatRef.current.scrollHeight
  },[messages])
  

 async function handleSubmit(e){
     e.preventDefault()
    
     socket.emit('sendMessage',{text:messageInput,friendId:location.state._id,userId:_id})
     const res= await axiosInstance.post(`/messages/send/${location.state._id}`,{text:messageInput})
      setmessageInput('')
     getChat()
  }
useEffect(()=>{
  socket.on('replyMessage',(ans)=>{
    console.log(ans)
    setmessages((prev)=>[...prev,ans])
  })
},[])

  return (
    <div className=''>
      <div ref={chatRef}  className=" flex flex-col  h-[calc(100vh-108px)]   border-black  overflow-y-scroll">
        {/* Chat Header */}
        <div className="bg-white border-b sticky top-0 border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
           
            <Link to={'/profile'} state={location.state._id} className="relative">
              <img
                src={location.state.profilePic || "/placeholder.svg"}
                alt={location.state.name}
                className="w-10 h-10 rounded-full"
              />
            
            </Link>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-800 capitalize">
                {location.state.name}
              </h2>
             
            </div>
          </div>
        
        </div>

        {/* Messages */}
        <div className="flex-1  p-4   bg-gray-50 ">
          <div className="space-y-4">
            {messages.length>0 ? (
             messages.map((message) => (
                <div key={message._id} className={`flex ${message.userId == user._id ? "justify-end" : "justify-start"}`}>
               
                    <img
                      src={message.userId == user._id ? user.profilePic   : location.state.profilePic || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                 
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.userId == user._id 
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 flex justify-between items-center ${
                    message.userId == user._id ?  "text-blue-100" : "text-gray-500"
                      }`}
                    >
                     
                      
                    
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">No messages yet. Start a conversation!</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border border-gray-200 sticky bottom-0  p-4">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">
           
           <div className="relative   border-black flex-grow">
             <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 py-2 px-4 bg-gray-200 rounded-full w-full text-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              value={messageInput}
              onChange={handleInput}
            />
              <button onClick={()=>setemojiPicker(!emojiPicker)} className="flex items-center absolute  right-4 top-1/2 -translate-y-1/2 z-50 gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
              <Smile className="h-5 w-5" />
            </button>
       <div className="absolute left-0 bottom-full bg-white z-20 rounded-lg"> <EmojiPicker open={emojiPicker} onEmojiClick={handleEmoji} searchDisabled={true}/></div>
           </div>
            <button
            disabled={!messageInput.trim()}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatAreaPage
