import React, { useEffect, useState } from 'react';
import { getCartItems, removeFromCart, placeOrder, decrementCartItem, incrementCartItem } from '../api/cartAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await removeFromCart(id);
      toast.success("Item removed from cart");
      setCartItems(prev => prev.filter(i => i._id !== id));
      fetchCart();
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove item");
    }
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const sectionStyle = {
    padding: "20px",
    backgroundColor: "#fafafa",
    minHeight: "100vh",
    fontFamily: "'Segoe UI', Tahoma, sans-serif"
  };

  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto"
  };

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "10px",
    padding: "16px",
    gap: "16px",
    marginBottom: "16px",
    boxShadow: "0 2px 8px #eee",
    transition: "transform 0.2s ease, box-shadow 0.2s ease"
  };

  const imgStyle = {
    width: "60px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "8px"
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  };

  const namePriceRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap"
  };

  const quantityControlsStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px"
  };

  const quantityBtnStyle = {
    display: "flex",
    alignItems: "left",
    backgroundColor: "#ff6b6b",
    color: "white",
    border: "none",
    padding: "4px 10px",
    fontSize: "1rem",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  const removeBtnStyle = {
    background: "#eee",
    color: "#ff6b6b",
    border: "none",
    borderRadius: "4px",
    padding: "4px 12px",
    cursor: "pointer",
    fontWeight: "500",
    marginTop: "4px"
  };

  const orderSummaryStyle = {
    background: "#fff",
    padding: "20px",
    marginTop: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
  };

  const summaryRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0"
  };

  const orderBtnStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "15px",
    backgroundColor: "#ff6b6b",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.2s ease"
  };

  return (
    <section style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={{ textAlign: "center", fontSize: "2rem", marginBottom: "20px", color: "#ff6b6b" }}>Your Cart</h2>
        {cartItems.length === 0 && <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#666" }}>Your cart is empty.</p>}

        {cartItems.map(item => (
          <div key={item._id} style={cardStyle}>
            <img
              src={item.image || item.img || item.imageUrl || 'https://via.placeholder.com/60'}
              alt={item.name}
              style={imgStyle}
            />
            <div style={contentStyle}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{ margin: 0 }}>{item.name}</h4>
                <div style={quantityControlsStyle}>
                  <button style={quantityBtnStyle} onClick={() => handleDecrement(item)}>-</button>
                  <span style={{ fontWeight: "bold", fontSize: "1rem", minWidth: "20px", textAlign: "center" }}>
                    {item.quantity || 1}
                  </span>
                  <button style={quantityBtnStyle} onClick={() => handleIncrement(item)}>+</button>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, color: "#666" }}>Price: ₹{item.price}</p>
                <p style={{ margin: 0, color: "#333", fontWeight: "bold" }}>Total: ₹{item.price * (item.quantity || 1)}</p>
              </div>
              <button style={removeBtnStyle} onClick={() => handleDelete(item._id)}>Remove</button>
            </div>
          </div>
        ))}


        {cartItems.length > 0 && (
          <div style={orderSummaryStyle}>
            <h3>Order Summary</h3>
            <div style={summaryRowStyle}>
              <span>Estimated Delivery:</span>
              <span style={{ color: "#ff6b6b" }}>30-45 min</span>
            </div>
            <hr />
            <div style={summaryRowStyle}>
              <span>Subtotal:</span>
              <span>₹{getTotal()}</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Delivery Fee:</span>
              <span>₹30</span>
            </div>
            <div style={summaryRowStyle}>
              <span>Service Fee:</span>
              <span>₹10</span>
            </div>
            <hr />
            <div style={{ ...summaryRowStyle, fontSize: "1.1rem", fontWeight: "bold" }}>
              <span>Grand Total:</span>
              <span>₹{getTotal() + 40}</span>
            </div>
            <button style={orderBtnStyle} onClick={() => navigate("/checkout")}>Order Now</button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
