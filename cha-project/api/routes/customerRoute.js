const express = require('express');
const Customers = require('../models/customerModel'); // Import the model for customers

const router = express.Router();

// Get all customers
router.get('/', (req, res) => {
    Customers.getAll((err, results) => {
        if (err) {
            return res.status(500).send('Error fetching customers');
        }
        res.json(results);
    });
});

// Get customer by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    Customers.getById(id, (err, result) => {
        if (err) {
            return res.status(500).send('Error fetching customer');
        }
        if (!result) {
            return res.status(404).send('Customer not found');
        }
        res.json(result);
    });
});

// Add a new customer
router.post('/', (req, res) => {
    const customer = req.body;
    Customers.add(customer, (err, insertId) => {
        if (err) {
            return res.status(500).send('Error adding customer');
        }
        res.status(201).json({ id: insertId });
    });
});

// Update a customer by ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const customer = req.body;
    Customers.updateById(id, customer, (err, affectedRows) => {
        if (err) {
            return res.status(500).send('Error updating customer');
        }
        if (affectedRows === 0) {
            return res.status(404).send('Customer not found');
        }
        res.json({ message: 'Customer updated' });
    });
});

// Delete a customer by ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Customers.deleteById(id, (err, affectedRows) => {
        if (err) {
            return res.status(500).send('Error deleting customer');
        }
        if (affectedRows === 0) {
            return res.status(404).send('Customer not found');
        }
        res.json({ message: 'Customer deleted' });
    });
});

module.exports = router;
