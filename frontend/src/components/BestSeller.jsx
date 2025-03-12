import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

  useEffect(() => {
    if (products && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller === true);
      setBestSeller(bestProduct.slice(0, 5));
      setLoading(false);
    } else {
      setError('No best sellers available!'); // Set error message if no products exist
      setLoading(false);
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'BEST'} text2={'SELLERS'} />
        <p className="w=3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our top-rated and most popular items that customers can't get enough of! From wardrobe essentials to fashion-forward pieces, our best sellers are a testament to style, quality, and customer satisfaction.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-center py-8 text-lg">
          <p>Loading best sellers...</p>
        </div>
      )}

      {/* Error Handling */}
      {error && (
        <div className="text-center py-8 text-lg text-red-600">
          <p>{error}</p>
        </div>
      )}

      {/* No Best Sellers Message */}
      {bestSeller.length === 0 && !loading && !error && (
        <div className="text-center py-8 text-lg text-gray-500">
          <p>No Best Sellers found.</p>
        </div>
      )}

      {/* Render Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} name={item.name} images={item.images} price={item.price} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
