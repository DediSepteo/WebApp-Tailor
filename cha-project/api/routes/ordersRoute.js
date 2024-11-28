const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel'); // Import the Order model
const verifyToken = require('../middleware/authMiddleware')

// Get the sum of the orders revenue
router.get('/revenue', (req, res) => {
    Order.sumSubtotal((err, totalRevenue) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching total revenue count' });
        }
        res.json({ totalRevenue });
    });
});

// Get all orders
router.get('/', (req, res) => {
    console.log(req.query)
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
    Order.getLatestOrder(type, (err, latestOrder) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve latest order' });
        }
        res.json(latestOrder);
    });
})

router.get('/ready', (req, res) => {
    const type = req.query.type
    const limit = req.query.limit
    Order.getReadyOrder(type, limit, (err, orders) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve orders' });
        }
        res.json(orders);
    });
})

router.get('/measurements', (req, res) => {
    const id = req.query.order_id
    Order.getMeasurements(id, (err, measurements) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to retrieve measurements' });
        }
        res.json(measurements);
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
    const { org_id, subtotal, status, date, orderData } = req.body;

    // Validate the request body
    if (
        !org_id ||
        !subtotal ||
        !status ||
        !date ||
        !Array.isArray(orderData) ||
        orderData.length === 0 ||
        !orderData.every(p => p.id && p.quantity)
    ) {
        return res.status(400).json({
            error: 'Invalid input. Ensure all required fields are provided, and each product has an id and quantity.'
        });
    }

    console.log('Request body:', req.body);

    // Construct the order object
    const newOrder = {
        org_id,
        subtotal,
        status,
        date,
        orderData
    };

    console.log('New Order:', newOrder);

    // Call the `create` method in your model
    Order.create(newOrder, (err, result) => {
        if (err) {
            console.error('Error creating order:', err);
            return res.status(500).json({ error: 'Failed to create order. Please try again later.' });
        }

        res.status(201).json({
            message: 'Order created successfully',
            orderId: result.orderId // Return the generated `order_id`
        });
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

router.delete('/cancel/:id', (req, res) => {
    const orderId = req.params.id;

    Order.cancelOrder(orderId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update order' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found' });
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
