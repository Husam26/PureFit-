import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { debounce } from 'lodash'; // We will use lodash debounce for performance optimization

const Collection = () => {
  const { products, search, setSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState('relavent'); // Default sort order

  // Handle changes to the category filter checkboxes
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  // Handle changes to the subCategory (type) filter checkboxes
  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategories((prev) =>
      prev.includes(subCategory)
        ? prev.filter((item) => item !== subCategory)
        : [...prev, subCategory]
    );
  };

  // Handle changes to the sort option
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSortOrder('relavent');
    setSearch(''); // Optionally reset the search term
  };

  useEffect(() => {
    let filtered = [...products]; // Create a shallow copy of products to avoid mutation

    // Filter by selected categories (Men, Women, Kids)
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Filter by selected subCategories (Topwear, Bottomwear, Winterwear)
    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedSubCategories.includes(product.subCategory)
      );
    }

    // Filter by search term (product name, description, etc.)
    if (search) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||  // Search within category
        product.subCategory.toLowerCase().includes(search.toLowerCase())   // Search within subCategory
      );
    }

    // Sort products based on selected sort order (ensure sorting works even if no filters)
    if (sortOrder === 'low-high') {
      filtered = filtered.sort((a, b) => {
        const priceA = Number(a.price);  // Ensure price is a number
        const priceB = Number(b.price);  // Ensure price is a number
        return priceA - priceB;
      });
    } else if (sortOrder === 'high-low') {
      filtered = filtered.sort((a, b) => {
        const priceA = Number(a.price);  // Ensure price is a number
        const priceB = Number(b.price);  // Ensure price is a number
        return priceB - priceA;
      });
    }

    setFilterProducts(filtered);
  }, [products, selectedCategories, selectedSubCategories, sortOrder, search]); // Add search to the dependency array

  return (
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 pt-24 px-6">
      {/* Filter options */}
      <div className="min-w-60 px-6 py-6 border rounded-lg shadow-xl bg-gray-50">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-1 text-xl font-semibold flex items-center cursor-pointer gap-2 text-blue-600"
        >
          FILTERS
        </p>
        <img
          className={`h-4 sm:hidden transform transition-transform duration-200 ${showFilter ? 'rotate-90' : ''}`}
          src={assets.dropdown_icon}
          alt="Dropdown Icon"
        />

        {/* Category filter */}
        <div className={`border-b border-gray-300 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-1 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            {['Men', 'Women', 'Kids'].map((category) => (
              <p className="flex gap-2 items-center" key={category}>
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={category}
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </p>
            ))}
          </div>
        </div>

        {/* SubCategory filter (Topwear, Bottomwear, Winterwear) */}
        <div className={`border-b border-gray-300 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className="mb-1 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            {['Topwear', 'Bottomwear', 'Winterwear'].map((subCategory) => (
              <p className="flex gap-2 items-center" key={subCategory}>
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={subCategory}
                  onChange={() => handleSubCategoryChange(subCategory)}
                  checked={selectedSubCategories.includes(subCategory)}
                />
                {subCategory}
              </p>
            ))}
          </div>
        </div>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="text-sm text-red-500 mt-6 hover:text-red-700 transition-colors"
        >
          Reset Filters
        </button>
      </div>

      {/* Right side - Products */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-6">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product sort */}
          <select
            className="border border-gray-300 text-sm px-3 py-2 rounded-md"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Map filtered products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {filterProducts.length > 0 ? (
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                name={item.name}
                id={item._id}
                price={item.price}
                images={item.images}
              />
            ))
          ) : (
            <p>No products found for "{search}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
