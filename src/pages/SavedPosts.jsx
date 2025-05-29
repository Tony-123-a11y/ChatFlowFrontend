

import { useEffect, useState } from "react"
import {
  Bookmark,
} from "lucide-react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const SavedPosts = () => {
 
const {user}=useSelector((state=>state.user))
console.log(user)

  const [savedPosts,setsavedPosts] = useState()

useEffect(()=>{
  if(user){
   setsavedPosts(user.saved)
  }
},[user])




 

  
 

  return (
    <div className="bg-gray-50  overflow-hidden min-h-screen ">
      <div className="">
        {/* Header */}
      
          <div className="flex items-center mb-4 md:mb-0">
            <Bookmark className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Saved Posts</h1>
          </div>
         
      

      

       

      

        {/* Posts Grid/List */}
        {savedPosts?.length > 0 ? (
          <div
            className= "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-6 mt-5 rounded-xl bg-white p-4"
          >
            {savedPosts?.map((post) => (
              <div
                key={post._id}
                className="bg-gray-50 rounded-xl shadow-sm overflow-hidden"
              >
                {/* Post Image */}
                <div className= "flex-shrink-0 w-full">
                   {
                 
                  post.file?.map((file,index)=>{
                    const isVideo = file.type?.startsWith('video');
                    return isVideo ? <video key={index} src={file.url || "/placeholder.svg"} alt="Post content" className="w-full h-60 object-contain" controls />
                    : <img key={index} src={file.url || "/placeholder.svg"} alt="Post  content" className="w-full h-60 object-cover"  />
                  })
            
                }
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <Link to={'/profile'} state={user._id} className="flex items-center mb-3">
                      <img
                        src={post?.userId?.profilePic || "/placeholder.svg"}
                        alt={post?.userId?.name}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{post?.userId?.name}</p>
                        {/* <p className="text-xs text-gray-500">{post.author.username}</p> */}
                      </div>
                    </Link>
                   
                  </div>

                  <h3 className="font-bold text-lg  text-gray-900">{post.text}</h3>
                  {/* <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p> */}

                 
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Bookmark className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No saved posts found</h3>
           
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedPosts
