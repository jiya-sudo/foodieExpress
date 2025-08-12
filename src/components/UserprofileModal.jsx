import React, { useEffect, useState } from "react";
import "../Stylesheets/UserprofileModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import OrderModal from './OrderModal';
// import { getUserOrders } from '../api/userAPI'; // Assuming you have an API function to fetch user orders
// import UserProfileModal from './UserProfileModal'; // Assuming you have a UserProfileModal component
import { useNavigate } from 'react-router-dom';

const UserprofileModal = ({ user, onClose }) => {
    const [orders, setOrders] = useState([]);
    const [tab, setTab] = useState('orders');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/orders/${user.email}`);
                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    if (!user) return null;
    const navigate = useNavigate();
    const placedOrders = orders.filter(order => order.status === 'placed');
    const deliveredOrders = orders.filter(order => order.status === 'delivered');
    const cancelledOrders = orders.filter(order => order.status === 'cancelled');
    const handleTabChange = (newTab) => {
        setTab(newTab);
    };
    return (
        <div className="user-profile-modal">
            <div className="modal-header">
                <h2>User Profile</h2>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="modal-content">
                <div className="user-info">
                    <h3>{user.name || user.email}</h3>
                    <p>Email: {user.email}</p>
                    <p>Address: {user.address || 'N/A'}</p>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.removeItem('user');
                            onClose(); // Close modal
                            window.location.reload(); // Force app refresh to reset state
                        }}
                    >
                        Logout
                    </button>
                </div>
                <div className="tabs">
                    <button onClick={() => handleTabChange('orders')}>Orders</button>
                    <button onClick={() => handleTabChange('settings')}>Settings</button>
                    <button onClick={() => handleTabChange('help')}>Help</button>
                </div>
                <div className="tab-content">
                    {tab === 'orders' && (
                        <div className="orders">
                            <h3>Orders</h3>
                            <div className="order-list">
                                {placedOrders.length > 0 ? (
                                    placedOrders.map(order => (
                                        <div key={order.id} className="order-item">
                                            <p>Order ID: {order.id}</p>
                                            <p>Total: ${order.total}</p>
                                            <p>Status: {order.status}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No placed orders found.</p>
                                )}
                            </div>
                        </div>
                    )}
                    {tab === 'settings' && (
                        <div className="settings">
                            <h3>Settings</h3>
                            {/* Settings content goes here */}
                        </div>
                    )}
                    {tab === 'help' && (
                        <div className="help">
                            <h3>Help</h3>
                            {/* Help content goes here */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};
export default UserprofileModal;