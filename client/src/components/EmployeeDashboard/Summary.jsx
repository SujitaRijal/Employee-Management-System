import React from 'react'
import { FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/authContext'


const Summary = () => {
    const {user}= useAuth();
  return (
    <div className='rounded flex bg-white shadow-lg mt-28 p-3'>
        <div className={`text-3xl flex justify-center items-center bg-blue-600 text-white px-4`}>
        {<FaUsers />}
        </div>
        <div className="pl-4 py-1 px-16">
            <p className='text-lg font-semibold'>Welcome Back</p>
            <p className='text-xl font-bold'>{user.name}</p>
        </div>

       
    </div>
  )
}

export default Summary