const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/dbconnection'); // Adjust path if necessary

const router = express.Router();
const { JWT_SECRET } = process.env; // Use your secret key from environment variables

// Login route
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const query = 'SELECT * FROM organization WHERE email = ? AND password = ?';

    db.query(query, [email, password], (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }
        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const organization = results[0];

        // Create a token and send it to the client
        const token = jwt.sign({ org_id: organization.Org_ID, email: organization.Email, org_name: organization.Org_Name }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
