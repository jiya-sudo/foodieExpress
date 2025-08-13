const Cart = require('../models/CartItem');

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { name, price, quantity , image, userId } = req.body;
    console.log("Received add to cart:", req.body);

    if (!name || !price || !userId) {
      return res.status(400).json({ message: 'Name, Price, and User ID are required' });
    }

    const existingItem = await Cart.findOne({ name, userId });
    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json({ message: 'Item quantity updated', existingItem });
    }
    existingItem = await Cart.create({ name,price,image, userId, quantity});
    res.status(201).json({ message: 'Item added to cart', existingItem });
    // const newItem = new Cart({ name, price, quantity, image, userId });
    // await newItem.save();

    // res.status(201).json({ message: 'Item added to cart', item: newItem });
  } catch (err) {
    console.error("Cart add error:", err);
    res.status(500).json({ message: "Server error adding item to cart" });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (err) {
    console.error("❌ Cart fetch error:", err);
    res.status(500).json({ message: 'Failed to fetch cart' });
  }
};

// Remove item
exports.removeItem = async (req, res) => {
  try {
    const { id } = req.params;

    await Cart.findByIdAndDelete(id);
    res.json({ message: 'Item removed' });
  } catch (err) {
    console.error("❌ Cart remove error:", err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
};
 // Decrement cart item quantity
exports.decrementItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Cart.findById(id);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();
      return res.json(item);
    } else {
      // Remove item if quantity reaches 1 and user decrements
      await Cart.findByIdAndDelete(id);
      return res.json({ message: 'Item removed' });
    }
  } catch (err) {
    console.error("❌ Decrement error:", err);
    res.status(500).json({ error: 'Failed to decrement item' });
  }
};
