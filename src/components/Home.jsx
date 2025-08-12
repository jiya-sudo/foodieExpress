import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Stylesheets/Home.css";
import bg from '../Images/bg02.png';
import domino from '../Images/dominos.png';
import burgerKing from '../Images/burger.png';
import kfc from '../Images/kfc.png';
import mcdonald from '../Images/mcdonald.png';
import spaghetti from '../Images/spaghetti-pic.png';
import Margherita from '../Images/Margherita-Pizza.png';
import salad from '../Images/salad1.png';
import pasta from '../Images/pasta.jpg';
import { Navigate, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faCalendarCheck,
  faUserMd,
  faCalendarAlt,
  faHeadset,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

// import spaghetti from '../Images/spaghetti-pic.png';
// import Margherita from '../Images/Margherita-Pizza.png';
// import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const dishes = [
    { img: spaghetti, title: "Spaghetti", price: "102" },
    { img: Margherita, title: "Pizza", price: "99" },
    { img: salad, title: "Salad", price: "59" },
    { img: pasta, title: "Pasta", price: "89" },
  ];

  useEffect(() => {
    const results = dishes.filter((dish) =>
      dish.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(results);
  }, [searchQuery]);
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>


      {/* <!-- 1.hero section --> */}
      <section
        className="hero"
        style={{
          background: 'linear-gradient(to right, rgba(255, 0, 0, 0.5), rgba(255, 230, 0, 0.5))',
          height: '10vh',
          width: '100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}>
        <div className="overlay">
          <h2 style={{ fontWeight: 'bold', color: 'white', fontSize: '40px', textAlign: 'center', fontFamily: 'Arial' }}>
            Welcome to FoodieExpress
          </h2>
          <p style={{ color: 'white' }}>Your favorite meals delivered fast and fresh.</p>
        </div>

        <div className="hero-content">
          <h1>Delicious Food Delivered to Your Doorstep</h1>
          <p>Order your favorite meals from the best restaurants in town.</p>
          <button className="button" onClick={() => navigate('/Menu')}>
            Order Now
          </button>

        </div>
      </section>

      {/* Top Restaurants Section */}
      <section className="top-restaurants">
        <h2>Top Restaurant Partners</h2>
        <div className="restaurant-logos">
          <img width="40" height="40" src={domino} alt="Dominos" data-aos="fade-up" data-aos-delay="100" />
          <img src={kfc} alt={kfc} data-aos="fade-up" data-aos-delay="100" />
          <img src={mcdonald} alt="McDonald's" data-aos="fade-up" data-aos-delay="100" />
          <img src={burgerKing} alt="Burger King" data-aos="fade-up" data-aos-delay="100" />
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="category-tabs">
        <ul className="tabs">
          <li className="active">Pizza</li>
          <li>Burgers</li>
          <li>Drinks</li>
          <li>Desserts</li>
        </ul>
      </section>

      {/* Featured Dishes Section */}
      <section className="featured">
        <h2>Featured Dishes</h2>
        <div className="featured-items">
          {filteredItems.map((dish, idx) => (
            <div key={idx} className="card" data-aos="fade-up" data-aos-delay="100">
              <img src={dish.img} alt={dish.title} />
              <h3>{dish.title}</h3>
              <p>Starting at {dish.price}/- only</p>

            </div>
          ))}
        </div>
        {filteredItems.length === 0 && (
          <p style={{ color: 'gray', marginTop: '1rem' }}>No items match your search.</p>
        )}
      </section>


      {/* Why Choose Us Section */}
      <section className="features" id="features">
        <h2>Why Choose Us</h2>
        <div className="feature-cards">
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <i className="iconss fa-solid fa-truck-fast"></i>
            <h3>Fast Delivery</h3>
            <p>Get your food delivered in under 30 minutes!</p>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <i className="iconss fa-solid fa-bowl-food"></i>
            <h3>Fresh Ingredients</h3>
            <p>We use only fresh and quality ingredients.</p>
          </div>
          <div className="card" data-aos="fade-up" data-aos-delay="100">
            <i className="iconss fa-solid fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Our support team is here anytime you need us.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {[
            { quote: "The food was amazing and delivered on time!", author: "John Doe" },
            { quote: "Best delivery service I've ever used!", author: "Jane Smith" },
            { quote: "Fast and hot, just the way I like it!", author: "Mike Lee" },
            { quote: "Delicious food, friendly delivery!", author: "Sarah K." },
            { quote: "So good! Will order again!", author: "Chris N." },
            { quote: "Loved the packaging and quality!", author: "Emma W." },
          ].map((t, idx) => (
            <div key={idx} className="testimonial-item">
              <p>"{t.quote}"</p>
              <h4>- {t.author}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to satisfy your hunger?</h2>
        <p>Order now and enjoy delicious food delivered fast!</p>
        <a onClick={() => navigate('/Menu')} className="button">Start Ordering</a>
      </section>

    </>
  )
}

export default Home;
