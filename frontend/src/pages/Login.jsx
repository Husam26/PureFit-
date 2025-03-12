import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token , setToken , navigate , backendUrl} =useContext(ShopContext);

  const [name,setName]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      
      if (currentState === 'Sign Up') {
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login', {email,password})
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
        }
        else{
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form 
        onSubmit={onSubmitHandler} 
        className="flex flex-col items-center w-[90%] sm:max-w-md m-auto p-10 rounded-xl shadow-2xl bg-white transition-all transform hover:scale-105 duration-500"
      >
        {/* Title Section */}
        <div className="inline-flex items-center gap-2 mb-6 animate__animated animate__fadeIn animate__delay-1s">
          <p className="prata-regular text-3xl text-gray-800">{currentState}</p>
          <hr className="border-none h-[1.5px] w-12 bg-gray-800" />
        </div>

        {/* Conditional Name Field */}
        {currentState === 'Login' ? '' : 
          <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 transform hover:scale-105"
            placeholder="Name"
            required
          />
        }

        {/* Email and Password Fields */}
        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
          type="email"
          className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 transform hover:scale-105"
          placeholder="Email"
          required
        />
        <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
          type="password"
          className="w-full px-4 py-3 mb-6 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-600 transition-all duration-300 transform hover:scale-105"
          placeholder="Password"
          required
        />

        {/* Forgot Password & Account Toggle */}
        <div className="w-full flex justify-between text-sm text-gray-600 mb-6">
          {currentState === 'Sign Up' ? '' : <p className="cursor-pointer hover:text-gray-800">Forgot your password?</p>}
          {
            currentState === 'Login' ? 
            <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer text-gray-800 hover:text-gray-900">Create an account</p> : 
            <p onClick={() => setCurrentState('Login')} className="cursor-pointer text-gray-800 hover:text-gray-900">Already have an account? Login</p>
          }
        </div>

        {/* Submit Button */}
        <button className="bg-black text-white font-light px-8 py-3 mt-4 rounded-xl transition-all transform hover:bg-gray-800 active:bg-gray-900 w-full hover:scale-105 duration-300">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  )
}

export default Login
