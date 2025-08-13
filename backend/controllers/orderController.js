const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  try {
    const { items, userId, total } = req.body;
    const order = new Order({ items, userId, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order placement error:', err); // Log the real error to the server console
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
};