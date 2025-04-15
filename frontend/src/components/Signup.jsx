import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import axios from "axios";
import toast from 'react-hot-toast';
function Signup() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigateTo= useNavigate();

  const handleRegister = async(e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('https://todo-app-backend-aav1.onrender.com/user/signup',{
        username,
        email,
        password,
      },{
        withCredentials:true,
        headers:{
          "Content-type":"application/json"
        }
      })
      toast.success(data.message || "User registered successfully")
      localStorage.setItem("jwt",data.token);
      navigateTo("/login")
      setUsername("")
      setEmail("")
      setPassword("")
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.errors || "User registeration failed!")
    }
  }

  return (
      <div className='flex h-screen items-center justify-center bg-gray=100'>
        <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
          <h2 className='text-2xl font-semibold text-center mb-5'>Signup</h2>
          <form onSubmit={handleRegister}>
            <div className='mb-4'>
              <label className='block mb-2 font-semibold' htmlFor=''>Username</label>
              <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='Type username'/>
            </div>
            <div className='mb-4'>
              <label className='block mb-2 font-semibold' htmlFor=''>Email</label>
              <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='Type Email'/>
            </div>
            <div className='mb-4'>
              <label className='block mb-2 font-semibold' htmlFor=''>Password</label>
              <input className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-700' 
               value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Type Password'/>
            </div>
            <button className='w-full p-3 bg-blue-500 text-white hover:bg-blue-900 duratioin-300 rounded-xl font-semibold'>Signup</button>
            <p className='mt-4 text-center text-gray-600'>Already have an account?{""} <Link className='text-blue-500 hover:underline' to="/login">Login</Link>{""}</p>
          </form>
        </div>
      </div>
    
  )
}

export default Signup;
