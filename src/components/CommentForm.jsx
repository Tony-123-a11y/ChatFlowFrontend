

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import axiosInstance from "../API/axiosInstance"
import { toast } from "react-toastify"

export default function CommentForm({ onSubmit, autoFocus = false ,post,getAllPosts}) {
  const [comment, setComment] = useState("")
  const inputRef = useRef(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   if (comment.trim()) {
  //     onSubmit(comment)
  //     setComment("")
  //   }
  // }
  const handlePostSubmit =async (e)=>{
      e.preventDefault()
        // let value = inputRef.current.value;
        try {
           let response = await axiosInstance.patch(`/posts/comment/${post._id}`,{
            text:comment
        })
        let data = response.data;
        toast.success(data.msg,{position:"bottom-right"})
      
        if(data){
           
            setComment("")
             getAllPosts()
        }
        } catch (error) {
          console.log(error)
        }
       
        
    }

  // Auto-resize textarea
  const handleInput = (e) => {
    const inputArea = e.target
    setComment(inputArea.value)

    // Reset height to auto to get the correct scrollHeight
    inputArea.style.height = "auto"

    // Set the height to the scrollHeight
    inputArea.style.height = `${Math.min(inputArea.scrollHeight, 150)}px`
  }

  return (
    <form onSubmit={handlePostSubmit} className="flex  gap-2 items-center w-full py-2">
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          value={comment}
          onChange={handleInput}
          placeholder="Write your comment..."
          rows="1"
          className="w-full resize-none border border-gray-300 focus:ring-1 focus:outline-none focus:ring-purple-500 focus:border-transparent appearance-none rounded-lg py-2  px-3 text-gray-700 "
        />
      </div>
      <button
        type="submit"
        disabled={!comment.trim()}
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          comment.trim()
            ? "bg-purple-600 text-white cursor-pointer hover:bg-purple-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        } transition-colors`}
      >
        <Send className="h-5 w-5 " />
      </button>
    </form>
  )
}
