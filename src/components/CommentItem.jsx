"use client"

import { useState } from "react"
import { Heart, CornerDownRight, MoreHorizontal } from "lucide-react"
import CommentForm from "./CommentForm"

export default function CommentItem({ comment, onToggleLike, onAddReply }) {
  const [isReplying, setIsReplying] = useState(false)
  const [showReplies, setShowReplies] = useState(true)

  const handleReplySubmit = (content) => {
    onAddReply(comment.id, content)
    setIsReplying(false)
  }
  // console.log(comment)

  return (
    <div className="space-y-3">
      {/* Main Comment */}
      <div className="flex gap-3">
        <img
          src={comment.userId?.profilePic || "/placeholder.svg"}
          alt={comment.userId?.name}
          className="h-8 w-8 rounded-full object-cover object-center flex-shrink-0"
        />
        <div className="flex-1">
                
          <div className="bg-gray-100 rounded-lg px-3 py-2">
             <h4 className="text-sm font-medium text-gray-500">{comment.userId?.name}</h4>
            <p className="text-gray-800 mt-1">{comment.text}</p>
          </div>

          {/* Comment Actions */}
          {/* <div className="flex items-center gap-4 mt-1 ml-1">
            <button
              onClick={() => onToggleLike(comment.id)}
              className={`flex items-center gap-1 text-xs ${comment.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500 transition-colors`}
            >
              <Heart className={`h-4 w-4 ${comment.isLiked ? "fill-red-500 text-red-500" : ""}`} />
              <span>
                {comment.likes} {comment.likes === 1 ? "like" : "likes"}
              </span>
            </button>
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              <CornerDownRight className="h-4 w-4" />
              <span>Reply</span>
            </button>
            <span className="text-xs text-gray-400">{comment.time}</span>
          </div> */}

          {/* Reply Form */}
          {isReplying && (
            <div className="mt-3">
              <CommentForm onSubmit={handleReplySubmit} placeholder={`Reply to ${comment.userId?.name}...`} autoFocus />
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 space-y-3">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <img
                src={reply.userId?.avatar || "/placeholder.svg"}
                alt={reply.userId?.name}
                className="h-8 w-8 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-gray-900">{reply.userId?.name}</h4>
                      <span className="text-xs text-gray-500">{reply.userId?.username}</span>
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-gray-800 mt-1">{reply.content}</p>
                </div>

                {/* Reply Actions */}
                <div className="flex items-center gap-4 mt-1 ml-1">
                  <button
                    onClick={() => onToggleLike(reply.id, true, comment.id)}
                    className={`flex items-center gap-1 text-xs ${reply.isLiked ? "text-red-500" : "text-gray-500"} hover:text-red-500 transition-colors`}
                  >
                    <Heart className={`h-4 w-4 ${reply.isLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span>
                      {reply.likes} {reply.likes === 1 ? "like" : "likes"}
                    </span>
                  </button>
                  <span className="text-xs text-gray-400">{reply.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
