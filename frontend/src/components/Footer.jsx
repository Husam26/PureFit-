import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 pt-20 mt-auto">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 text-sm sm:text-base">
          {/* Logo and Description */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <img src={assets.logo} className="mb-5 w-32" alt="Purefit Logo" />
            <p className="text-gray-600 sm:w-3/4">
              Discover the latest trends in fashion with Purefit. From casual wear to stylish accessories, we bring you quality and comfort in every piece.
            </p>
          </div>

          {/* Company Links */}
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold mb-4">COMPANY</p>
            <ul className="space-y-2 text-gray-600">
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Home</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Delivery</li>
              <li className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <p className="text-xl font-semibold mb-4">GET IN TOUCH</p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="font-semibold">Phone:</span> +1-121-231-2321
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold">Email:</span> contact@purefit.com
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors text-3xl"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-400 transition-colors text-3xl"
            aria-label="Twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 transition-colors text-3xl"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-700 transition-colors text-3xl"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>

        {/* Footer Bottom Section */}
        <hr className="my-8 border-gray-300" />
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Purefit. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
