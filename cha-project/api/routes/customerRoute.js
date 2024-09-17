const express = require('express');
const Customers = require('../models/organizationModel'); // Import the model for customers

const router = express.Router();

// Get all customers
router.get('/', (req, res) => {
    Customers.getAll((err, results) => {
        if (err) {
            console.error('Error fetching customers:', err);
            return res.status(500).send('Error fetching customers');
        }
        console.log('Fetched customers data:', results); // Log the results
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

module.exports = router;
