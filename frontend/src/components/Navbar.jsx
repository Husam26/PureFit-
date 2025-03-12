import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import { NavLink, Link } from "react-router-dom"; // Import Link for the Cart and for the logo
import { ShopContext } from "../context/ShopContext";
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for the menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for the dropdown menu
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for confirmation

  const logout = () => {
    setIsModalOpen(true); // Show the modal for confirmation
  };

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    navigate('/login');
    setIsModalOpen(false); // Close the modal after confirming logout
  };

  const handleLogoutCancel = () => {
    setIsModalOpen(false); // Close the modal if the user cancels
  };

  const { setShowSearch, getCartCount,navigate,token,setToken,setCartItems } = useContext(ShopContext);

  // Show dropdown when hovering over the profile icon
  const handleProfileHover = () => {
    setIsDropdownOpen(true);
  };

  const handleProfileLeave = () => {
    setIsDropdownOpen(false);
  };

  

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo wrapped with Link to go to Home */}
          <Link to="/">
            <img src={assets.logo} className="h-10 object-contain" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Icons Section (Always Visible on Desktop and Mobile) */}
          <div className="flex items-center gap-5">
            {/* Search Icon */}
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon}
              className="w-5 cursor-pointer"
              alt="Search Icon"
            />

            {/* Profile Icon with hover effect for dropdown */}
            <div
              className="relative"
              onMouseEnter={handleProfileHover}  // Show dropdown on hover
              onMouseLeave={handleProfileLeave}  // Hide dropdown when mouse leaves
            >
                <img
                onClick={()=> token ? null : navigate('/login')}
                  src={assets.profile_icon}
                  className="w-6 cursor-pointer"
                  alt="Profile Icon"
                />

              {/* Dropdown menu (visible when isDropdownOpen is true) */}
              {isDropdownOpen && token && (
                <div className="absolute right-0 mt-[-8px] bg-white shadow-lg rounded-lg w-48 py-2">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to="/settings"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    onClick={logout}
                    to='/login'
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>

            {/* Cart Icon with Cart Count */}
            <Link to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-6 cursor-pointer"
                alt="Cart Icon"
              />
              {/* Cart count badge */}
              {getCartCount() > 0 && (
                <span className="absolute top-3 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-800 hover:text-gray-600 transition-colors ml-3"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex items-center ml-auto space-x-8 py-4 bg-gray-100">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collection"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Collection
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-semibold border-b-2 border-blue-600 transform scale-105 transition-all"
                  : "text-gray-800 font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition-all"
              }
            >
              Contact
            </NavLink>
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
      />
    </nav>
  );
};

export default Navbar;
