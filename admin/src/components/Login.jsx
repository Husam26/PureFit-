import axios from 'axios';
import React, { useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Using icons for the input fields
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = ({ setToken }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        navigate('/add'); // Navigate to '/add' page after successful login
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-300'>
      <div className='bg-gray-700 shadow-xl rounded-lg px-6 py-8 sm:px-8 sm:py-10 max-w-sm w-full'>
        <h1 className='text-3xl font-semibold text-center text-gray-100 mb-6'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          {/* Email Input */}
          <div className='mb-5'>
            <label className='text-sm font-medium text-gray-500 mb-2 block' htmlFor="email">Email Address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                className='w-full px-10 py-2 rounded-md border border-gray-500 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all'
                type="email"
                placeholder='your@email.com'
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className='mb-5'>
            <label className='text-sm font-medium text-gray-500 mb-2 block' htmlFor="password">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                className='w-full px-10 py-2 rounded-md border border-gray-500 bg-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-all'
                type="password"
                placeholder='Enter Your Password'
                required
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className='w-full bg-gray-500 text-white py-2 rounded-md text-lg font-medium hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all'
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-500'>
            Don't have an account? <a href='/register' className='text-gray-400 hover:underline'>Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
