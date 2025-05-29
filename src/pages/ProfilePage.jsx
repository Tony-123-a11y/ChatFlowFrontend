import { Bookmark, Camera, Handshake, Heart, MessageCircle, Share2, UserPlus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axiosInstance from "../API/axiosInstance"
import { useSelector } from "react-redux"
import { CiCamera } from "react-icons/ci"
import axios from "axios"
import PostCard from "../components/PostCard"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import CommentModal from "../components/CommentModal"
import Slider from "react-slick"
const ProfilePage = () => {
const location=useLocation()

const id=location.state
const {user}= useSelector((state)=>state.user)


const [friendUser,setfriendUser] = useState({})
console.log(friendUser)
const [posts,setposts] = useState([])
const follow= friendUser.followers?.some((follow_id)=> follow_id==user._id)


  useEffect(()=>{
        getDetails()
  },[id])

  async function getDetails(){
      const res= await axiosInstance.get(`/users/getFriendDetails/${id}`)
      setfriendUser(res.data.friendDetails)
      setposts(res.data.friendDetails.posts)
      
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
   const handleLike = async(post)=>{
        let res = await axiosInstance.patch(`/posts/like/${post._id}`)
        let data = res.data
        // console.log(data)
       getDetails()
    }
    const [isOpen, setIsOpen] = useState(false);
    const handleSavePosts=async(post)=>{
 try {
   const res= await axiosInstance.patch(`/posts/savePosts/${post._id}`)
 } catch (error) {
  console.log(error)
 }
}
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1, // Show up to 2 by default
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // One per view on mobile
        },
      },
    ],
  };
  return (
    <div className="shadow-sm min-h-screen border  pb-4">
    <div className="bg-white rounded-lg ">
      {/* Cover Photo */}
      <div className=" relative h-100  w-full  rounded-lg overflow-hidden">
        {user?._id==id &&  
         <label htmlFor="cover" className='absolute right-7 bottom-7 cursor-pointer bg-black/30 rounded-full w-10 flex items-center justify-center h-10'>
            <CiCamera color='white' size={30}  />
            <input onChange={handleCoverChanger}  id='cover' hidden type="file" />
        </label>
}
        <img src={friendUser.coverPic || "/placeholder.svg"} alt="Cover" className="w-full h-full object-center object-cover" />
      </div>

      {/* Profile Info Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Profile Photo and Actions */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col md:flex-row md:items-end">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow relative bg-white">
              {
                user?._id==id &&  
              
               <label htmlFor="profile" className='absolute -left-4 bottom-2 cursor-pointer bg-black/30 rounded-full w-10 flex items-center justify-center h-10'>
            <CiCamera color='white' size={30}  />
            <input onChange={handleProfileChanger} id='profile' hidden type="file" />
        </label>
}
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
                (follow && <Link to={'/chats/chatArea'} state={friendUser} className="px-4 py-2 bg-gray-200 cursor-pointer hover:bg-gray-300 rounded-full font-medium text-sm transition">
                  Message
                </Link>)
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
            <div className="flex flex-col justify-center text-black items-center ">
            <Camera size={35}/>
                <h1 className=" font-semibold text-lg ">No posts yet</h1>
            </div>
            </div>)
          }
          {posts.map((post) => (
           
             <div key={post._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            {console.log(post)}
            {console.log(friendUser.saved)}
                          {/* Post Header */}
                          <div className="p-4 flex items-center">
                            <img
                              src={friendUser?.profilePic || "/placeholder.svg"}
                              alt={friendUser?.name}
                              className="w-10 h-10  rounded-full mr-3 object-cover object-center"
                            />
                            <div>
                              <div className="font-medium text-gray-900">{friendUser.name}</div>
                              <div className="text-xs text-gray-500">{post.date}</div>
                            </div>
                          </div>
            
                          {/* Post Content */}
                          <div className="px-4 pb-2">
                            <p className="text-gray-800 capitalize">{post.text}</p>
                          </div>
            
                          {/* Post Image */}
                          <div className="w-full ">
                           
                             <Slider {...settings}>
                {
                 
                  post.file?.map((file,index)=>{
                    const isVideo = file.type?.startsWith('video');
                    return isVideo ? <video key={index} src={file.url || "/placeholder.svg"} alt="Post content" className="w-full h-130 object-contain" controls />
                    : <img key={index} src={file.url || "/placeholder.svg"} alt="Post  content" className="w-full h-130 object-cover"  />
                  })
            
                }
                </Slider>
                          
                          </div>
            
                          {/* Post Stats */}
                          <div className="px-4 py-2 text-sm text-gray-500 flex justify-between">
                            <div>{post.likes?.length} likes</div>
                            <div>
                              {post.comments?.length} comments
                            </div>
                          </div>
            
                          {/* Post Actions */}
                          <div className="px-2 py-1 border-t border-gray-100 flex items-center justify-between">
                            {
                              isOpen && <CommentModal isOpen={isOpen} setIsOpen={setIsOpen} post={{...post}} getDetails={getDetails}/>
                            }
                    <button onClick={()=>handleLike(post)} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                      {
                      post.likes?.includes(friendUser?._id) ?<FaHeart className="text-red-600" /> : <FaRegHeart />
                      }
                      <span className="text-sm font-medium ">Like</span>
                    </button>
                    <button onClick={()=>setIsOpen(true)} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm font-medium ">Comment</span>
                    </button>
                  
                    <button onClick={()=>handleSavePosts(post)} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
                      <Bookmark className="h-5 w-5" />
                       {
            friendUser?.saved?.some((ele)=> ele==post._id) ? <span className="text-sm font-medium ">Saved</span> : <span className="text-sm font-medium ">Save</span>
          }
                    </button>
                  </div>
                        </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProfilePage
