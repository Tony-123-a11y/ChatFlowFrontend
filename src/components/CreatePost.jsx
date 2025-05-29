import { ImageIcon, Video, Smile, MapPin, SendHorizontal } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import {  useRef, useState } from "react"
import axiosInstance from "../API/axiosInstance";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { fetchUser } from "../Features/UserSlice";
export default function CreatePost() {
  const [inputValue, setinputValue] = useState('');
  const [emojiPicker, setemojiPicker] = useState(false);
  const userSlice= useSelector((state)=>state.user)


  const handleInput=(e)=>{
    const text= e.target.value
     setinputValue(text)
     setemojiPicker(false)
    
  }
  const handleEmoji=(e)=>{
  setinputValue((prev)=>prev+e.emoji)
  }

 async function handleCreatePost() {
  const formData = new FormData();

  // Add text
  formData.append('text', inputValue);

  // Add image and video files (if any)
  const allFiles = [...imageFile, ...videoFile];

  if (allFiles.length > 0) {
  allFiles.forEach((file) => {
    formData.append("files", file);
  });
}

  // Debug: Check what's inside formData
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axios.post('http://localhost:8080/posts/create', formData, {
      headers: {
        'Authorization': userSlice.token,
          // "Content-Type": "multipart/form-data"
        // Don't set Content-Type manually when using FormData — axios will do it for you.
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadPercent(percent);
      },
    });

    console.log(response.data);

    setinputValue('');
    toast.dismiss();
    toast.success('Posted Successfully', {
      position: 'top-center',
      hideProgressBar: true,
      closeOnClick: true,
      closeButton: false,
      autoClose: 2000,
      transition: Slide,
    });


  } catch (error) {
    console.error('Upload failed:', error);
    toast.error('Failed to post', {
      position: 'top-center',
      autoClose: 2000,
      transition: Slide,
    });
  }
}

const [imageFile, setimageFile] = useState([]);
const [videoFile, setvideoFile] = useState([]);
  function handleImage(e){
    const files= [...e.target.files]
  setimageFile(files)
  }
  function handleVideo(e){
    const files= [...e.target.files]
   setvideoFile(files)
  }




  return (
    <div className="bg-white rounded-xl shadow-sm p-4 "> 
      <div className="flex gap-3">
        <img src={userSlice.user?.profilePic} alt="Profile" className="h-10 w-10 object-cover object-center rounded-full" />
        <div className="flex-grow  border-black">
         <div className="relative">
          <button  onClick={handleCreatePost} className="absolute right-2 text-purple-500 top-1/2 -translate-y-1/2 cursor-pointer hover:text-purple-700 transition"><SendHorizontal size={20}/></button>
         <input  onChange={handleInput} value={inputValue}  className="w-full  px-6 py-2.5 bg-gray-100 rounded-full text-gray-500 outline-none transition-colors" placeholder="  What's on your mind?"/>
         <div className="absolute left-0 top-10 bg-white z-10 rounded-lg"> <EmojiPicker open={emojiPicker} onEmojiClick={handleEmoji} searchDisabled={true}/></div>
         </div>
         
        {
         imageFile.length>0 || videoFile.length>0 ? <div className="h-100 bg-white flex overflow-x-scroll mt-4">
          {
            imageFile.map((image,i)=>{
                 return <img src={URL.createObjectURL(image)} className="w-full h-full object-cover  border-black"/>
            })
          }
          {
            videoFile.map((vid,i)=>{
                 return <video src={URL.createObjectURL(vid)} className="w-full h-full object-cover border-black" controls></video>
            })
          }
         </div>
         :''
        }

          <div className="flex justify-between mt-3">
            <div className="flex">
              <label htmlFor="photo" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
              <ImageIcon className="h-5 w-5" />
              <span>Photo</span>
            </label>
            <input onChange={handleImage} multiple id='photo' type="file" className="hidden" />
            </div>
            <div className="flex">
              <label htmlFor="video" className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
              <Video className="h-5 w-5" />
              <span>Video</span>
            </label>
            <input onChange={handleVideo} multiple id='video' type="file" className="hidden" />
            </div>
          
            <button onClick={()=>setemojiPicker(!emojiPicker)} className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-purple-600 transition-colors cursor-pointer">
              <Smile className="h-5 w-5" />
              <span>Feeling</span>
            </button>
         
          </div>
        </div>
      </div>
    </div>
  )
}
