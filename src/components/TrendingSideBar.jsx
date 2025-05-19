import { TrendingUp, Hash } from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function TrendingSidebar() {
  const {login}= useSelector((state)=>state.user)
  const trendingTopics = [
    { tag: "design", posts: "12.5k" },
    { tag: "technology", posts: "8.2k" },
    { tag: "webdevelopment", posts: "6.4k" },
    { tag: "artificialintelligence", posts: "5.7k" },
    { tag: "uxdesign", posts: "3.9k" },
  ]

  const suggestedUsers = [
    { name: "Jessica Williams", username: "@jessicaw", avatar: "placeholder.svg?height=40&width=40" },
    { name: "David Chen", username: "@davidc", avatar: "placeholder.svg?height=40&width=40" },
    { name: "Sarah Miller", username: "@sarahm", avatar: "placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="space-y-4">
      {/* Search - Mobile Only */}
      <div className="md:hidden relative mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
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

      {/* Trending Topics */}
     
      {/* Suggested Users */}
      {
        login ? <div className="bg-white rounded-xl shadow-sm p-4">
  
        <h2 className="font-medium text-gray-800 mb-4">Your chats</h2>
        <div className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={user.avatar || "placeholder.svg"} alt={user.name} className="h-10 w-10 rounded-full" />
                <div>
                  <h3 className="font-medium text-gray-800">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.username}</p>
                </div>
              </div>
              <button className="px-3 cursor-pointer py-1 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50 transition-colors">
                Chat
              </button>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 text-sm text-purple-600 font-medium hover:text-purple-700 cursor-pointer">Show more</button>
      </div>
      : <div className="flex-grow bg-white shadow-sm p-4 rounded-xl  border-black">
          <h1 className="text-gray-800 font-medium">Login to chat with your friends</h1>
          <Link to={'/login'} className="px-4 block w-full text-center font-medium rounded-xl mt-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition">Login</Link>
      </div>
}

      {/* Footer Links */}
      <div className="p-4">
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="hover:underline">
            Accessibility
          </a>
          <a href="#" className="hover:underline">
            Ads Info
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Status
          </a>
          <a href="#" className="hover:underline">
            Careers
          </a>
        </div>
        <p className="mt-4 text-xs text-gray-500">© 2023 SocialHub, Inc.</p>
      </div>
    </div>
  )
}
