import React, { useState } from 'react'

const NewsLetterBox = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const onSubmitHandler = (event) => {
        event.preventDefault();
        
        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
        } else {
            setError("");
            // Handle successful subscription here
            console.log("Subscribed with email:", email);
        }
    }

    return (
        <div className='text-center'>
            <p className='text-3xl font-semibold text-gray-800'>Subscribe Now & Get 20% Off</p>
            <p className='text-gray-500 mt-3 px-4 sm:px-0'>Stay updated with the latest news, offers, and promotions. Don't miss out on your chance to save!</p>
            
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-md shadow-lg'>
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder='Enter your email' 
                    required
                    className='w-full sm:flex-1 outline-none p-2 rounded-md border border-gray-300 focus:border-black focus:ring-1 focus:ring-black'
                />
                <button 
                    type='submit' 
                    className='bg-black text-white text-sm px-10 py-4 rounded-md transition duration-300 ease-in-out hover:bg-gray-800 focus:outline-none'
                >
                    SUBSCRIBE
                </button>
            </form>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
    )
}

export default NewsLetterBox;
