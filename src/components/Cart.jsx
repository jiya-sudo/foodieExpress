import React, { useEffect, useState } from 'react';
import '../Stylesheets/cart.css';
import { getCartItems, addToCart, removeFromCart, placeOrder, decrementCartItem, incrementCartItem } from '../api/cartAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleOrderNow = async (item, key) => {
    const quantity = quantities[key] || 1;
    const total = item.price * quantity;
    const order = {
      items: [{ ...item, quantity }],
      total,
      // user: user?.name || "Guest",
      // userId: 'dummyUser',
    };
    try {
      // await placeOrder(order);
      sessionStorage.setItem('checkoutOrder', JSON.stringify(order));
      navigate('/checkout')
      alert('Order placed!');
    } catch (err) {
      alert('Failed to place order.');
      console.error('Order error:', err);
    }
  };
  // Fetch cart items
  const fetchCart = async () => {
    if (!user) {
      setCartItems([]);
      return;
    }
    try {
      const data = await getCartItems(user._id);
      setCartItems(data);
      localStorage.setItem('cart', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Add item (increment quantity)
  const handleIncrement = async (item) => {
    try {
      await incrementCartItem(item._id);
      fetchCart();
    } catch (err) {
      console.error('Failed to increment:', err);
    }
  };

  const handleDecrement = async (item) => {
    try {
      await decrementCartItem(item._id);
      fetchCart();
    } catch (err) {
      console.error('Failed to decrement:', err);
    }
  };

  // Delete item completely
  const handleDelete = async (id) => {
    console.log('handleDelete called with id:', id);
    try {
      await removeFromCart(id);
      toast.success("Item removed from cart");
      // optimistic update so user sees immediate change
      setCartItems(prev => prev.filter(i => i._id !== id));
      // refetch to be safe
      fetchCart();
    } catch (error) {
      console.error('Failed to remove item (detailed):', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      toast.error("Failed to remove item: " + (error.response?.data?.message || error.message));
    }
  };

  // Get total price
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  // Place order
  const handleOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      return;
    }
    if (!user.address || !user.phone) {
      toast.error("Please complete your profile before placing an order");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

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
              src={item.image || item.img || item.imageUrl || 'https://via.placeholder.com/60'}
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
            <div className="summary-row">
              <span className="label">Estimated Delivery:</span>
              <span className="value orange-text">30-45 min</span>
            </div>
            <hr />
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
            <div className="summary-row grand-total">
              <span className="label">Grand Total:</span>
              <span className="value">₹{getTotal() + 30 + 10}</span>
            </div>
            <button className="order-now-btn" onClick={() => navigate("/checkout")}>
              Order Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
