import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../api/cartAPI";

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
    } else {
      // Fetch cart from localStorage or backend
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(cart);
    }
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const order = {
      items: cartItems,
      total,
      userId: user._id,
      address,
      payment
    };
    try {
      await placeOrder(order);
      setStep(5); // Show success step
    } catch (error) {
      toast.error("Order failed");
    }
  };

  return (
    <div className="checkout-container">
      {step === 1 && (
        <div>
          <h2>Step 1: Confirm Login</h2>
          <p>Welcome, {user?.name}</p>
          <button onClick={() => setStep(2)}>Continue</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Enter Address</h2>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={() => setStep(3)}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Step 3: Choose Payment Method</h2>
          <select value={payment} onChange={(e) => setPayment(e.target.value)}>
            <option value="">Select</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI</option>
            <option value="card">Card</option>
          </select>
          <button onClick={() => setStep(4)}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2>Step 4: Order Summary</h2>
          {cartItems.map((item) => (
            <p key={item._id}>{item.name} × {item.quantity} = ₹{item.price * item.quantity}</p>
          ))}
          <h3>Total: ₹{total}</h3>
          <button onClick={handlePlaceOrder}>Confirm Order</button>
        </div>
      )}

      {step === 5 && (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <div style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "green",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto"
          }}>
            <span style={{ color: "white", fontSize: 50 }}>✔</span>
          </div>
          <h2>Order Placed Successfully!</h2>
        </div>
      )}
    </div>
  );
};

export default Checkout;
