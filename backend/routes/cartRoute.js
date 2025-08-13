const express = require('express');
const router = express.Router();
const Cart = require('../models/CartItem.js');
const { addToCart, getCart, removeItem } = require('../controllers/cartController');

// ✅ Add to cart
router.post('/', addToCart);

// ✅ Increase quantity
router.put('/increment/:id', async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity += 1;
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// ✅ Decrease quantity (and remove if 0)
router.put('/decrement/:id', async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity -= 1;
    if (item.quantity <= 0) {
      await Cart.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Item removed' });
    }

    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// ✅ Get cart by userId
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Delete item from cart
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Cart.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({ message: 'Item removed successfully', deletedItem });
  } catch (err) {
    console.error('Error deleting cart item:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
