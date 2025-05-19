import { Bookmark, Camera, Handshake, Heart, MessageCircle, Share2, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axiosInstance from "../API/axiosInstance"
import { useSelector } from "react-redux"
import { CiCamera } from "react-icons/ci"
import axios from "axios"
import PostCard from "../components/PostCard"
const ProfilePage = () => {
const location=useLocation()

const id=location.state
const {user}= useSelector((state)=>state.user)

const [friendUser,setfriendUser] = useState({})
const [posts,setposts] = useState([])
const follow= friendUser.followers?.some((follow_id)=> follow_id==user._id)


  useEffect(()=>{
        getDetails()
  },[id])

  async function getDetails(){
      const res= await axiosInstance.get(`/users/getFriendDetails/${id}`)
      setposts(res.data.friendDetails.posts)
      setfriendUser(res.data.friendDetails)
  }


async function handleFollow(){
   const res= await axiosInstance.patch(`/users/follow/${id}`)
   if(res.status==201){
    getDetails()
   }
}

    // console.log(userSlice)

    const handleCoverChanger = async(e)=>{
         let file = e.target.files[0];
        console.log(file)
        let formData = new FormData();
        formData.append('file',file);
      
           formData.append('upload_preset', 'directLink')

  
try {
  
   const response = await axios.post('https://api.cloudinary.com/v1_1/dzbqf7dfr/upload', formData)


        let data = response.data;
      

        let res = await axiosInstance.put('/users/update',{coverPic:data.secure_url})
        getDetails()

} catch (error) {
  console.log(error)
}
    }

    
    const handleProfileChanger = async(e)=>{
        let file = e.target.files[0];
        console.log(file)
        let formData = new FormData();
        formData.append('file',file);
        // formData.append('upload_preset','myData')
           formData.append('upload_preset', 'directLink')

            for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }
try {
  
   
            const response = await axios.post('https://api.cloudinary.com/v1_1/dzbqf7dfr/upload', formData)


        let data = response.data;
      

        let res = await axiosInstance.put('/users/update',{profilePic:data.secure_url})
        getDetails()

} catch (error) {
  console.log(error)
}
}
  return (
    <div className="min-h-screen  ml-auto  shadow-sm  w-5/6 bg-gray-50  px-2 py-6 ">
    <div className="bg-white rounded-lg ">
      {/* Cover Photo */}
      <div className=" relative h-100  w-full  rounded-lg overflow-hidden">
         <label htmlFor="cover" className='absolute right-7 bottom-7 cursor-pointer bg-black/30 rounded-full w-10 flex items-center justify-center h-10'>
            <CiCamera color='white' size={30}  />
            <input onChange={handleCoverChanger}  id='cover' hidden type="file" />
        </label>
        <img src={friendUser.coverPic || "/placeholder.svg"} alt="Cover" className="w-full h-full object-center object-cover" />
      </div>

      {/* Profile Info Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Profile Photo and Actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow relative bg-white">
               <label htmlFor="profile" className='absolute -left-4 bottom-2 cursor-pointer bg-black/30 rounded-full w-10 flex items-center justify-center h-10'>
            <CiCamera color='white' size={30}  />
            <input onChange={handleProfileChanger} id='profile' hidden type="file" />
        </label>
              <img
                src={friendUser.profilePic || "/placeholder.svg"}
                alt={friendUser.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="mt-4 md:mt-0 md:ml-6 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{friendUser.name}</h1>
              <p className="text-gray-600">{friendUser.username}</p>
            </div>
          </div>
          {
            (user?._id!=id &&   <div className="mt-4 md:mt-0 flex space-x-3">
              {
                (follow && <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full font-medium text-sm transition">
                  Message
                </button>)
              }
             {
              follow ? <button onClick={handleFollow} className="px-4 py-2 flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r  from-blue-500 to-purple-500 hover:bg-blue-600 text-white rounded-full font-medium text-sm transition">
             <span className="tracking-wide"> Following</span>
              <Handshake size={20} />
            </button> : <button onClick={handleFollow} className="px-4 py-2 flex justify-center items-center gap-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium text-sm transition">
              <span className="tracking-wide">Follow</span>
              <UserPlus size={20} />
            </button>
             }
            </div>)
          }
        
        </div>

      
        
        {/* Stats */}
        <div className="mt-6 flex justify-start gap-8 ">
          <div className="text-center  py-4 flex items-center justify-center gap-2 ">
            <div className="font-bold text-gray-900">{posts.length}</div>
            <div className=" text-gray-600">{posts.length > 1 ? 'Posts' : 'Post'}</div>
          </div>
          <div className="text-center  py-4 flex items-center justify-center gap-2 ">
            <div className="font-bold text-gray-900">{friendUser.followers?.length}</div>
            <div className=" text-gray-600">Followers</div>
          </div>
          <div className="text-center  py-4 flex items-center justify-center gap-2">
            <div className="font-bold text-gray-900">{friendUser.followings?.length}</div>
            <div className=" text-gray-600">Following</div>
          </div>
        </div>

        {/* Content Tabs */}
       

        {/* Posts */}
        <div className="mt-6 space-y-6 ">
          {
            (posts.length<1 && <div className="h-100 shadow-sm flex items-center justify-center">
            <div className="flex flex-col justify-center items-center ">
            <Camera size={35}/>
                <h1 className=" font-semibold text-lg">No posts yet</h1>
            </div>
            </div>)
          }
          {posts.map((post) => (
            <PostCard key={post._id} post={{...post}}/>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProfilePage
