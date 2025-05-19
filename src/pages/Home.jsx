
import { useSelector } from "react-redux"
import Feed from "../components/Feed"
import TrendingSidebar from "../components/TrendingSideBar"

export default function Homepage() {
  const {login}= useSelector((state)=>state.user)
  return (
    <div className="bg-gray-50 min-h-screen dark  dark:text-white w-5/6 ml-auto ">
   
      <div className="container mx-auto px-4 justify-between py-6 flex gap-6">
      
        {/* Main Content - Feed */}
        <div className=" flex-grow">
          <Feed />
        </div>

        {/* Right Sidebar - Trending */}
        <div className="hidden xl:block w-80 flex-shrink-0">
          <TrendingSidebar />
        </div>
      </div>
    </div>
  )
}
