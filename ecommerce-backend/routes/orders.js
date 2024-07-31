// routes/orders.js
const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new order
router.post('/', auth, async (req, res) => {
  const { products, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      userId: req.user.id,
      products,
      totalAmount,
    });

    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
