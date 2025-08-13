

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api' // <-- adjust if your backend uses another prefix
});

// Get all cart items for a user (dummy userId for now)
export const getCartItems = async (userId) => {
  const res = await fetch(`http://localhost:5000/api/cart/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  });

  if (!res.ok) {
    const text = await res.text(); // log the HTML error
    console.error("API Error:", text);
    throw new Error("Failed to fetch cart items");
  }

  return await res.json();
};

// Add or update a cart item
export const addToCart = async (item) => {
  const response = await axios.post('http://localhost:5000/api/cart/add', {
    ...item,
    userId: 'dummyUser',
  });
  return response.data;
};

// Remove a cart item by id
export const removeFromCart = async (id) => {
  const res = await API.delete(`/cart/${id}`);
  return res.data;
};

// Place an order
export const placeOrder = async (order) => {
  const response = await axios.post('http://localhost:5000/api/order/place', order);
  return response.data;
};

//decreent cart item
export const incrementCartItem = async (id) => {
  const res = await API.put(`/cart/increment/${id}`);
  return res.data;
};

export const decrementCartItem = async (id) => {
  const res = await API.put(`/cart/decrement/${id}`);
  return res.data;
};