import React, { useState } from 'react';
import '../Stylesheets/OrderModal.css';
import { placeOrder } from '../api/cartAPI';

const OrderModal = ({ items, total, onClose }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('COD');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Token check (simulate)
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return (
      <div className="order-modal">
        <div className="order-modal-content">
          <h2>Please log in to place an order.</h2>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const order = {
        items,
        userId: user.email || 'dummyUser',
        total,
        address,
        deliveryMethod,
      };
      await placeOrder(order);
      setSuccess(true);
      localStorage.setItem('lastOrder', JSON.stringify(order));
    } catch (err) {
      alert('Order failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-modal">
      <div className="order-modal-content">
        {!success ? (
          <>
            <h2>Place Your Order</h2>
            {step === 1 && (
              <div>
                <h3>Step 1: Enter Address</h3>
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  style={{ width: '100%', padding: 8, marginBottom: 16 }}
                />
                <button onClick={handleNext} disabled={!address}>Next</button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h3>Step 2: Delivery Method</h3>
                <select value={deliveryMethod} onChange={e => setDeliveryMethod(e.target.value)}>
                  <option value="COD">Cash on Delivery</option>
                  <option value="Online">Online Payment</option>
                </select>
                <div style={{ marginTop: 16 }}>
                  <button onClick={handlePrev}>Back</button>
                  <button onClick={handleNext} style={{ marginLeft: 8 }}>Next</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3>Step 3: Order Summary</h3>
                <ul>
                  {items.map((item, i) => (
                    <li key={i}>{item.name} x {item.quantity || 1} - ₹{item.price * (item.quantity || 1)}</li>
                  ))}
                </ul>
                <div style={{ fontWeight: 'bold', marginTop: 12 }}>Total: ₹{total}</div>
                <div style={{ marginTop: 16 }}>
                  <button onClick={handlePrev}>Back</button>
                  <button onClick={handleConfirm} style={{ marginLeft: 8 }} disabled={loading}>
                    {loading ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: 32 }}>
            <div style={{ fontSize: 64, color: 'green', marginBottom: 16 }}>
              &#10004;
            </div>
            <h2>Order Placed Successfully!</h2>
            <button onClick={onClose} style={{ marginTop: 24 }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
