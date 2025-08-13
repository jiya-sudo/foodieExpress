const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: {
    type: Number,
    default: 1,
  },
  userId: String, // optionally identify user
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CartItem', CartItemSchema);
