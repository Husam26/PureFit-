import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full sm:w-1/3 max-w-sm mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Are you sure you want to log out?</h2>
        <div className="flex justify-around mt-6">
          <button 
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
