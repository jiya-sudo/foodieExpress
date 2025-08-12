import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../Stylesheets/Testinominials.css';

const testimonials = [
    {
        name: 'Priya Sharma',
        location: 'Mumbai, India',
        img: 'https://randomuser.me/api/portraits/women/1.jpg',
        text: 'Absolutely love how fast and fresh the food is every time! FoodieExpress is my go-to app when hunger strikes!',
        stars: '★★★★★',
    },
    {
        name: 'Rahul Verma',
        location: 'Bangalore, India',
        img: 'https://randomuser.me/api/portraits/men/22.jpg',
        text: 'I used to worry about food quality, but not anymore. These guys are consistent, and their app is super easy to use.',
        stars: '★★★★★',
    },
    {
        name: 'Anjali Mehta',
        location: 'Delhi, India',
        img: 'https://randomuser.me/api/portraits/women/33.jpg',
        text: 'Customer support is amazing and they even delivered my food during heavy rain. Hats off to the delivery team!',
        stars: '★★★★☆',
    },
    {
        name: 'Siddharth Kapoor',
        location: 'Pune, India',
        img: 'https://randomuser.me/api/portraits/men/34.jpg',
        text: 'I love their late-night delivery. Perfect for night owls like me who crave something spicy at midnight!',
        stars: '★★★★★',
    },
    {
        name: 'Neha Reddy',
        location: 'Hyderabad, India',
        img: 'https://randomuser.me/api/portraits/women/65.jpg',
        text: 'Wide variety of restaurants, great offers, and fast delivery. This is how food delivery should be done.',
        stars: '★★★★☆',
    },
    {
        name: 'Manish Batra',
        location: 'Kolkata, India',
        img: 'https://randomuser.me/api/portraits/men/66.jpg',
        text: 'Delicious meals every time, and delivery staff are always polite and professional. Keep up the good work!',
        stars: '★★★★☆',
    },
    {
        name: 'Divya Kapoor',
        location: 'Jaipur, India',
        img: 'https://randomuser.me/api/portraits/women/77.jpg',
        text: 'Super intuitive app, seamless ordering, and the real-time tracking is a game changer. FoodieExpress has nailed it.',
        stars: '★★★★★',
    },
    {
        name: 'Vikram Singh',
        location: 'Chandigarh, India',
        img: 'https://randomuser.me/api/portraits/men/81.jpg',
        text: 'I placed a group order for 15 people. Everything arrived hot and well-packed. Impressive logistics!',
        stars: '★★★★☆',
    },
    {
        name: 'Ritika Joshi',
        location: 'Lucknow, India',
        img: 'https://randomuser.me/api/portraits/women/88.jpg',
        text: 'Thanks to their meal plans, I’ve stopped cooking altogether. Tastes like home and saves me so much time.',
        stars: '★★★★★',
    },
];

const Testimonials = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <>
            <section className="testimonials-hero">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1>What Our Customers Say</h1>
                    <p>Real feedback from real people</p>
                </div>
            </section>


            <section className="testimonials">
                <div className="container">
                    <h2>Over 10,000 Happy Customers 🍴</h2>
                    <div className="testimonial-grid">
                        {testimonials.map((t, idx) => (
                            <div
                                className={`testimonial-card ${idx % 2 !== 0 ? 'alt' : ''}`}
                                key={idx}
                                data-aos="fade-up"
                                data-aos-delay={idx * 100}
                            >
                                <div className="quote-icon">“</div>
                                <img src={t.img} alt={t.name} />
                                <h3>{t.name}</h3>
                                <p className="location">{t.location}</p>
                                <p>{t.text}</p>
                                <div className="stars">{t.stars}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="cta-banner">
                <h2>Ready to experience deliciousness?</h2>
                <p>Join thousands who enjoy seamless food delivery with FoodieExpress.</p>
                <a href="/sign-in" className="cta-btn">login / signup</a>
            </section>

            <section className="testimonial-form-section">
                <div className="form-container">
                    <h2>Submit Your Testimonial 💬</h2>
                    <form className="forms" action="/submit_testimonial" method="POST">
                        <input type="text" name="name" placeholder="Your Name" required />
                        <input type="text" name="location" placeholder="City, Country" required />
                        <input type="url" name="image" placeholder="Image URL (optional)" />
                        <textarea name="message" rows="5" placeholder="Write your feedback..." required></textarea>
                        <select name="rating" required>
                            <option value="">Rating</option>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★☆</option>
                            <option value="3">★★★☆☆</option>
                            <option value="2">★★☆☆☆</option>
                            <option value="1">★☆☆☆☆</option>
                        </select>
                        <button type="submit">Submit Testimonial</button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Testimonials;
