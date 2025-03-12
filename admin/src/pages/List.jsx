import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className='text-2xl font-semibold mb-4 text-center'>All Products List</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4'>
        {list.map((item, index) => (
          <div
            key={index}
            className='flex flex-col bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl'
          >
            {/* Image container */}
            <div className="relative w-full" style={{ height: '250px' }}>
              <img
                className="w-full h-full object-contain"
                src={item.images[0]}
                alt={item.name}
              />
            </div>

            <div className='p-4 flex flex-col justify-between flex-grow'>
              <h3 className='text-xl font-medium text-gray-800'>{item.name}</h3>
              <p className='text-sm text-gray-600'>{item.category}</p>
              <p className='mt-2 text-lg font-semibold text-gray-900'>
                {currency}{item.price}
              </p>
              <div className='flex justify-between items-center mt-4'>
                <button
                  onClick={() => removeProduct(item._id)}
                  className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition'
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
