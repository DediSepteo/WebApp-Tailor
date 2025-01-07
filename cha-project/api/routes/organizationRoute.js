const express = require('express');
const jwt = require('jsonwebtoken');
const organizationModel = require('../models/organizationModel'); // Import the model for organization
const verifyToken = require("../middleware/adminAuth")

const router = express.Router();
const bcrypt = require('bcrypt');

// router.use(verifyToken)

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
        const generatedLink = `http:/localhost:3001/snap/login?t=${jwtLinkToken}`;

        res.json({ link: generatedLink });
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
            return res.status(500).json({ error: 'Error fetching organization count' });
        }
        res.json({ results });
    });
});

router.get('/email', (req, res) => {
    const email = req.headers.email
    organizationModel.getOrgByEmail(email, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching organization data' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'No organization found for this company' });
        }
        return res.json(results);
    });
})

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

router.put("/:id", async (req, res) => {
    const id = Number(req.params.id);
    const data = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(400).send("Empty body");
    }
    try {
        if (data.password) {
            data.password = await bcrypt.hash(data.password.toString(), saltRounds);
        }
        organizationModel.updateOrg(id, data, (err, results) => {
            if (err) {
                console.error("Failed to update organization", err);
                return res.status(500).send("Error updating organization");
            }

            // Retrieve the updated organization data
            organizationModel.getOrgPassById(id, (err, orgResults) => {
                if (err || !orgResults || orgResults.length === 0) {
                    console.error("Failed to fetch updated organization data", err);
                    return res.status(500).send("Error fetching updated organization data");
                }

                const updatedOrg = orgResults[0];
                const token = jwt.sign({
                    org_id: updatedOrg.org_id,
                    email: updatedOrg.email,
                    org_name: updatedOrg.name,
                    address: updatedOrg.address_line1,
                    industry: updatedOrg.industry,
                    org_phone: updatedOrg.phone,
                }, JWT_SECRET, { expiresIn: '1h' });

                return res.status(200).json({ token, message: "Organization updated successfully" });
            });
        });
    } catch (err) {
        console.error("Error processing request:", err);
        return res.status(500).send("Error processing request");
    }
});

router.post('/verify-password', (req, res) => {
    const { org_id, currentPassword } = req.body;

    if (!org_id || !currentPassword) {
        console.error('Missing organization ID or password in request.');
        return res.status(400).json({ error: 'Organization ID and current password are required' });
    }

    organizationModel.getOrgPassById(org_id, (err, results) => {
        if (err) {
            console.error('Error fetching organization data:', err);
            return res.status(500).json({ error: 'Error fetching organization data' });
        }

        if (!results || results.length === 0) {
            console.error('Organization not found.');
            return res.status(404).json({ error: 'Organization not found' });
        }

        const organization = results[0]; // Access the first result
        bcrypt.compare(currentPassword, organization.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ error: 'Error comparing passwords' });
            }

            if (!isMatch) {
                console.warn('Password mismatch.');
                return res.status(400).json({ error: 'Incorrect password' });
            }

            console.log('Password verified successfully.');
            return res.status(200).json({ success: true, message: 'Password verified' });
        });
    });
});

router.put("/activate/:id", (req, res) => {
    const orgID = req.params.id;
    organizationModel.activateOrg(orgID, (err, results) => {
        if (err) {
            console.error('Error deleting organization:', err);
            return res.status(500).send('Error deleting organization');
        }
        return res.status(200).send('Organization deleted successfully');
    });
})

router.put("/deactivate/:id", (req, res) => {
    const orgID = req.params.id;
    organizationModel.deactivateOrg(orgID, (err, results) => {
        if (err) {
            console.error('Error deleting organization:', err);
            return res.status(500).send('Error deleting organization');
        }
        return res.status(200).send('Organization deleted successfully');
    });
})


// router.put("/:id", (req, res) => {
//     const id = Number(req.params.id)
//     const data = req.body
//     if (!Object.keys(data).length)
//         return res.status(500).send("Empty body")
//     organizationModel.updateOrg(id, data, (err, results) => {
//         if (err) {
//             console.error("Failed to update organization", err)
//             return res.status(500).send("Error updating organization")
//         }
//         return res.status(200).send("Organization updated successfully")
//     })
// })

router.get("/pending-orders/:id", (req, res) => {
    console.log(`Received request for orgId: ${req.params.id}`);
    const orgID = req.params.id;

    organizationModel.getRecentOrgOrders(orgID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching pending orders', details: err });
        }
        console.log('Fetched pending orders:', results);
        res.status(200).json(results);
    })
})

router.get("/all-orders/:id", (req, res) => {
    const orgID = req.params.id;

    organizationModel.getAllOrders(orgID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching all orders', details: err });
        }
        console.log('Fetched all orders:', results);
        res.status(200).json(results);
    })
})

router.get("/ongoing-orders/:id", (req, res) => {
    const orgID = req.params.id;

    organizationModel.getOngoingOrders(orgID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching ongoing orders', details: err });
        }
        console.log('Fetched ongoing orders:', results);
        res.status(200).json(results);
    })
})

router.get("/cancelled-orders/:id", (req, res) => {
    const orgID = req.params.id;

    organizationModel.getCancelledOrders(orgID, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching cancelled orders', details: err });
        }
        console.log('Fetched cancelled orders:', results);
        res.status(200).json(results);
    })
})

// router.delete('/:id', (req, res) => {
//     const orgID = req.params.id;
//     console.log(orgID)
//     organizationModel.cancelOrg(orgID, (err, results) => {
//         if (err) {
//             console.error('Error deleting organization:', err);
//             return res.status(500).send('Error deleting organization');
//         }
//         return res.status(200).send('Organization deleted successfully');
//     });
// });

router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        console.log('Decoded Token:', decoded);
        console.log('type', typeof (password))


        if (!email) {
            return res.status(400).json({ error: 'Invalid token: email not found' });
        }

        // Update the user's password in the database (ensure hashing!)
        const hashedPassword = await bcrypt.hash(password, 10); // Replace bcrypt if not using
        await organizationModel.updatePassword(email, hashedPassword);

        res.status(200).json({ message: 'Password reset successfully!' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(400).json({ error: 'Invalid or expired token' });
    }
});




module.exports = router;
