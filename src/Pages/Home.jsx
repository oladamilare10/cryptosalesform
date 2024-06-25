import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'

const Home = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate("/Crypto")
  }, 3000);
  return (
    <div className='flex h-screen'>
      <div className='m-auto'>
        <FaSpinner className='w-6 animate-spin' />
      </div>
    </div>
  )
}

export default Home
