
import React, { useState } from 'react';
import '../Stylesheets/Menu.css';
import { placeOrder, getCartItems } from '../api/cartAPI';
import { useNavigate } from 'react-router-dom';
import margherita from '../Images/Margherita-Pizza.png';
// import CheckoutSteps from './CheckoutSteps';
const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('default');
  const navigate = useNavigate();
  // Track quantity for each item by index
  const [quantities, setQuantities] = useState({});
  const handleOrderNow = async (item, key) => {
    const quantity = quantities[key] || 1;
    const total = item.price * quantity;
    const order = {
      items: [{ ...item, quantity }],
      total,
      // user: user?.name || "Guest",
      // userId: 'dummyUser',
    };
    try {
      // await placeOrder(order);
      sessionStorage.setItem('checkoutOrder', JSON.stringify(order));
      navigate('/checkout')
      alert('Order placed!');
    } catch (err) {
      alert('Failed to place order.');
      console.error('Order error:', err);
    }
  };
  // Increment/decrement handlers for quantity
  const handleIncrement = (key) => {
    setQuantities((prev) => ({ ...prev, [key]: (prev[key] || 1) + 1 }));
  };

  const handleDecrement = (key) => {
    setQuantities((prev) => ({ ...prev, [key]: Math.max(1, (prev[key] || 1) - 1) }));
  };

  const handleAdd = async (item, key) => {
    const quantity = quantities[key] || 1;
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user?._id;

    if (!userId) {
      alert('Please log in to add items to the cart.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/cart?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          quantity,
          userId,
          image: item.img,  // Note: Corrected from `item.image`
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const confirmed = window.confirm(`${item.name} added to cart. Go to Cart?`);
        if (confirmed) navigate('/cart');
      } else {
        console.error('Server responded with error:', data);
        alert(data.message || 'Failed to add item to cart.');
      }
    } catch (err) {
      console.error('❌ Error adding to cart:', err);
      alert('Failed to add item to cart. Please try again.');
    }
  };


  // Fetch updated cart and store in localStorage
  // const latestCart = await getCartItems(userId);
  // localStorage.setItem('cart', JSON.stringify(latestCart));

  // ✅ Show confirmation popup
  // const confirmed = window.confirm(`${item.name} added to cart. Go to Cart?`);
  // if (confirmed) {
  // ✅ Redirect to cart page
  // navigate('/cart');
  // }

  // } catch (err) {
  // console.error('Error adding to cart:', err);
  // alert('Failed to add item to cart. Please try again.');
  // }
  // };


  const menuSections = [
    {
      title: '🍕 Pizza',
      items: [
        { name: 'Margherita', desc: 'Classic cheese & tomato', price: 199, img: 'Images/margherita.png' },
        { name: 'Pepperoni', desc: 'Spicy pepperoni delight', price: 249, img: 'Images/pepperoni.png' },
        { name: 'Farmhouse', desc: 'Loaded with veggies', price: 229, img: '/Images/farmhouse.png' },
      ],
    },
    {
      title: '🍔 Burgers',
      items: [
        { name: 'Veg Burger', desc: 'Fresh veggies & sauce', price: 119, img: '/Images/vegburger.png' },
        { name: 'Chicken Burger', desc: 'Grilled chicken patty', price: 149, img: '/Images/chicken.png' },
        { name: 'Cheese Burst', desc: 'Double layer cheese', price: 179, img: '/Images/cheesy.png' },
      ],
    },
    {
      title: '🥤 Drinks',
      items: [
        { name: 'Cola', desc: 'Chilled and fizzy', price: 49, img: '/Images/cola.png' },
        { name: 'Orange Juice', desc: 'Freshly squeezed', price: 79, img: '/Images/orange.png' },
        { name: 'Mango Shake', desc: 'Sweet & creamy', price: 99, img: '/Images/mango.png' },
      ],
    },
    {
      title: '🍨 Desserts',
      items: [
        { name: 'Vanilla Ice Cream', desc: 'Classic delight', price: 89, img: '/Images/vanilla.png' },
        { name: 'Chocolate Cake', desc: 'Moist & rich', price: 149, img: '/Images/choco.png' },
        { name: 'Brownie', desc: 'Choco overload', price: 99, img: '/Images/brownie.jpg' },
      ],
    },
    {
      title: '🍛 Indian Meals',
      items: [
        { name: 'Chicken Biryani', desc: 'Fragrant & spicy', price: 199, img: '/Images/biryani.png' },
        { name: 'Paneer Butter Masala', desc: 'Rich gravy paneer', price: 179, img: '/Images/paneer.png' },
        { name: 'Dal Tadka', desc: 'With jeera rice', price: 129, img: '/Images/dal.png' },
      ],
    },
    {
      title: '🍜 Chinese',
      items: [
        { name: 'Veg Hakka Noodles', desc: 'Wok tossed spicy noodles', price: 129, img: '/Images/hakka.png' },
        { name: 'Manchurian', desc: 'Dry or gravy', price: 139, img: '/Images/manchurian.png' },
        { name: 'Fried Rice', desc: 'Choice of veg/egg', price: 119, img: '/Images/rice.png' },
      ],
    },
    {
      title: '🍟 Fast Food',
      items: [
        { name: 'French Fries', desc: 'Crispy & golden', price: 79, img: '/Images/fries.png' },
        { name: 'Samosa', desc: 'Spicy potato filled', price: 29, img: '/Images/samosa.png' },
        { name: 'Grilled Sandwich', desc: 'Loaded with veggies', price: 89, img: '/Images/sandwich.png' },
      ],
    },
    {
      title: '🥗 Salads',
      items: [
        { name: 'Greek Salad', desc: 'Feta, olives, cucumber', price: 109, img: '/Images/greek.png' },
        { name: 'Caesar Salad', desc: 'Crisp lettuce & parmesan', price: 129, img: '/Images/caesar.png' },
        { name: 'Fruit Bowl', desc: 'Mixed seasonal fruits', price: 99, img: '/Images/fruit.png' },
      ],
    },
    {
      title: '🍳 Breakfast',
      items: [
        { name: 'Masala Dosa', desc: 'With coconut chutney', price: 89, img: '/Images/dosa.png' },
        { name: 'Poha', desc: 'Light & healthy', price: 49, img: '/Images/poha.png' },
        { name: 'Paratha', desc: 'Stuffed with paneer/aloo', price: 69, img: '/Images/paratha.png' },
      ],
    },
  ];

  const testimonials = [
    { name: 'Ravi Sharma', review: 'Absolutely loved the pizza! Fast delivery and top-notch taste.' },
    { name: 'Priya Mehta', review: 'Their desserts are to die for! Especially the brownie 😍' },
    { name: 'Amit Verma', review: 'Affordable meals with great portions. My go-to for lunch!' },
  ];

  // Merge and process items
  const allItems = menuSections.flatMap(section =>
    section.items.map(item => ({ ...item, category: section.title }))
  );

  const filteredItems = allItems
    .filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price;
      if (sortOrder === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="menu">
      <div className="explore-container">
        <h1>Explore Our Full Menu</h1>
        <div className="menu-controls">
          <input
            type="text"
            placeholder="Search food, restaurant or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="sort-select">
            <option value="default">Sort by</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>


      <h2 className="section-title">🍽️ Menu Items</h2>
      <div className="cards">
        {filteredItems.map((item, j) => {
          const key = item.name + '-' + item.price;
          const quantity = quantities[key] || 1;
          return (
            <div className="card" key={j}>
              <img src={item.img} alt={item.name} />
              <div className="card-body">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="price">₹{item.price}</div>
                <div className="card-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', width: '100%' }}>
                  <div className='quantity-controls' >
                    <button
                      className='quantity-btn decrement'
                      onClick={() => handleDecrement(key)}
                    >-</button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 'bold' }}>{quantity}</span>
                    <button
                      className='quantity-btn increment'
                      onClick={() => handleIncrement(key)}
                    >+</button>
                  </div>
                  <div className='action-buttons'>
                    <button
                      onClick={() => handleAdd({ name: item.name, price: item.price, img: item.img }, key)}
                      className='add-to-cart'
                    >Add to Cart</button>
                    <button
                      onClick={() => handleOrderNow({ name: item.name, price: item.price, img: item.img }, key)}
                      className="order-now">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="section-title">💬 Customer Testimonials</h2>
      <div className="cards">
        {testimonials.map((t, idx) => (
          <div className="card testimonial-card" key={idx}>
            <div className="card-body">
              <h3>{t.name}</h3>
              <p>"{t.review}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
