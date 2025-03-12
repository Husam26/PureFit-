import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [Visible, setVisible] = useState(false);
  const location = useLocation();

  // This will set the visibility of the search bar based on the page
  useEffect(() => {
    if (location.pathname.includes('collection') && showSearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location, showSearch]);

  // Reset the search term and close the search bar
  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearch('');
  };

  // Handle clearing the search term
  const handleClearSearch = () => {
    setSearch('');
  };

  return showSearch && Visible ? (
    <div className="w-full pt-20 px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between bg-white shadow-md rounded-full px-4 py-2">
        {/* Search Input */}
        <div className="flex items-center flex-1 space-x-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}  // Update search term
            className="flex-1 outline-none bg-transparent text-sm px-4 py-2 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search"
          />
          <img className="w-5" src={assets.search_icon} alt="Search Icon" />
        </div>

        {/* Clear Button */}
        {search && (
          <button
            onClick={handleClearSearch}  // Clear the search term when button is clicked
            className="text-sm text-gray-600 font-semibold hover:text-gray-800 ml-4"
          >
            Clear
          </button>
        )}
        
        {/* Close Button */}
        <img
          onClick={handleCloseSearch}  // Close and reset search when cross is clicked
          className="w-4 cursor-pointer ml-4"
          src={assets.cross_icon}
          alt="Close Search"
        />
      </div>
    </div>
  ) : null;
};

export default SearchBar;
