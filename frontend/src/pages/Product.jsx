import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, userId } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [images, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = () => {
    const foundProduct = products.find((item) => item._id === productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.images[0]);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!size) {
      toast.error('Please select a size before adding to cart!', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    
    addToCart(productData._id, size);
    toast.success(`${productData.name} added to cart!`, {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return productData ? (
    <div className="pt-24 border-t-2 transition-opacity ease-in duration-500 opacity-100">
      <ToastContainer />
      {/* Product Image and Info */}
      <div className="flex gap-8 sm:gap-12 flex-col sm:flex-row items-center sm:items-start">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3 sm:w-[40%]">
          {/* Thumbnail images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto gap-2 sm:gap-3 sm:w-[18%] w-full">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[70px] sm:w-[100px] sm:h-[100px] object-cover cursor-pointer rounded-md hover:opacity-75 transition"
                alt={productData.name}
              />
            ))}
          </div>
          {/* Main image */}
          <div className="w-full sm:w-[60%]">
            <img className="w-full h-auto object-cover rounded-md shadow-lg" src={images} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 sm:w-[55%]">
          <h1 className="font-medium text-2xl sm:text-3xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 5 }, (_, index) => (
              <img key={index} src={index < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" className="w-4 h-4" />
            ))}
            <p className="pl-2 text-sm">(122 reviews)</p>
          </div>
          <p className="mt-5 text-3xl font-semibold">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-600 text-sm sm:w-4/5">{productData.description}</p>

          {/* Size Selector */}
          <div className="flex flex-col gap-4 my-8">
            <p className="text-lg font-medium">Select Size</p>
            <div className="flex gap-3">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-6 bg-gray-100 rounded-lg transition-colors ${item === size ? 'border-orange-500 bg-orange-100' : 'hover:bg-gray-200'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm w-full sm:w-auto mt-4 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 border-gray-300" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-2">
            <p>100% Original Product</p>
            <p>Cash on delivery is available for this product</p>
            <p>Easy return and exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="mt-20">
        <div className="flex border-b text-sm font-medium">
          <div className="flex-1 py-3 px-5 text-center border-r cursor-pointer hover:bg-gray-100">Description</div>
          <div className="flex-1 py-3 px-5 text-center cursor-pointer hover:bg-gray-100">Reviews (122)</div>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-600">
          <p className="mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi nostrum quae nam id recusandae accusantium reiciendis dicta a? Quibusdam exercitationem repellat officia ab a magnam ipsum! Blanditiis, incidunt. Inventore, nisi?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem tenetur culpa, illum dolorem molestiae possimus voluptatibus, maiores assumenda iure a odio cupiditate tempora soluta voluptatum non amet minima, sunt similique.</p>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
