const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const organizationModel = require('../models/organizationModel'); // Adjust path if necessary
const db = require('../models/dbconnection');

const router = express.Router();
const { JWT_SECRET } = process.env; // Use your secret key from environment variables

// **Login route for organization**
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    organizationModel.getOrgPass(email, async (err, results) => {
        if (err) {
            console.error("Error retrieving organization", err);
            return res.status(500).send("Error retrieving organization");
        }

        if (results.length === 0) {
            return res.status(401).send('Account not found');
        }

        const organization = results[0];
        const match = await bcrypt.compare(password.toString(), organization.password);
        if (!match) {
            return res.status(403).send("Incorrect credentials");
        }

        // Create a token with org role and send it to the client
        const token = jwt.sign({
            org_id: organization.org_id,
            email: organization.email,
            org_name: organization.name,
            role: 'organization'
        }, JWT_SECRET, { expiresIn: '1h' });

        return res.json({ token });
    });
});

// **Login route for admin**
router.post('/admin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    // Assuming admin passwords are hashed as well
    const query = 'SELECT * FROM admin WHERE email = ?';
    
    db.query(query, [email], async (err, results) => {
        if (err) {
            return res.status(500).send('Database error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const admin = results[0];
        const match = await bcrypt.compare(password.toString(), admin.password); // Admin password should be hashed
        if (!match) {
            return res.status(403).send("Incorrect credentials");
        }

        // Create a token with admin role and send it to the client
        const token = jwt.sign({
            admin_id: admin.Admin_id,
            email: admin.Email,
            role: 'admin'
        }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    });
});

// **Middleware to protect routes and validate JWT**
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No Token Provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }
        req.user = decoded; // Set the user info in the request
        next();
    });
};

// **Protected admin route**
router.get('/dashboard', verifyToken, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    res.send(`Welcome, Admin ${req.user.email}! This is your dashboard.`);
});

module.exports = router;
