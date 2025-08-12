import React from "react";
import '../Stylesheets/Footer.css'
import AOS from "aos";
import "aos/dist/aos.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <h3>
              foodie<span>Express</span>
            </h3>
            <p>Your trusted partner for delicious meals, delivered fast and fresh every time.</p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Food Delivery</a></li>
              <li><a href="#">Restaurant Partner</a></li>
              <li><a href="#">Catering</a></li>
              <li><a href="#">Corporate Orders</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul className="contact-info">
              <li>Email: support@myfooddelivery.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 Street, New Delhi, India</li>
            </ul>
          </div>
        </div>


        <div className="footer-bottom">
          <div className="social-icons">
            <a href="#"><img src="https://img.icons8.com/3d-fluency/94/facebook-logo.png" alt="Facebook" /></a>
            <a href="#"><img src="https://img.icons8.com/3d-fluency/94/instagram-logo.png" alt="Instagram" /></a>
            <a href="#"><img src="https://img.icons8.com/color/48/twitter-circled--v1.png" alt="Twitter" /></a>
            <a href="#"><img src="https://img.icons8.com/color/48/youtube--v1.png" alt="YouTube" /></a>
          </div>
         
        </div>
      </div>
    </footer>
  );
};

export default Footer;
