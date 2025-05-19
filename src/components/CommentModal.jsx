

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import CommentItem from "./CommentItem"
import CommentForm from "./CommentForm"

export default function CommentModal({ isOpen, post, setIsOpen, getAllPosts }) {
  const [comments, setComments] = useState([])
  const modalRef = useRef(null)
console.log(post)

  useEffect(() => {
  
 
      setComments(post.comments)
       
  }, [post])


 

  if (!isOpen) return null

  return (
    <div className="fixed  inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div ref={modalRef} className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Comments</h2>
          <button onClick={()=>setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Original Post */}
        {/* {post && (
          <div className="p-4 border-b">
            <div className="flex items-start gap-3">
              <img
                src={post.userId.profilePic || "/placeholder.svg"}
                alt={post.userId.name}
                className="h-10 w-10 rounded-full"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{post.userId.name}</h3>
                  <span className="text-sm text-gray-500">{post.userId.username}</span>
                </div>
                <p className="text-gray-800 mt-1">{post.text}</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No comments yet. Be the first to comment!</div>
          ) : (
            comments.map((comment,i) => (
              <CommentItem
                key={comment._id}
                comment={{...comment}}
               
                
              />
            ))
          )}
        </div>

        {/* Add Comment Form */}
        <div className="px-4">
          <CommentForm  placeholder="Write a comment..." post={post}  getAllPosts={getAllPosts}/>
        </div>
      </div>
    </div>
  )
}
