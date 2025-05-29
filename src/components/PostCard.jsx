import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from "lucide-react"
import { toast } from "react-toastify"
import axiosInstance from "../API/axiosInstance"
import { useSelector } from "react-redux"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useState } from "react"
import CommentModal from "./CommentModal"

import Slider from "react-slick";
import { Link } from "react-router-dom"

export default function PostCard({ post,getAllPosts }) {
  const {user}= useSelector((state)=>state.user)
// console.log(post)
const [isOpen, setIsOpen] = useState(false);
  
    const handleLike = async()=>{
       try {
         let res = await axiosInstance.patch(`/posts/like/${post._id}`)
        getAllPosts()
       } catch (error) {
        console.log(error)
       }
    }
const handleSavePosts=async()=>{
 try {
   const res= await axiosInstance.patch(`/posts/savePosts/${post._id}`)
   getAllPosts()
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
    <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">

              {/* Post Header */}
              <Link to={'/profile'} state={post?.userId._id} className="p-4 flex items-center">
                <img
                  src={post.userId?.profilePic || "/placeholder.svg"}
                  alt={post.userId?.name}
                  className="w-10 h-10  rounded-full mr-3 object-cover object-center"
                />
                <div>
                  <div className="font-medium text-gray-900">{post.userId?.name}</div>
                  <div className="text-xs text-gray-500">{post.date}</div>
                </div>
              </Link>

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
                  isOpen && <CommentModal isOpen={isOpen} setIsOpen={setIsOpen} post={{...post}} getAllPosts={getAllPosts}/>
                }
        <button onClick={handleLike} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          {
          post.likes?.includes(user?._id) ?<FaHeart className="text-red-600" /> : <FaRegHeart />
          }
          <span className="text-sm font-medium ">Like</span>
        </button>
        <button onClick={()=>setIsOpen(true)} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-medium ">Comment</span>
        </button>
      
        <button onClick={handleSavePosts} className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg hover:bg-gray-100 transition-colors text-gray-600">
          <Bookmark className="h-5 w-5" />
          {
            user?.saved?.some((ele)=> ele._id==post._id) ? <span className="text-sm font-medium ">Saved</span> : <span className="text-sm font-medium ">Save</span>
          }
          
        </button>
      </div>
            </div>
  )
}
