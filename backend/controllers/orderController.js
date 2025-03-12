//Placing orders using COD method
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from'stripe';
import razorpay from 'razorpay';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

//GLobal variables

const currency = 'usd';
const deliveryCharge = 10;



//gateway initialized
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpayInstance = new razorpay({
    key_id : process.env.RAZORPAY_KEY_ID,
    key_secret : process.env.RAZORPAY_KEY_SECRET
})


const placeOrder = async (req, res) => {
   try {
       const { userId, items, amount, address, paymentMethod } = req.body;

       // Ensure that the paymentMethod is received in the body
       if (!paymentMethod) {
           return res.status(400).json({ success: false, message: 'Payment method is required' });
       }

       const orderData = {
           userId,
           items, 
           address,
           amount,
           paymentMethod: paymentMethod,  // Use the correct paymentMethod field
           payment: false,
           date: Date.now(),
       };

       const newOrder = new orderModel(orderData);
       await newOrder.save();

       // Clear cart data for the user after placing the order
       await userModel.findByIdAndUpdate(userId, { cartData: {} });

       res.json({ success: true, message: 'Order placed' });
   } catch (error) {
       console.log(error);
       res.json({ success: false, message: error.message });
   }
};


//Placing orders using Stripe method

const placeOrderStripe = async (req,res)=>{
    try {
        
        const { userId, items, amount, address, paymentMethod } = req.body;

        const {origin} = req.headers;

        const orderData = {
            userId,
            items, 
            address,
            amount,
            paymentMethod: 'Stripe',  // Use the correct paymentMethod field
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const line_items = items.map((item)=>({
            price_data : {
                currency : currency,
                product_data : {
                    name :item.name
                },
                unit_amount: item.price * 100
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : currency,
                product_data : {
                    name :'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url : `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode : 'payment',
        })

        res.json({success : true , session_url : session.url});



    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
}

//verify Stripe 

const verifyStripe= async (req,res)=>{
    const {orderId , success ,userId} =req.body;

    try {
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId,{payment : true});
            await userModel.findByIdAndUpdate(userId,{cartData : {}});

            res.json({success : true});
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Placing orders using razorpay method

const placeOrderRazorpy = async (req,res)=>{
    try {
        const { userId, items, amount, address, paymentMethod } = req.body;

        const orderData = {
            userId,
            items, 
            address,
            amount,
            paymentMethod: 'Razorpay',  // Use the correct paymentMethod field
            payment: false,
            date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        const options = {
            amount : amount * 100,
            currency : currency.toUpperCase(),
            receipt : newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options,(error,order)=>{
            if (error) {
                console.log(error);
                return res.json({success:false , message:error})
            }
            res.json({success : true,order})
        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  
      // Fetch the Razorpay secret key from environment variables
      const razorpaySecret = process.env.RAZORPAY_KEY_SECRET; // Using environment variable
  
      // Generate the HMAC (Hash-based Message Authentication Code) with the secret key
      const generated_signature = crypto
        .createHmac('sha256', razorpaySecret)  // Use your Razorpay Secret Key
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest('hex');
  
      // Compare the generated signature with the received signature
      if (generated_signature === razorpay_signature) {
        // If the signatures match, proceed with verifying the payment status
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
  
        if (orderInfo.status === 'paid') {
          // If the order is paid, update the order status and clear the user's cart
          await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
          await userModel.findByIdAndUpdate(req.userId, { cartData: {} });
  
          return res.json({ success: true, message: 'Payment verified successfully' });
        } else {
          return res.json({ success: false, message: 'Payment not successful' });
        }
      } else {
        return res.json({ success: false, message: 'Invalid signature' });
      }
    } catch (error) {
      console.log(error);
      toast.error({ success: false, message: 'Error during payment verification' });
    }
  };
  
  
  

// All orders data for admin panel
const allOrders = async (req,res)=>{
    
    try {
        const orders = await orderModel.find({});
        res.json({success : true , orders})
    } catch (error) {
        console.log(error);
      res.json({ success: false, message: error.message });
    }
}

//User order data for frontend
const userOrders = async (req,res)=>{
    try {
      
      const {userId} = req.body

      const orders = await orderModel.find({userId})

      res.json({success : true ,orders})

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
}

//Update order Status  from admin panel
const updateStatus = async (req,res)=>{
    try {
        const {orderId , status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success : true , message : 'status updated'});

    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpy,allOrders,userOrders,updateStatus,verifyStripe,verifyRazorpay};
