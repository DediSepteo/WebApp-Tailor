const express = require('express');
const organizationModel = require('../models/organizationModel'); // Import the model for organization

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

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

// Get Govt
router.get('/govt', (req, res) => {
    console.log('showing govt')
    organizationModel.getAllGovt((err, results) => {
        if (err) {
            console.error('Error fetching govt org:', err);
            return res.status(500).send('Error fetching govt org');
        }
        console.log('Fetched govt org data:', results); // for debuggin
        res.setHeader('Content-Type', 'application/json', results);
        res.json(results);
    });
})

// Get corp
router.get(`/corp`, (req, res) => {
    console.log("show corp")
    organizationModel.getAllCorp((err, results) => {
        if (err) {
            console.error("Error fetching organization:", err)
            return res.status(500).send('Error fetching organization');
        }
        console.log('Fetched corp org data:', results); // for debuggin
        res.setHeader('Content-Type', 'application/json', results);
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
