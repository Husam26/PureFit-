import express from 'express';
import {placeOrder,placeOrderStripe,placeOrderRazorpy,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';

const orderRouter = express.Router();

//Admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//Payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpy);


//User feature
orderRouter.post('/userorders',authUser,userOrders);


//verify payment 
orderRouter.post('/verifystripe',authUser,verifyStripe);
orderRouter.post('/verifyrazorpay',authUser,verifyRazorpay);
export default orderRouter;


