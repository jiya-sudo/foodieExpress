import React,{useState,useEffect} from "react";
import '../Stylesheets/About.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
          AOS.init({ duration: 1000 });
      }, []);
  
  return (
    <>
      {/* About Section */}
      <section className="hero-about">
        <div className="hero-content">
          <h1>Delivering Happiness, One Meal at a Time</h1>
          <p>
            We bring your favorite meals right to your doorstep, hot, fresh, and
            fast. At FoodieExpress, we don’t just deliver food — we deliver joy.
          </p>
        </div>
      </section>

      <section className="about">
        <div className="about-container">
          <div className="about-text">
            <h1>Who We Are</h1>
            <p>
              At <strong>FoodieExpress</strong>, we believe that good food is the
              foundation of genuine happiness. Since our humble beginnings in
              2020, we’ve dedicated ourselves to delivering not just meals, but
              moments of joy to your doorstep. Whether you're a late-night
              snacker, a busy professional, or someone who simply loves food,
              we're here to serve.
            </p>
            <p>
              With a network of over 500 restaurants and kitchens, we ensure
              quality, hygiene, and lightning-fast delivery. Our mission is to
              bridge the gap between great taste and great convenience.
            </p>
          </div>

          <div className="about-image">
            <img
              src="https://img.freepik.com/free-photo/young-delivery-man-red-uniform-cap-holding-food-packet-smiling_141793-108066.jpg"
              alt="Delivery Hero"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="content">
          <div className="text">
            <h2>Our Mission</h2>
            <p>
              To revolutionize the way India eats by making high-quality meals
              accessible, affordable, and always on time. We’re on a mission to
              support local kitchens, promote hygiene, and bring comfort food
              home — faster than ever before.
            </p>

            <h2>Our Vision</h2>
            <p>
              To become India's most trusted food delivery platform by building
              a community of food lovers, supporting local chefs, and providing
              an unmatched culinary experience powered by innovation and care.
            </p>
          </div>
          <div className="image">
            <img
              src="https://img.freepik.com/free-vector/delivery-service-concept_23-2148576673.jpg"
              alt="Mission and Vision"
            />
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="journey">
        <h2>Our Journey</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span>2020</span>
            <p>Founded in a small kitchen with a big dream.</p>
          </div>
          <div className="timeline-item">
            <span>2021</span>
            <p>Partnered with 100+ local restaurants and launched our first app.</p>
          </div>
          <div className="timeline-item">
            <span>2022</span>
            <p>Expanded operations to 10 cities across India.</p>
          </div>
          <div className="timeline-item">
            <span>2023</span>
            <p>
              Crossed 1 million happy customers and introduced Express Delivery
              within 20 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="our-story">
        <h2>Our Story</h2>
        <p>
          Founded in 2020 by a team of passionate foodies, FoodieExpress began
          as a small startup during the peak of the global lockdown. We realized
          that while the world paused, hunger didn’t. So we created a simple
          solution — fast, safe, and delicious home-delivered meals. Starting
          from a small apartment kitchen in Delhi, we’ve now grown into a
          nationwide platform with presence in 40+ cities, serving over 2
          million customers and counting.
        </p>
        <p>
          Our team includes chefs, developers, riders, and dreamers — all united
          by one mission: to make sure no meal is missed and every meal is
          memorable.
        </p>
      </section>

      {/* Key Stats */}
      <section className="key-stats">
        <div className="stats-grid">
          <div className="stat-box">
            <h3>40+</h3>
            <p>Cities Covered</p>
          </div>
          <div className="stat-box">
            <h3>2000+</h3>
            <p>Partnered Restaurants</p>
          </div>
          <div className="stat-box">
            <h3>2M+</h3>
            <p>Satisfied Customers</p>
          </div>
          <div className="stat-box">
            <h3>4.8★</h3>
            <p>Average App Rating</p>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="team">
        <h2>Meet the Team</h2>
        <div className="team-members">
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Team Member"
            />
            <h4>Rahul Sharma</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Team Member"
            />
            <h4>Ananya Mehta</h4>
            <p>Marketing Head</p>
          </div>
          <div className="member">
            <img
              src="https://randomuser.me/api/portraits/men/55.jpg"
              alt="Team Member"
            />
            <h4>Vikram Desai</h4>
            <p>Operations Manager</p>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="trust">
        <h2>Why Customers Trust Us</h2>
        <ul>
          <li>
            <i className="fa-solid fa-shield-halved"></i> 100% Safe and
            Contactless Delivery
          </li>
          <li>
            <i className="fa-solid fa-star"></i> Trusted by Over 2 Million Users
          </li>
          <li>
            <i className="fa-solid fa-leaf"></i> Fresh Ingredients, Always
          </li>
          <li>
            <i className="fa-solid fa-clock"></i> 20-Minute Express Delivery
          </li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <h2>Ready to Taste Happiness?</h2>
        <p>
          Join the FoodieExpress family. Sign up and order your favorite meals
          now!
        </p>
        <a onClick={() => navigate('/Menu')} className="cta-btn">
          Browse Our Menu
        </a>
      </section>
    </>
  );
};

export default About;
