import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Stylesheets/CheckoutSteps.css';

const CheckoutSteps = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const storedOrder = JSON.parse(sessionStorage.getItem('checkoutOrder'));
    if (!storedOrder) {
      alert("No order found! Redirecting to menu...");
      navigate('/');
    } else {
      setOrder(storedOrder);
      setFinalPrice(storedOrder.total);
    }
  }, [navigate]);

  const applyCoupon = () => {
    if (!order) return;

    let discountAmt = 0;
    const total = order.total;

    if (total >= 500) {
      discountAmt = 150;
    } else if (total >= 300) {
      discountAmt = 50;
    }

    setDiscount(discountAmt);
    setFinalPrice(total - discountAmt);
  };

  const handleConfirm = () => {
    // Simulate order confirmation
    setStep(5);
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };

  if (!user && step !== 1) {
    return (
      <div className="step error-step" style={{ padding: 20 }}>
        <h2>🔒 Please Sign Up to Continue</h2>
        <p>You must be logged in to complete your order. Click below to create an account.</p>
        <button onClick={() => navigate('/signup')} style={{ padding: '10px 20px', background: '#ff6b6b', color: '#fff', border: 'none', borderRadius: 5 }}>
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container" style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>🧾 Checkout Process</h1>

      {/* STEP 1: Login Check */}
      {step === 1 && (
        <div className="step">
          <h2>Step 1: Login Verification ✅</h2>
          {user ? (
            <>
              <p>Welcome, <strong>{user.name}</strong>! You're successfully logged in.</p>
              <button onClick={() => setStep(2)} style={{ padding: '10px 16px', background: '#3f51b5', color: '#fff', border: 'none', borderRadius: 5 }}>
                Proceed to Address
              </button>
            </>
          ) : (
            <p>Checking login...</p>
          )}
        </div>
      )}

      {/* STEP 2: Delivery Address */}
      {step === 2 && (
        <div className="step">
          <h2>Step 2: Delivery Address 🏡</h2>
          <p>Please enter the full address where you'd like us to deliver your order:</p>
          <textarea
            placeholder="123, Green Street, Near Market, City, ZIP"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: '100%', minHeight: 80, padding: 10, borderRadius: 5, marginBottom: 10 }}
          />
          <button
            disabled={!address}
            onClick={() => setStep(3)}
            style={{ padding: '10px 16px', background: '#4caf50', color: '#fff', border: 'none', borderRadius: 5 }}
          >
            Proceed to Payment
          </button>
        </div>
      )}

      {/* STEP 3: Payment Method */}
      {step === 3 && (
        <div className="step">
          <h2>Step 3: Payment Method 💳</h2>
          <p>Select your preferred payment method:</p>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ padding: 10, width: '100%', borderRadius: 5, marginBottom: 10 }}
          >
            <option value="">-- Choose Payment Option --</option>
            <option value="cod">Cash on Delivery</option>
            <option value="upi">UPI (Google Pay, PhonePe, etc.)</option>
            <option value="card">Credit/Debit Card</option>
          </select>
          <button
            disabled={!paymentMethod}
            onClick={() => setStep(4)}
            style={{ padding: '10px 16px', background: '#2196f3', color: '#fff', border: 'none', borderRadius: 5 }}
          >
            Review Order
          </button>
        </div>
      )}

      {/* STEP 4: Order Summary */}
      {step === 4 && order && (
        <div className="step">
          <h2>Step 4: Order Summary 🧾</h2>
          <p><strong>Items:</strong></p>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 6 }}>
              - {item.name} × {item.quantity} = ₹{item.price * item.quantity}
            </div>
          ))}
          <p><strong>Total:</strong> ₹{order.total}</p>

          <div style={{ margin: '20px 0' }}>
            <button onClick={applyCoupon} style={{ background: '#ff9800', padding: '6px 12px', border: 'none', borderRadius: 5, color: 'white' }}>
              Apply Best Coupon
            </button>
            {discount > 0 && (
              <p style={{ color: 'green', marginTop: 8 }}>
                🎉 Coupon Applied! ₹{discount} off
              </p>
            )}
          </div>

          <p style={{ fontSize: 18 }}><strong>Final Amount:</strong> ₹{finalPrice}</p>
          <p><strong>Delivery Address:</strong> {address}</p>
          <p><strong>Payment Method:</strong> {paymentMethod.toUpperCase()}</p>

          <button
            onClick={handleConfirm}
            style={{ marginTop: 20, padding: '12px 20px', background: '#673ab7', color: '#fff', border: 'none', borderRadius: 5 }}
          >
            Confirm and Place Order
          </button>
        </div>
      )}

      {/* STEP 5: Order Placed */}
      {step === 5 && (
        <div className="step success-step" style={{ textAlign: 'center', padding: 50 }}>
          <div style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'green',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            animation: 'pop 0.5s ease'
          }}>
            <span style={{ fontSize: 60, color: 'white' }}>✔</span>
          </div>
          <h3 style={{ marginTop: 20 }}>Your order has been placed successfully!</h3>
          <p style={{ fontSize: 18 }}>🕒 It will arrive in <strong>30 minutes</strong>.</p>
        </div>
      )}
    </div>
  );
};

export default CheckoutSteps;
