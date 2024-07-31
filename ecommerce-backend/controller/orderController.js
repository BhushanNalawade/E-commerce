const mongoose = require('mongoose');
const Order = require('../models/Order');

const getOrderById = async (req, res) => {
    const orderId = req.params.id;

    // Check if the ID is provided and is a valid MongoDB ObjectId
    if (!orderId || !mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ message: 'Invalid or missing order ID' });
    }

    try {
        const order = await Order.findById(orderId).populate('user', 'name email');

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports = {
    getOrderById,
};
