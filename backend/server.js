const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
// const cartRoutes = require('./routes/cartRoute'); // ✅ Ensure this is the correct file name
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');

  // Start the server only after DB is connected
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('❌ MongoDB connection failed:', err);
});

// Routes
const sampleRoutes = require('./routes/index');
const cartRoutes = require('./routes/cartRoute.js'); // ✅ Make sure this is the correct file name
const orderRoutes = require('./routes/orderRoute');
app.use('/api/order', orderRoutes);
app.use('/api', sampleRoutes);
app.use('/api/cart', cartRoutes); // ✅ Set this to /api/cart to match frontend request
// app.get("/api/cart/:userId", async (req, res) => {
//   try {
//     const cart = await Cart.find({ userId: req.params.userId });
//     res.json(cart); // ✅ returns JSON
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch cart" }); // ✅ still JSON
//   }
// });
// app.post('/api/cart', async (req, res) => {
//   try {
//     // your DB insert logic
//     res.status(201).json({ message: 'Item added to cart successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to add item to cart' });
//   }
// });