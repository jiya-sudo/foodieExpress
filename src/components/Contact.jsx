import React from 'react';
import '../Stylesheets/Contact.css'; // Make sure to create this file for styling
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhoneVolume, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="hero-contact">
        <div className="hero-content">
          <h1>Let’s Talk Food!</h1>
          <p>Have a question, a suggestion, or just want to say hi? We're here for you 24/7.</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="info-container">
          <div className="info-box">
            
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>
          <div className="info-box">
           
            <h3>Email</h3>
            <p>support@foodieexpress.com</p>
          </div>
          <div className="info-box">
            
            <h3>Address</h3>
            <p>123 Main Street, Haryana, India</p>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="map">
        <iframe
          src="https://maps.google.com/maps?q=New%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
          allowFullScreen
          title="Google Map"
        ></iframe>
      </section>

      {/* Contact Form */}
      {/* <section className="contact-form">
        <h2>Get In Touch</h2>
        <form action="mailto:support@foodieexpress.com" method="POST" encType="text/plain">
          <input type="text" name="name" placeholder="Your Full Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <input type="text" name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Your Message..." rows="6" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section> */}

      {/* FAQ Section */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-box">
          <h4>What areas do you deliver to?</h4>
          <p>We currently serve over 40 cities across India. Check your location on our app or website.</p>
        </div>

        <div className="faq-box">
          <h4>What if my food arrives cold or late?</h4>
          <p>Contact our 24/7 support via the app. We guarantee hot and timely delivery — or your money back!</p>
        </div>

        <div className="faq-box">
          <h4>Can I cancel an order?</h4>
          <p>Yes, orders can be canceled within 2 minutes of placing them. After that, they’re already cooking!</p>
        </div>

        <div className="faq-box">
          <h4>Do you offer corporate or bulk orders?</h4>
          <p>
            Absolutely! Visit our <a href="corporate.html">Corporate Orders</a> page or email us to get started.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
