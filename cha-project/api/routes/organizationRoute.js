const express = require('express');
const organization = require('../models/organizationModel'); // Import the model for organization

const router = express.Router();

// Get all organization
router.get('/', (req, res) => {
    Organization.getAll((err, results) => {
        if (err) {
            console.error('Error fetching organization:', err);
            return res.status(500).send('Error fetching organization');
        }
        console.log('Fetched organization data:', results); // Log the results
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

router.post('/register', (req, res) => {
    const orgData = req.body
    console.log(orgData)
    organization.createOrg(orgData, (err, results) => {
        if (err) {
            console.error('Error creating organization:', err);
            return res.status(500).send('Error creating organization');
        }
        console.log('Organization has been created'); // Log the results
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'Organization created successfully', data: results });
    });
});

module.exports = router;
