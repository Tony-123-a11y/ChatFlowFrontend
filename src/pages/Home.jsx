import React from 'react'
import Feed from '../components/Feed'
import TrendingSidebar from '../components/TrendingSideBar'

const Home = () => {
  return (
    <div className='grid grid-cols-6 gap-6 max-xl:gap-4'>
      {/* Main Content - Feed */}
        <div className="col-span-4 max-lg:col-span-6 max-md:block border-black">
          <Feed/>
        </div>

        {/* Right Sidebar - Trending */}
        <div className="col-span-2 max-lg:hidden"> 
          <TrendingSidebar />
        </div>
    </div>
  )
}

export default Home
