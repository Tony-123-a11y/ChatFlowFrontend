import { useRef, useState } from "react"
import { FaGoogle, FaFacebook, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import axiosInstance from "../API/axiosInstance"
import { Bounce, Flip, Slide, toast, ToastContainer } from "react-toastify"


export default function SignupForm() {
  const navigate=useNavigate()
  const confirmPasswordRef=useRef(null)
  const [formData, setFormData] = useState({
    name:"",
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(formData.password!=confirmPasswordRef.current.value){
      confirmPasswordRef.current.style.borderColor="red"
      setTimeout(() => {
            confirmPasswordRef.current.style.borderColor=""
      }, 3000);
      toast.dismiss()
      return toast.error('Password mismatch',
        {
          position:'top-center',
          hideProgressBar: true,
          closeOnClick: true,
          closeButton:false,
          transition:Slide,
          autoClose:3000,
        }
      )
    }
  const res= await axiosInstance.post('/users/register',formData)
    if(res.status==200 || 201 ){
       navigate('/login')
    }
  
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg max-sm:h-full max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
      

      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Create Account</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
       
            <div className="relative flex items-center">
              <div className="absolute left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FaUser />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>
           
          

          <div className="relative flex items-center">
            <div className="absolute  left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Email address"
            />
          </div>

          <div className="relative flex items-center">
            <div className="absolute  left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FaLock />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute  right-0 flex items-center pr-3 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative flex items-center">
            <div className="absolute  left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <FaLock />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              ref={confirmPasswordRef}
              required
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Confirm password"
            />
            <button
              type="button"
              className="absolute  right-0 flex items-center pr-3 text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                required
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={!agreeToTerms}
            className={`w-full flex justify-center py-3 px-4  border border-transparent rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 font-medium transition duration-250 ease-in-out ${!agreeToTerms ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}`}
          >
            Create Account
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to={'/login'} href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>By signing up, you agree to our Terms and have read our Privacy Policy.</p>
        </div>
      </div>
    </div>
  )
}
