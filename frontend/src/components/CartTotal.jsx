import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

    return (
        <div className="w-full bg-white p-6 rounded-lg shadow-lg">
            <div className="text-center mb-4">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className="flex flex-col gap-4 text-lg">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-700">
                    <p>Subtotal</p>
                    <p className="font-semibold">{currency} {getCartAmount()}.00</p>
                </div>
                <hr className="border-gray-300" />
                
                {/* Shipping Fee */}
                <div className="flex justify-between text-gray-700">
                    <p>Shipping Fee</p>
                    <p className="font-semibold">{currency} {delivery_fee}.00</p>
                </div>
                <hr className="border-gray-300" />
                
                {/* Total */}
                <div className="flex justify-between text-xl font-bold">
                    <p>Total</p>
                    <p>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
                </div>
            </div>
        </div>
    );
}

export default CartTotal;
