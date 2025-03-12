import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this for toast styling

const Add = ({token}) => {
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);  // For loading state

    const handleSizeChange = (size) => {
        setSizes(prev => 
            prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size]
        );
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        
        // Start the loading state and show the progress bar
        setIsLoading(true);

        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            image1 && formData.append("image1", image1);
            image2 && formData.append("image2", image2);
            image3 && formData.append("image3", image3);
            image4 && formData.append("image4", image4);

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

            if (response.data.success) {
                toast.success(response.data.message, {
                    autoClose: 3000,  // Toast will disappear after 3 seconds
                });
                setName("");
                setDescription("");
                setImage1(null);
                setImage2(null);
                setImage3(null);
                setImage4(null);
                setPrice("");
                setSizes([]);
                setBestseller(false);
            } else {
                toast.error(response.data.message, {
                    autoClose: 3000,  // Toast will disappear after 3 seconds
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                autoClose: 3000,  // Toast will disappear after 3 seconds
            });
        } finally {
            // Stop the loading state after the request is done
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-6 bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto'>
            {/* Upload Image Section */}
            <div className='w-full'>
                <p className='text-lg font-semibold mb-4 text-gray-700'>Upload Images</p>
                <div className='flex gap-4'>
                    {[1, 2, 3, 4].map((index) => {
                        const image = index === 1 ? image1 : index === 2 ? image2 : index === 3 ? image3 : image4;
                        return (
                            <label key={index} htmlFor={`image${index}`} className='relative cursor-pointer'>
                                <img
                                    className='w-24 h-24 object-cover border-2 border-gray-300 rounded-lg shadow-sm hover:opacity-80'
                                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                                    alt={`Upload Image ${index}`}
                                />
                                <input
                                    onChange={(e) => {
                                        if (index === 1) setImage1(e.target.files[0]);
                                        if (index === 2) setImage2(e.target.files[0]);
                                        if (index === 3) setImage3(e.target.files[0]);
                                        if (index === 4) setImage4(e.target.files[0]);
                                    }}
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    className="absolute inset-0 opacity-0"
                                />
                            </label>
                        );
                    })}
                </div>
            </div>

            {/* Product Name */}
            <div className='w-full'>
                <p className='text-lg font-semibold mb-2 text-gray-700'>Product Name</p>
                <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none cursor-pointer'
                    type="text"
                    placeholder='Enter product name'
                    required
                />
            </div>

            {/* Product Description */}
            <div className='w-full'>
                <p className='text-lg font-semibold mb-2 text-gray-700'>Product Description</p>
                <textarea
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    className='w-full max-w-[500px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none cursor-pointer'
                    placeholder='Write product description here'
                    required
                />
            </div>

            {/* Product Category and Subcategory */}
            <div className='w-full space-y-4'>
                <div>
                    <p className='text-lg font-semibold mb-2 text-gray-700'>Product Category</p>
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none cursor-pointer'>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className='text-lg font-semibold mb-2 text-gray-700'>Sub Category</p>
                    <select
                        onChange={(e) => setSubCategory(e.target.value)}
                        className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none cursor-pointer'>
                        <option value="Topwear">Top Wear</option>
                        <option value="Bottomwear">Bottom Wear</option>
                        <option value="Winterwear">Winter Wear</option>
                    </select>
                </div>

                <div>
                    <p className='text-lg font-semibold mb-2 text-gray-700'>Product Price</p>
                    <input
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                        type="number"
                        placeholder='Enter price'
                        className='w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-gray-600 focus:outline-none cursor-pointer'
                    />
                </div>

                {/* Product Size Selection */}
                <div>
                    <p className='text-lg font-semibold mb-2 text-gray-700'>Product Size</p>
                    <div className='flex gap-6'>
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <label key={size} className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type="checkbox"
                                    name="size"
                                    value={size}
                                    onChange={() => handleSizeChange(size)}
                                    checked={sizes.includes(size)}
                                    className="form-checkbox text-gray-600 focus:ring-gray-600"
                                />
                                <span className='text-gray-700 font-medium'>{size}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add to Bestseller Checkbox */}
            <div className='flex items-center gap-3'>
                <input
                    type="checkbox"
                    id="bestseller"
                    onChange={() => setBestseller(!bestseller)}
                    checked={bestseller}
                    className='form-checkbox h-5 w-5 text-gray-600 border-gray-300 rounded-md focus:ring-gray-600 cursor-pointer'
                />
                <label htmlFor="bestseller" className='text-gray-700 font-medium cursor-pointer'>
                    Add to bestseller
                </label>
            </div>

            {/* Submit Button */}
            <div className='mt-6'>
                <button
                    type="submit"
                    className={`w-full sm:w-auto px-6 py-3 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600 cursor-pointer ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}>
                    {isLoading ? 'Adding Product...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

export default Add;
