import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const [loading, setLoading] = useState(false); // To track loading state

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);  // Log Razorpay response for debugging
        try {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
          // Ensure we are sending the correct fields in the request
          const payload = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            // Add any other necessary info like userId if needed to clear cart
          };
  
          const { data } = await axios.post(backendUrl + '/api/order/verifyrazorpay', payload, {
            headers: { token },
          });
  
          if (data.success) {
            // Payment successful, navigate to orders page and clear the cart
            setCartItems({}); // Clear the cart in client-side state
            navigate('/orders');
          } else {
            // Handle failure in payment verification
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.error(error);
          toast.error('Error occurred during payment verification');
        }
      },
    };
  
    const rzp = new window.Razorpay(options);
    rzp.open();
};

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true); // Show loading bar

    try {
      const orderItems = [];

      // Loop over cartItems
      for (const items in cartItems) {
        // Loop over each size in the current cart item
        for (const item in cartItems[items]) {
          // Ensure quantity is greater than 0
          if (cartItems[items][item] > 0) {
            // Find product based on the itemId (items)
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              // Add size and quantity
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      // Include paymentMethod in the order data
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        paymentMethod: method, // <-- Add this line to include paymentMethod
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          setLoading(false); // Hide loading bar after request

          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
          setLoading(false); // Hide loading bar after request

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, { headers: { token } });
          setLoading(false); // Hide loading bar after request

          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      setLoading(false); // Hide loading bar in case of error
      console.error("Error occurred during order submission", error);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full bg-indigo-600 text-white text-center py-2 z-50">
          Processing your order...
          <div className="w-full bg-indigo-300 h-1">
            <div className="w-full h-full bg-indigo-500 animate-pulse"></div>
          </div>
        </div>
      )}

      <form onSubmit={onSubmitHandler} className="bg-gray-50 flex flex-col sm:flex-row justify-between gap-8 pt-24 sm:pt-14 min-h-screen border-t">
        {/* Left Side: Delivery Information */}
        <div className="flex flex-col gap-6 w-full sm:max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <div className="text-3xl font-semibold text-gray-800">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          {/* Input fields for delivery information */}
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Last name" />
          <input required onChange={onChangeHandler} name="email" value={formData.email} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" placeholder="Email" />
          <input required onChange={onChangeHandler} name="street" value={formData.street} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Address/Street" />
          <div className="flex gap-4">
            <input required onChange={onChangeHandler} name="city" value={formData.city} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="City" />
            <input required onChange={onChangeHandler} name="state" value={formData.state} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="State" />
          </div>
          <div className="flex gap-4">
            <input required onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" placeholder="ZipCode" />
            <input required onChange={onChangeHandler} name="country" value={formData.country} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="text" placeholder="Country" />
          </div>
          <input required onChange={onChangeHandler} name="phone" value={formData.phone} className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500" type="number" placeholder="Phone" />
        </div>

        {/* Right Side: Cart Total & Payment Method */}
        <div className="w-full sm:max-w-md bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <CartTotal />
          </div>

          <div className="text-3xl font-semibold text-gray-800 mb-6">
            <Title text1="PAYMENT" text2="METHOD" />
          </div>

          {/* Payment Method Selection */}
          <div className="flex flex-col space-y-4">
            <div
              onClick={() => setMethod('stripe')}
              className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg border ${method === 'stripe' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full border ${method === 'stripe' ? 'bg-indigo-500' : ''}`} />
              <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
            </div>
            <div
              onClick={() => setMethod('razorpay')}
              className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg border ${method === 'razorpay' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full border ${method === 'razorpay' ? 'bg-indigo-500' : ''}`} />
              <img className="h-6" src={assets.razorpay_logo} alt="Razorpay" />
            </div>
            <div
              onClick={() => setMethod('cod')}
              className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg border ${method === 'cod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
            >
              <div className={`w-5 h-5 rounded-full border ${method === 'cod' ? 'bg-indigo-500' : ''}`} />
              <p className="text-gray-500 text-sm font-medium">CASH ON DELIVERY</p>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-8 text-right">
            <button type="submit" className="bg-indigo-600 text-white py-3 px-16 rounded-lg hover:bg-indigo-700 transition-all ease-in-out duration-200">
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default PlaceOrder;
