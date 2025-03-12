import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [userId, setUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [loadingProducts, setLoadingProducts] = useState(true); // Loading state for products
  const navigate = useNavigate();

  // Load user ID from localStorage
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId"); // Retrieve from local storage
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const addToCart = async (itemId, size) => {
    // Clone the current cart items state
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product size");
      return;
    }

    // Update cart data in the frontend
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // Increase quantity if item already exists in cart
      } else {
        cartData[itemId][size] = 1; // Add new size if it doesn't exist
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1; // Add new product to the cart if it's not there
    }

    setCartItems(cartData); // Update frontend cart immediately

    // Send request to backend to add the new item to the cart (if token exists)
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { userId, itemId, size }, // Send necessary data (userId, itemId, size) to backend
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // Get total items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  // Update item quantity in cart
  const updateQuantity = async (itemId, size, quantity) => {
    // If quantity is 0, remove the item from the cart
    if (quantity === 0) {
      let cartData = structuredClone(cartItems);
      delete cartData[itemId][size]; // Remove the size from the product
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId]; // If no sizes left, remove the entire product
      }
      setCartItems(cartData); // Update cart immediately on frontend

      if (token) {
        try {
          // Send the updated data to the backend to remove the item
          await axios.post(
            backendUrl + "/api/cart/remove",
            { userId, itemId, size, quantity: 0 }, // Send quantity 0 to remove the item
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    } else if (quantity < 1) {
      toast.error("Quantity must be greater than 0");
    } else {
      // If quantity is greater than 0, update as usual
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity; // Update the frontend cart state

      setCartItems(cartData); // Update cart immediately on frontend

      if (token) {
        try {
          // Send the updated data to the backend to update the cart
          await axios.post(
            backendUrl + "/api/cart/update",
            { userId, itemId, size, quantity }, // Send updated quantity
            { headers: { token } }
          );
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    }
  };

  // Get total amount in cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item]) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  // Log cart items for debugging
  useEffect(() => {
  }, [cartItems]);

  // Get product data from backend
  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
        setLoadingProducts(false); // Set loading state to false when products are loaded
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Get user cart data from backend
  const getUserCart = async () => {
    if (!token) return; // Don't call the API if no token is set  
    if (Object.keys(cartItems).length === 0) return;  
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Fetch product data on component mount
  useEffect(() => {
    getProductData();
  }, []);

  // Check if token is available and fetch user cart on page load or token change
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken && !token) {
      setToken(storedToken); // Set token from localStorage
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getUserCart(); // Fetch user cart after token is set
    }
  }, [token]);

  // Providing context to child components
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
    setCartItems,
  };

  return (
    <ShopContext.Provider value={value}>
      {loadingProducts ? <div>Loading products...</div> : props.children}{" "}
      {/* Display loading state */}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
