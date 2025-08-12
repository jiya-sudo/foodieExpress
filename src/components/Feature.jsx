import React from 'react';
import '../Stylesheets/Feature.css'; // Make sure you create a Features.css file with your styles
import SignUp from '../components/SignUp.jsx'
import { Navigate,useNavigate } from 'react-router-dom';
const features = [
  {
    icon: 'https://img.icons8.com/color/48/motorcycle-delivery-single-box.png',
    title: 'Lightning-Fast Delivery',
    description: 'Our delivery partners ensure your food arrives hot and fresh—under 30 minutes, guaranteed in major cities.',
  },
  {
    icon: 'https://img.icons8.com/fluency/48/restaurant.png',
    title: '5000+ Partner Restaurants',
    description: 'Choose from a wide range of cuisines from our verified restaurant partners, updated daily with new offers.',
  },
  {
    icon: 'https://img.icons8.com/fluency/48/discount--v1.png',
    title: 'Daily Discounts & Cashback',
    description: 'Enjoy up to 50% off and exclusive cashback through our reward programs and wallet payments.',
  },
  {
    icon: 'https://img.icons8.com/color/48/customer-support.png',
    title: '24/7 Customer Support',
    description: 'Our friendly support team is always available via chat, email, or phone to solve any issues instantly.',
  },
  {
    icon: 'https://img.icons8.com/color/48/healthy-food.png',
    title: 'Healthy & Hygienic Choices',
    description: 'We work with restaurants that follow FSSAI norms for hygiene and offer healthy alternatives for every diet.',
  },
  {
    icon: 'https://img.icons8.com/?size=100&id=44387&format=png&color=000000',
    title: 'Live Order Tracking',
    description: 'Get real-time updates on where your food is—track your delivery person from kitchen to doorstep.',
  },
  {
    icon: 'https://img.icons8.com/emoji/48/star-emoji.png',
    title: 'Star Rewards Program',
    description: 'Earn loyalty points for every order and redeem them for free meals, exclusive deals, and more.',
  },
  {
    icon: 'https://img.icons8.com/color/48/smartphone-tablet.png',
    title: 'Seamless App Experience',
    description: 'Available on iOS and Android with a clean UI, dark mode, and one-tap reordering features.',
  },
];

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="features-page" id="features">
      <div className="features-hero">
        <h1>
          Why Choose <span>FoodieExpress?</span>
        </h1>
        <p>
          We go beyond just delivering food. We deliver experiences, smiles, and satisfaction.
        </p>
      </div>

      <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <img src={feature.icon} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="features-cta">
        <h2>Ready to taste the difference?</h2>
        <p>Download the app, choose your favorite meal, and let us handle the rest. It’s that simple.</p>
        <a onClick={() => navigate('/SignUp')} className="cta-button">
          login/sign up
        </a>
      </div>
    </section>
  );
};

export default Features;
