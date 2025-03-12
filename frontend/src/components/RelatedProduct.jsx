import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProduct = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  // Handle product click to change the route
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`); // Navigate to the product detail page using productId
  };

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={'RELATED'} text2={'PRODUCTS'} />
      </div>

      {/* Enhanced grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item, index) => (
          <div
            key={index}
            className="group relative bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden"
            onClick={() => handleProductClick(item._id)} // Add onClick handler
          >
            <ProductItem
              id={item._id}
              name={item.name}
              price={item.price}
              images={item.images}
            />
            {/* Hover effect to show additional information */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300 ease-in-out">
              <div className="flex justify-center items-center w-full h-full">
                <button className="bg-white text-black px-6 py-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
