import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-around gap-12 sm:gap-4 text-center text-xs sm:text-sm md:text-base text-gray-700">
        {/* Easy Exchange Policy */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <img src={assets.exchange_icon} className="w-16 mb-5 transition-transform duration-300 ease-in-out transform hover:scale-110" alt="Easy Exchange" />
          <p className="font-semibold text-lg mb-2">Easy Exchange Policy</p>
          <p className="text-gray-500">We offer a hassle-free exchange policy</p>
        </div>

        {/* 7 Days Return Policy */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <img src={assets.quality_icon} className="w-16 mb-5 transition-transform duration-300 ease-in-out transform hover:scale-110" alt="7 Days Return" />
          <p className="font-semibold text-lg mb-2">7 Days Return Policy</p>
          <p className="text-gray-500">We provide a 7-day free exchange policy</p>
        </div>

        {/* Best Customer Support */}
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
          <img src={assets.support_img} className="w-16 mb-5 transition-transform duration-300 ease-in-out transform hover:scale-110" alt="Best Support" />
          <p className="font-semibold text-lg mb-2">Best Customer Support</p>
          <p className="text-gray-500">We provide 24/7 customer support</p>
        </div>
      </div>
    </div>
  );
}

export default OurPolicy;
