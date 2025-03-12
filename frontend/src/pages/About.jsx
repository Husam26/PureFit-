import React from 'react'
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className="bg-gray-50">
      <div className='text-3xl text-center pt-24 pb-8 font-semibold text-gray-800'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className="my-16 flex flex-col md:flex-row gap-16 px-6">
        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            className="w-full rounded-xl shadow-lg transform transition-all hover:scale-105"
            src={assets.about_img} 
            alt="About Us"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-center gap-8 md:w-2/4 text-gray-700">
          <p className="text-lg leading-relaxed">
            Welcome to our store! We are a passionate team of fashion enthusiasts dedicated to bringing you the latest trends and timeless styles. From everyday essentials to standout pieces, we offer a curated selection of high-quality clothing to fit every lifestyle.
          </p>
          <p className="text-lg leading-relaxed">
            Our collections are designed to inspire confidence and help you express your unique style. Whether you're looking for casual wear, elegant outfits, or something in between, we’ve got you covered with pieces that are as fashionable as they are comfortable.
          </p>

          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <b className='text-xl text-gray-800'>OUR MISSION</b>
            <p className="mt-4 text-lg leading-relaxed">
              Our mission is to provide stylish, high-quality clothing at affordable prices. We believe fashion should be inclusive, accessible, and empowering for everyone. Our commitment to sustainability means we work with ethical manufacturers, ensuring that every piece is made with care for both the environment and the people who create it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='text-3xl py-4 text-center text-gray-800 font-semibold'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm gap-8 px-6'>
        {/* Quality Assurance */}
        <div className='bg-white shadow-lg p-8 rounded-lg transform transition-all hover:scale-105'>
          <div className='flex items-center gap-4'>
            <div className='text-3xl text-gray-800'>
              <i className="fas fa-check-circle"></i>
            </div>
            <b className='text-lg text-gray-800'>Quality Assurance</b>
          </div>
          <p className='text-gray-600 mt-4'>
            We take quality seriously. Each item in our collection undergoes thorough quality checks to ensure the best fabric, fit, and finish. Our products are made to last and are designed to bring you comfort and style all year round.
          </p>
        </div>

        {/* Convenience */}
        <div className='bg-white shadow-lg p-8 rounded-lg transform transition-all hover:scale-105'>
          <div className='flex items-center gap-4'>
            <div className='text-3xl text-gray-800'>
              <i className="fas fa-shipping-fast"></i>
            </div>
            <b className='text-lg text-gray-800'>Convenience</b>
          </div>
          <p className='text-gray-600 mt-4'>
            Shopping with us is easy and hassle-free. With our intuitive website, you can browse and shop from the comfort of your home, with fast and reliable shipping options that deliver right to your doorstep. Plus, our simple returns process ensures that you’re always satisfied with your purchase.
          </p>
        </div>

        {/* Exceptional Customer Service */}
        <div className='bg-white shadow-lg p-8 rounded-lg transform transition-all hover:scale-105'>
          <div className='flex items-center gap-4'>
            <div className='text-3xl text-gray-800'>
              <i className="fas fa-headset"></i>
            </div>
            <b className='text-lg text-gray-800'>Exceptional Customer Service</b>
          </div>
          <p className='text-gray-600 mt-4'>
            Our customer service team is here to assist you every step of the way. Whether you have questions about sizing, shipping, or need styling advice, we are just a message away. We pride ourselves on providing a friendly, responsive, and helpful experience for all our customers.
          </p>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="mt-16">
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About
