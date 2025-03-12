import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import './orders.css';  // Import the CSS

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event,orderId)=>{
    try {
      const response = await axios.post(backendUrl + '/api/order/status',{orderId , status : event.target.value},{headers : {token}})
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="order-card">
            <img src={assets.parcel_icon} alt="Parcel" />
            <div className="order-items">
              <div>
                {order.items.map((item, index) => {
                  return (
                    <p key={index} className="order-item">
                      {item.name} X {item.quantity} <span>{item.size}</span>
                    </p>
                  );
                })}
              </div>
              <p>{order.address.firstName + " " + order.address.lastName}</p>
              <div className="order-info">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div className="order-status">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? "Done" : "Pending"}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                <option value="OrderPlaced">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <p className="order-amount">{currency}{order.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
