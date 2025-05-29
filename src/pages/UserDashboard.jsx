
import { useSelector } from "react-redux"
import Feed from "../components/Feed"
import TrendingSidebar from "../components/TrendingSideBar"
import SideBarNavigation from "../components/SideBarNavigation"
import { Outlet } from "react-router-dom"

export default function UserDashboard() {
  const {login}= useSelector((state)=>state.user)
  return (
    <div className="bg-gray-50  border-black  dark px-4 dark:text-white   ">
   
      <div className="  grid grid-cols-12  mx-auto py-6  border-black  gap-6 container max-xl:gap-4 max-md:block">
      <div className="col-span-2  max-lg:col-span-3 max-md:hidden">
        <SideBarNavigation />
      </div>
        <div className="col-span-10  max-lg:col-span-9 ">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
