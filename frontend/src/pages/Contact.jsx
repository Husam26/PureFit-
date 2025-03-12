import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className="bg-gray-50">
      {/* Title Section */}
      <div className='text-center text-3xl font-semibold pt-24 pb-8 text-gray-800'>
        <Title text1={'CONTACT '} text2={'US'} />
      </div>

      {/* Parallax Background Effect */}
      <div className="parallax-bg my-16 flex flex-col md:flex-row gap-16 px-6 md:px-16">

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            className="w-full rounded-xl shadow-lg transform transition-all hover:scale-105"
            src={assets.contact_img}
            alt="Contact Us"
          />
        </div>

        {/* Contact Info */}
        <div className='flex flex-col justify-center items-start gap-10 md:w-1/2'>
          {/* Store Address Section */}
          <div className='animate__animated animate__fadeIn'>
            <p className='font-semibold text-2xl text-gray-800'>
              Our Store
            </p>
            <p className='text-gray-600 text-lg'>
              987 Fashion Street, Suite 104 <br />
              New York, NY, 10001, USA
            </p>
          </div>

          {/* Get in Touch Section */}
          <div className='animate__animated animate__fadeIn animate__delay-1s'>
            <p className='font-semibold text-2xl text-gray-800'>
              Get in Touch
            </p>
            <p className='text-gray-600 text-lg'>
              📞 Tel: (212) 555-0147 <br />
              📧 Email: support@purefitapparel.com
            </p>
          </div>

          {/* Careers Section */}
          <div className='animate__animated animate__fadeIn animate__delay-2s'>
            <p className='font-semibold text-2xl text-gray-800'>
              Careers at Purefit
            </p>
            <p className='text-gray-600 text-lg'>
              Interested in joining our team? <br />
              Explore exciting career opportunities with us.
            </p>
            {/* Enhanced Button */}
            <button className='mt-6 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition-all rounded-lg shadow-lg transform hover:scale-105'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Add a Floating Action Button (FAB) for 'Get Directions' */}
      <a href="https://www.google.com/maps/place/987+Fashion+Street,+Suite+104,+New+York,+NY+10001" target="_blank" rel="noopener noreferrer">
        <button 
          className="fixed bottom-10 right-10 bg-blue-600 text-white rounded-full p-4 shadow-lg transform transition-all hover:scale-110 z-50"
          style={{ 
            position: 'fixed', 
            bottom: '20px', 
            right: '20px', 
            zIndex: 1000, 
            padding: '12px 16px', 
            fontSize: '24px' 
          }}
        >
          📍
        </button>
      </a>


      {/* Newsletter Section */}
      <NewsLetterBox />
    </div>
  )
}

export default Contact
