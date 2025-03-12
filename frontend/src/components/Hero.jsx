import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border-t-4 border-gray-200 mt-16 relative overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center py-10 sm:py-20 px-6 sm:px-12 space-y-8">
        <div className="text-gray-700 space-y-6">
          {/* Section Title */}
          <div className="flex items-center gap-3">
            <p className="w-8 sm:w-12 h-[2px] bg-gray-600"></p>
            <p className="font-semibold text-sm md:text-base text-gray-500 uppercase tracking-wider">OUR BESTSELLERS</p>
          </div>

          {/* Main Title */}
          <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl text-[#212121] leading-tight mb-6 tracking-tight">
            Latest Arrivals
          </h1>

          {/* Shop Now Section */}
          <div className="flex items-center gap-6 cursor-pointer group">
            <p className="font-semibold text-base text-gray-800 group-hover:text-black transition duration-300 ease-in-out">
              Shop Now
            </p>
            <div className="w-12 sm:w-16 h-[2px] bg-gray-800 transition-transform group-hover:w-24"></div>
          </div>
        </div>
      </div>

      {/* Hero Right Side (Image) */}
      <div className="w-full sm:w-1/2 relative">
        <img className="w-full h-full object-cover rounded-2xl shadow-xl transform transition-transform duration-700 hover:scale-110" src={assets.hero_img} alt="Hero Image" />
        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black opacity-40 rounded-2xl"></div>
      </div>
    </div>
  )
}

export default Hero;
