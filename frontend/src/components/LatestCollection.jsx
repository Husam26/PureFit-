import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
      setLoading(false);
    } else {
      setError('No products found!');
      setLoading(false);
    }
  }, [products]);

  if (loading) {
    return (
      <div className="text-center py-8 text-lg">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-lg text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'LATEST'} text2={'COLLECTIONS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our latest arrivals that define the season’s fashion trends. From trendy styles to timeless classics, our newest collection features everything you need to refresh your wardrobe. Whether you're looking for casual comfort or stylish sophistication, we have something for every occasion.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <ProductItem
              id={item._id}
              images={item.images}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
