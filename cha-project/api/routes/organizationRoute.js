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
});

// Get all organization
router.get('/', (req, res) => {
    const type = req.query.type
    organizationModel.getAll(type, (err, results) => {
        if (err) {
            console.error('Error fetching organization:', err);
            return res.status(500).send('Error fetching organization');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});


router.get(`/recent`, (req, res) => {
    const limit = parseInt(req.query.limit) || 4
    const type = req.query.type
    organizationModel.getRecent(limit, type, (err, results) => {
        if (err) {
            console.error("Error fetching organization:", err)
            return res.status(500).send('Error fetching organization');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    })
})


router.get('/names', (req, res) => {
    const type = req.query.type
    organizationModel.getOrgNames(type, (err, results) => {
        if (err) {
            console.error('Error retrieving product:', err);
            return res.status(500).send('Error retrieving product');
        }
        res.setHeader('Content-Type', 'application/json');
        return res.json(results);

    })
})

router.get('/count', (req, res) => {
    organizationModel.countAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fertching organization count' });
        }
        res.json({ results });
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;

    organizationModel.getOrgById(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching organization data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No organization found for this company' });
        }
        return res.json(results);
    });
});

// router.get('/:name', (req, res) => {
//     const name = req.params.name;

//     organizationModel.getOrgByCompany(name, (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error fetching organization data 123aaaa' });
//         }

//         if (results.length === 0) {
//             return res.status(404).json({ message: 'No organization found for this company' });
//         }
//         return res.json(results);
//     });
// });

router.post('/register', async (req, res) => {
    const orgData = req.body;
    const { name, email, type, industry, city, country, address_line1, address_line2, postal_code, state, phone } = orgData
    const password = orgData.password.toString();

    const hashPass = await bcrypt.hash(password, saltRounds);
    organizationModel.createOrg(
        name,
        email,
        hashPass,
        type,
        industry,
        city,
        country,
        address_line1,
        address_line2,
        postal_code,
        state,
        phone,
        (err, results) => {
            if (err) {
                console.error('Error creating organization:', err);
                return res.status(500).send('Error creating organization');
            }
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ message: 'Organization created successfully', data: results });
        }
    );
});


router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    console.log(data, "asdfjsdasdhad")
    if (!data)
        return res.status(500).send("Empty body")
    organizationModel.updateOrg(id, data, (err, results) => {
        if (err) {
            console.error("Failed to update organization", err)
            return res.status(500).send("Error updating organization")
        }
        return res.status(204).send("Organization updated successfully")
    })
})

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

module.exports = router;
