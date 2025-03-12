import express from 'express';
import { addToCart,updateCart,getUserCart, removeItemFromCart,clearCart } from '../controllers/cartController.js';
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get',authUser,getUserCart);
cartRouter.post('/add',authUser,addToCart);
cartRouter.post('/update',authUser,updateCart);
cartRouter.post('/remove',authUser,removeItemFromCart);
cartRouter.post('/clear',clearCart);



export default cartRouter;