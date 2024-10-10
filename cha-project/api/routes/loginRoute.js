const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const organizationModel = require('../models/organizationModel'); // Adjust path if necessary
const employeeModel = require('../models/employeeModel')
const db = require('../models/dbconnection');
const verifyToken = require('../middleware/authMiddleware')

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
        // return res.send(organization)
        const match = await bcrypt.compare(password.toString(), organization.password)
        if (!match) {
            return res.status(403).send("Incorrect credentials");
        }

        // Create a token and send it to the client
        console.log(organization)
        const token = jwt.sign({ org_id: organization.org_id, email: organization.email, org_name: organization.name }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    });
});

// Login route for employee
router.post('/employee', (req, res) => {
    const { email, password, encodedOrgID } = req.body;

    const org_id = jwt.decode(encodedOrgID).orgID

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    else if (!org_id) {
        return res.status(400).send("Organization ID not found")
    }

    employeeModel.getEmpPass(email, org_id, async (err, results) => {
        if (err) {
            console.error("Error retrieving employee", err);
            return res.status(500).send("Error retrieving employee");
        }

        if (results.length === 0) {
            return res.status(401).send('Account not found');
        }

        const employee = results[0];
        // return res.send(employee)
        const match = await bcrypt.compare(password.toString(), employee.password)
        if (!match) {
            return res.status(403).send("Incorrect credentials")
        }

        // Create a token and send it to the client
        console.log(employee)
        const token = jwt.sign({ org_id: employee.org_id, email: employee.email, org_name: employee.name }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    })
});



// Login route for admin
router.post('/admin', (req, res) => { // add a verifytoken ti secure api, not yet added due to testing
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


// **Protected admin route**
router.get('/dashboard', (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access only' });
    }
    res.send(`Welcome, Admin ${req.user.email}! This is your dashboard.`);
});

module.exports = router;
