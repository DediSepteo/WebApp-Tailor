const express = require('express');
const jwt = require('jsonwebtoken');
const organizationModel = require('../models/organizationModel'); // Import the model for organization

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { JWT_SECRET } = process.env

router.post(`/gen-link`, (req, res) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Authorization header missing or incorrect' });
    }
    const token = authHeader.split(' ')[1]
    console.log(token)
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        console.log(decoded)
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        const orgID = decoded.org_id; // Extract orgID from decoded token
        if (!orgID) {
            return res.status(400).json({ error: 'Invalid token structure: orgID missing' });
        }
        const jwtLinkToken = jwt.sign({ orgID }, JWT_SECRET);
        // Generate the link based on orgID
        const generatedLink = `http:/localhost:3001/snap/login?t=${jwtLinkToken}`; // Replace with actual link generation logic

        res.json({ link: generatedLink }); // Send the generated link back to the client
    });
})

// Get all organization
router.get('/', (req, res) => {
    organizationModel.getAll((err, results) => {
        if (err) {
            console.error('Error fetching organization:', err);
            return res.status(500).send('Error fetching organization');
        }
        console.log('Fetched organization data:', results); // Log the results
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

router.get(`/corp`, (req, res) => {
    organizationModel.getAllCorp((err, results) => {
        if (err) {
            console.error("Error fetching organization:", err)
            return res.status(500).send('Error fetching organization');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    })
})

router.get(`/corp/recent`, (req, res) => {
    const limit = parseInt(req.query.limit) || 4
    organizationModel.getCorpRecent(limit, (err, results) => {
        if (err) {
            console.error("Error fetching organization:", err)
            return res.status(500).send('Error fetching organization');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    })
})

router.get(`/govt/recent`, (req, res) => {
    const limit = parseInt(req.query.limit) || 4
    organizationModel.getGovtRecent(limit, (err, results) => {
        if (err) {
            console.error("Error fetching organization:", err)
            return res.status(500).send('Error fetching organization');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    })
})

router.post('/register', async (req, res) => {
    const orgData = req.body
    const name = orgData.name
    const email = orgData.email
    const password = orgData.password.toString()
    const type = orgData.type
    const industry = orgData.industry

    const hashPass = await bcrypt.hash(password, saltRounds)
    organizationModel.createOrg(name, email, hashPass, type, industry, (err, results) => {
        if (err) {
            console.error('Error creating organization:', err);
            return res.status(500).send('Error creating organization');
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'Organization created successfully', data: results });
    });
});

router.delete('/:id', (req, res) => {
    const orgID = req.params.id;
    console.log(orgID)
    organizationModel.deleteOrg(orgID, (err, results) => {
        if (err) {
            console.error('Error deleting organization:', err);
            return res.status(500).send('Error deleting organization');
        }
        return res.status(200).send('Organization deleted successfully');
    });
});

router.get('/count', (req, res) => {
    organizationModel.countAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fertching organization count' });
        }
        res.json({ results });
    });
});



module.exports = router;