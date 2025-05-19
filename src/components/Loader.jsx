import React from 'react'

const Loader = () => {
  return (
    <div className='fixed h-screen bg-black/30 backdrop-blur-xs  left-0 top-0 w-full z-40 flex items-center pointer-events-none justify-center'>
      <span className="loader"></span>
    </div>
  )
}

export default Loader
