import React, { useEffect, useState } from 'react';
import OrderModal from './OrderModal';
import '../Stylesheets/cart.css';
import { getCartItems, addToCart, removeFromCart, placeOrder, decrementCartItem } from '../api/cartAPI';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const userId = 'dummyUser';

  // Load cart from localStorage on mount, then fetch from backend
  // useEffect(() => {
  //   const localCart = localStorage.getItem('cart');
  //   if (localCart) {
  //     setCartItems(JSON.parse(localCart));
  //   }
  //   fetchCart();
  // }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        setCartItems([]);
        return;
      }

      try {
        const data = await getCartItems(userId);
        setCartItems(data);
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    };

    fetchCart();
  }, []);

  // const fetchCart = async () => {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   if (!user) {
  //     setCartItems([]);
  //     return;
  //   }

  //   const data = await getCartItems(user._id); // Pass userId to API
  //   setCartItems(data);
  //   localStorage.setItem('cart', JSON.stringify(data));
  // };

  const handleAdd = async (item) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Please login first");
      return;
    }

    await addToCart({ ...item, userId: user._id });
    toast.success(`${item.name} added to cart`);
    fetchCart();
  };

  const handleDelete = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const handleIncrement = async (item) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      toast.error("Please login first");
      return;
    }

    await addToCart({ ...item, quantity: 1, userId: user._id });
    fetchCart();
  };

  const handleDecrement = async (item) => {
    try {
      await decrementCartItem(item._id);
      fetchCart();
    } catch (error) {
      console.error('Failed to decrement:', error);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const handleOrder = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  // Step 1: Check if logged in
  if (!user) {
    toast.error("Please login to place an order");
    // Optionally, navigate to login page
    // navigate('/login');
    return;
  }

  // Step 2: Check if profile is complete (example: address, phone)
  if (!user.address || !user.phone) {
    toast.error("Please complete your profile before placing an order");
    // Optionally, navigate to profile page
    // navigate('/profile');
    return;
  }

  // Step 3: Check if cart has items
  if (cartItems.length === 0) {
    toast.error("Your cart is empty");
    return;
  }

  // Step 4: Place order
  const order = {
    items: cartItems,
    userId: user._id,
    total: getTotal(),
  };

  try {
    await placeOrder(order);
    localStorage.setItem('lastOrder', JSON.stringify(order));
    toast.success('Order placed successfully!');
    setCartItems([]);
    localStorage.removeItem('cart');
  } catch (error) {
    toast.error("Failed to place order. Please try again.");
    console.error(error);
  }
};


  return (
    <section className="cart">
      <div className="cart-container">
        <h2>Your Cart</h2>
        {cartItems.length === 0 && <p>Your cart is empty.</p>}
        {cartItems.map(item => (
          <div key={item._id} className="cart-card" style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 2px 8px #eee', display: 'flex', alignItems: 'center', gap: 16 }}>
            <img
              src={item.image || 'https://via.placeholder.com/60'}
              alt={item.name}
              style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
            />
            <div style={{ flex: 1 }}>
              <h4>{item.name}</h4>
              <p>Price: ₹{item.price}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button onClick={() => handleDecrement(item)} style={{ width: 28, height: 28, background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50%', fontSize: 16, cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 'bold' }}>{item.quantity || 1}</span>
                <button onClick={() => handleIncrement(item)} style={{ width: 28, height: 28, background: '#fdec00', color: '#252725', border: 'none', borderRadius: '50%', fontSize: 16, cursor: 'pointer' }}>+</button>
              </div>
              <p>Total: ₹{item.price * (item.quantity || 1)}</p>
              <button onClick={() => handleDelete(item._id)} style={{ background: '#eee', color: '#ff6b6b', border: 'none', borderRadius: 4, padding: '4px 12px', marginTop: 8, cursor: 'pointer' }}>Remove</button>
            </div>
          </div>
        ))}
        {cartItems.length > 0 && (
          <div className="order-summary">
            <h3>Order Summary</h3>

            {/* Estimated Time */}
            <div className="summary-row">
              <span className="label">Estimated Delivery:</span>
              <span className="value orange-text">30-45 min</span>
            </div>

            <hr />

            {/* Price Breakdown */}
            <div className="summary-row">
              <span className="label">Subtotal:</span>
              <span className="value">₹{getTotal()}</span>
            </div>
            <div className="summary-row">
              <span className="label">Delivery Fee:</span>
              <span className="value">₹30</span>
            </div>
            <div className="summary-row">
              <span className="label">Service Fee:</span>
              <span className="value">₹10</span>
            </div>

            <hr />

            {/* Grand Total */}
            <div className="summary-row grand-total">
              <span className="label">Grand Total:</span>
              <span className="value">
                ₹{getTotal() + 30 + 10}
              </span>
            </div>

            {/* Order Now Button */}
            <button
              className="order-now-btn"
              onClick={() => handleOrder(true)}
            >
              Order Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
