import userModel from "../models/userModel.js";

// add products to user cart 
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Ensure the user exists
        const userData = await userModel.findById(userId);

        // If the cart already has the item
        if (userData.cartData[itemId]) {
            // If size already exists, increment the quantity, else add a new size
            if (userData.cartData[itemId][size]) {
                userData.cartData[itemId][size] += 1; // Increase quantity
            } else {
                userData.cartData[itemId][size] = 1; // Add the new size
            }
        } else {
            // Add a new item to the cart
            userData.cartData[itemId] = {};
            userData.cartData[itemId][size] = 1;
        }

        // Save updated cart back to database
        await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData });

        // Return success response
        return res.json({ success: true, message: "Item added to cart successfully!" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// update user cart 
const updateCart = async (req, res) => {
    try {
        const { userId, itemId, size, quantity } = req.body;

        // Validate quantity
        if (quantity < 1) {
            return res.json({ success: false, message: "Quantity must be greater than 0" });
        }

        // Find user data
        const userData = await userModel.findById(userId);

        // If the item exists in the user's cart, update the quantity for the specific size
        if (userData && userData.cartData[itemId]) {
            if (userData.cartData[itemId][size]) {
                userData.cartData[itemId][size] = quantity; // Update quantity
            } else {
                return res.json({ success: false, message: "Item size not found in cart" });
            }
        } else {
            return res.json({ success: false, message: "Item not found in cart" });
        }

        // Save the updated cart back to the database
        await userModel.findOneAndUpdate({ _id: userId }, { cartData: userData.cartData });

        // Respond with success
        return res.json({ success: true, message: "Cart updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// get user cart data 
const getUserCart = async(req,res)=>{
    try {
        
        const {userId} = req.body;

        const userData = await userModel.findById(userId);

        let cartData= await userData.cartData;

        res.json({success : true ,cartData})


    } catch (error) {
        console.log(error);
        res.json({success : false , message : error.message});
    }
}

const removeItemFromCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

        // Log for debugging the received data
        console.log('Received userId:', userId);
        console.log('Received itemId:', itemId);
        console.log('Received size:', size);

        // Find the user in the database
        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        // If the item exists, delete the specified size
        if (cartData[itemId] && cartData[itemId][size]) {
            delete cartData[itemId][size];

            // If no sizes are left for the item, remove it from the cart completely
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }

            // Now, update the user's cart data in the database
            const updatedUser = await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

            // If updated successfully, send the response
            if (updatedUser) {
                return res.json({ success: true, message: "Item removed from cart", cartData: updatedUser.cartData });
            } else {
                return res.json({ success: false, message: "Failed to update the cart" });
            }
        } else {
            return res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


const clearCart = async (req, res) => {
    try {
      const { userId } = req.body;
  
      // Find the user and clear the cart
      const userData = await userModel.findById(userId);
      userData.cartData = {}; // Clear the cart data
  
      // Save the changes to the database
      await userData.save();
  
      res.json({ success: true, message: "Cart cleared successfully!" });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  };
  

export {addToCart,updateCart,getUserCart,removeItemFromCart,clearCart}