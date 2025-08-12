
import '../Stylesheets/Header.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdRestaurantMenu } from "react-icons/md";
import { FaQuoteLeft } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { LuFeather } from "react-icons/lu";
import { IoMdContact } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { FaCircleInfo } from "react-icons/fa6";
import React, { useState, useEffect } from 'react';
import UserProfileModal from './UserprofileModal';

const Header = () => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [users, setUsers] = useState(null);


  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded user:", user); // 🐞 log this!
    if (user) {
      setUsers(user);
    }
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsers(null);
    navigate('/');
  };
  return (
    <header>
      <div className="container header-container">
        <a href="#" className="logo">
          <img
            width="44"
            height="64"
            src="https://img.icons8.com/glyph-neue/64/hamburger.png"
            alt="hamburger"
          />
          Foodie<span>Express</span>
        </a>

        <nav>
          <ul>
            <li><a onClick={() => navigate('/')}><FaHome size={20} color="rgba(37, 39, 37, 1)" /> Home</a></li>
            <li><a onClick={() => navigate('/Menu')}><MdRestaurantMenu size={20} color="rgba(37, 39, 37, 1)" /> Menu</a></li>
            <li><a onClick={() => navigate('/Testinominials')}><FaQuoteLeft size={20} color="rgba(37, 39, 37, 1)" /> Testimonials</a></li>
            <li><a onClick={() => navigate('/Feature')}><LuFeather size={20} color="rgba(37, 39, 37, 1)" /> Features</a></li>
            <li><a onClick={() => navigate('/About')}><FaCircleInfo size={20} color="rgba(37, 39, 37, 1)" /> About</a></li>
            <li><a onClick={() => navigate('/Contact')}><IoIosCall size={20} color="rgba(37, 39, 37, 1)" /> Contact</a></li>
            <li>
              <a onClick={() => navigate('/Cart')}>
                <div className="cart-icon">
                  <FaCartArrowDown size={20} color="rgba(37, 39, 37, 1)" /> Cart
                </div>
              </a>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          {users ? (
            <div className="user-section">
              <button onClick={() => setShowProfile(true)}>
                Hi, {users.name}
              </button>
              {showProfile && (
                <UserProfileModal user={users} onClose={() => setShowProfile(false)} />
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
