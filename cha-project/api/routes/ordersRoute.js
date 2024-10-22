const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Import the Order model
const verifyToken = require('../middleware/authMiddleware')

// Get the sum of the orders revenue
router.get('/revenue', (req, res) => {
    Order.sumPrice((err, totalRevenue) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching total revenue count' });
        }
        res.json({ totalRevenue });
    });
});

// Get all orders
router.get('/', (req, res) => {
    const type = req.query.type
    Order.getAll(type, (err, orders) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve orders' });
        }
        res.json(orders);
    });
});


router.get('/get-latest-order', (req, res) => { //verify token for protected route, add a verifyToken for protect route
    const type = req.query.type
    Order.getLatestOrder((err, latestOrder) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve latest order' });
        }
        res.json(latestOrder);
    });
})

router.get('/ready', (req, res) => {
    const type = req.query.type
    console.log(type)
    Order.getReadyOrder(type, (err, orders) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve orders' });
        }
        res.json(orders);
    });
})

// Get order by ID
router.get('/:id', (req, res) => {
    const orderId = req.params.id;
    Order.getById(orderId, (err, order) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve the order' });
        }
        if (!order) {
            return res.status(404).json({ error: 'Order not found 3' });
        }
        res.json(order);
    });
});

// Create a new order
router.post('/', (req, res) => {
    const newOrder = req.body; // Assuming the body contains all necessary fields
    Order.create(newOrder, (err, orderId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create order' });
        }
        res.status(201).json({ message: 'Order created', orderId });
    });
});

// Update an order by ID
router.put('/:id', (req, res) => {
    const orderId = req.params.id;
    const updatedOrder = req.body; // Assuming the body contains updated fields

    Order.update(orderId, updatedOrder, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update order' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found 2' });
        }
        res.json({ message: 'Order updated' });
    });
});

router.put('/cancel/:id', (req, res) => {
    const orderId = req.params.id;

    Order.cancelOrder(orderId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update order' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found 2' });
        }
        res.json({ message: 'Order Canceled' });
    });
});

// Delete an order by ID
router.delete('/:id', (req, res) => {
    const orderId = req.params.id;

    Order.delete(orderId, (err, affectedRows) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to delete order' });
        }
        if (affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found 1' });
        }
        res.json({ message: 'Order deleted' });
    });
});

module.exports = router;
