import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
    }
    
  }, [cartItems,products]);

  return (
    <div className="bg-gradient-to-t from-gray-100 via-white to-gray-100 min-h-screen py-12 px-4 sm:px-8 pt-24">
      <div className="text-center text-xl mb-10">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {/* Cart Item List */}
      <div className="space-y-8">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex gap-6 items-center hover:shadow-2xl transition-all ease-in-out"
            >
              {/* Product Image */}
              <img className="w-20 h-20 object-cover rounded-md" src={productData.images[0]} alt={productData.name} />

              {/* Product Info */}
              <div className="flex-1">
                <p className="text-lg font-semibold text-gray-800">{productData.name}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-600">
                  <p>{currency}{productData.price}</p>
                  <span className="px-3 py-1 border rounded-full bg-gray-50 text-sm">{item.size}</span>
                </div>
              </div>

              {/* Quantity Input and Remove Button */}
              <div className="flex items-center gap-6">
                <input
                  onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                  className="border rounded-lg px-4 py-2 w-16 text-center focus:ring-2 focus:ring-indigo-500 transition-all"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  className="w-5 cursor-pointer hover:scale-110 transition-transform duration-300"
                  src={assets.bin_icon}
                  alt="Remove"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total */}
      <div className="mt-12 flex justify-center">
        <div className="w-full sm:w-[500px] bg-gradient-to-t from-white to-gray-100 p-6 rounded-xl shadow-xl">
          <CartTotal />
          
          {/* Checkout Button Section */}
          <div className="w-full text-center mt-8">
            <button
              onClick={() => navigate('/place-order')}
              className="bg-black text-white text-sm font-semibold px-8 py-3 rounded-lg hover:bg-gray-800 transition-all ease-in-out duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
