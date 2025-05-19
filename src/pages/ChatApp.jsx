import { useState } from "react"

const ChatApp = () => {
 
  const [friends] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
  unreadCount: 3,
      isTyping: false,
    },
    {
      id: 2,
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
     unreadCount: 0,
      isTyping: true,
    },
    {
      id: 3,
      name: "Taylor Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    unreadCount: 0,
      isTyping: false,
    },
   
  ])


  const [conversations] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: "Hey there! How's it going?",
        timestamp: "10:30 AM",
        isRead: true,
      },
      {
        id: 2,
        senderId: "me",
        text: "Hi Alex! I'm doing well, thanks for asking. How about you?",
        timestamp: "10:32 AM",
        isRead: true,
      },
      {
        id: 3,
        senderId: 1,
        text: "I'm great! Just working on that project we discussed last week.",
        timestamp: "10:33 AM",
        isRead: true,
      },
      {
        id: 4,
        senderId: 1,
        text: "Do you have time to catch up later today?",
        timestamp: "10:34 AM",
        isRead: false,
      },
      {
        id: 5,
        senderId: 1,
        text: "I have some new ideas I'd like to share with you.",
        timestamp: "10:35 AM",
        isRead: false,
      },
    ],
    2: [
      {
        id: 1,
        senderId: 2,
        text: "Did you see the latest update?",
        timestamp: "Yesterday",
        isRead: true,
      },
      {
        id: 2,
        senderId: "me",
        text: "Not yet, what's new?",
        timestamp: "Yesterday",
        isRead: true,
      },
    ],
  })

  // State for UI
  const [selectedFriend, setSelectedFriend] = useState(1)
  const [messageInput, setMessageInput] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [showSidebar, setShowSidebar] = useState(true)

  // Filter friends based on search
  const filteredFriends = friends.filter((friend) => friend.name.toLowerCase().includes(searchInput.toLowerCase()))

  // Handle sending a new message
  const handleSendMessage = (e) => {
    e.preventDefault()
    if (messageInput.trim() === "") return

    // In a real app, you would send this to an API
    // For now, we'll just clear the input
    setMessageInput("")
  }


  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="flex h-screen bg-gray-100 w-14/15 ml-auto">
      {/* Friends Sidebar */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } transform transition-transform duration-300 fixed md:relative md:translate-x-0 z-20 w-80 h-full bg-white border-r border-gray-200 flex flex-col`}
      >
        {/* User Profile */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="Your profile" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h2 className="font-semibold text-gray-800">Ayush Singh</h2>
              
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 md:hidden" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
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
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto shadow">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Recent Chats</h3>
            <div className="space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center p-2 rounded-lg cursor-pointer shadow ${
                    selectedFriend === friend.id ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setSelectedFriend(friend.id)
                    if (window.innerWidth < 768) {
                      setShowSidebar(false)
                    }
                  }}
                >
                  <div className="relative">
                    <img
                      src={friend.avatar || "/placeholder.svg"}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full"
                    />
                  
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-gray-900">{friend.name}</h3>
                      <span className="text-xs text-gray-500">{friend.lastSeen}</span>
                    </div>
                   
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden mr-2 text-gray-600" onClick={toggleSidebar}>
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
            <div className="relative">
              <img
                src={friends.find((f) => f.id === selectedFriend)?.avatar || "/placeholder.svg"}
                alt={friends.find((f) => f.id === selectedFriend)?.name}
                className="w-10 h-10 rounded-full"
              />
            
            </div>
            <div className="ml-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {friends.find((f) => f.id === selectedFriend)?.name}
              </h2>
             
            </div>
          </div>
        
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {conversations[selectedFriend] ? (
              conversations[selectedFriend].map((message) => (
                <div key={message.id} className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}>
                  {message.senderId !== "me" && (
                    <img
                      src={friends.find((f) => f.id === selectedFriend)?.avatar || "/placeholder.svg"}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full mr-2 self-end"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === "me"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-white text-gray-800 rounded-bl-none shadow"
                    }`}
                  >
                    <p>{message.text}</p>
                    <div
                      className={`text-xs mt-1 flex justify-between items-center ${
                        message.senderId === "me" ? "text-blue-100" : "text-gray-500"
                      }`}
                    >
                      <span>{message.timestamp}</span>
                      {message.senderId === "me" && (
                        <span>
                          {message.isRead ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                      )}
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
        <div className="bg-white border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex items-center">
            <button type="button" className="text-gray-500 hover:text-gray-700 mr-2" title="Attach a file">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 py-2 px-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button type="button" className="text-gray-500 hover:text-gray-700 mx-2" title="Send an emoji">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default ChatApp
