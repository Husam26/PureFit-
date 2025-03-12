import React, { useState } from 'react';
import { assets } from '../assets/assets';
import Modal from '../components/Model'; // Import the Modal component

const Navbar = ({ setToken }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility

  const handleLogout = () => {
    setIsModalOpen(true); // Show the modal when logout button is clicked
  };

  const handleConfirmLogout = () => {
    setToken('');
    setIsModalOpen(false); // Close the modal after confirming logout
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // Close the modal if the user cancels
  };

  return (
    <div className='flex items-center justify-between py-2 px-[4%]'>
      {/* Logo */}
      <img 
        className='w-[max(5%,80px)] h-auto' 
        src={assets.logo} 
        alt="Logo" 
      />

      {/* Logout Button */}
      <button 
        onClick={handleLogout}
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition-colors duration-200 ease-in-out hover:bg-gray-500'>
        Logout
      </button>

      {/* Modal for Logout Confirmation */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCancelLogout} 
        onConfirm={handleConfirmLogout} 
      />
    </div>
  );
};

export default Navbar;
