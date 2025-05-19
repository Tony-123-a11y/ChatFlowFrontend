import { useSelector } from "react-redux"
import CreatePost from "./CreatePost"
import PostCard from "./PostCard"
import axiosInstance from "../API/axiosInstance"
import { useEffect, useState } from "react"

export default function Feed() {
  const {login}= useSelector((state)=>state.user)

  const [posts, setposts] = useState([]);
  // console.log(posts)

  useEffect(() => {
    
    getAllPosts()
  
  }, [])
  const getAllPosts=async()=>{
      const res= await axiosInstance.get('/posts/getAllPosts')
      // console.log(res.data.posts)
      setposts([...res.data.posts])
   
    }

  return (
    <div className="space-y-4">
      <CreatePost />

    

      {/* Posts */}
      <div className="space-y-4">
        {posts?.map((post) => (
          <PostCard key={post._id} post={{...post}} getAllPosts={getAllPosts}/>
        ))}
      </div>
    </div>
  )
}


