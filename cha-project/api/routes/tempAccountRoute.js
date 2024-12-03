const express = require('express');
const router = express.Router();
const tempAccountModel = require('../models/tempAccountModel')

const crypto = require('crypto'); // For generating random passwords


router.post('/', (req, res) => {
    console.log(req.query)
    const org_id = req.query.org_id
    const orgName = req.query.orgName
    const name = `${orgName.slice(0, 5)}_${Math.floor(Math.random() * 10000)}`;
    const email = `${orgName.slice(0, 5)}${Math.floor(Math.random() * 10000)}@tempemail.com`;
    const password = crypto.randomBytes(4).toString('hex'); // 8-character random password
    const createdAt = new Date()

    // Temporary user data
    const tempUser = {
        name,
        email,
        password,
        createdAt: new Date(),
        expiresIn: 604800
    };

    tempAccountModel.create(org_id, name, email, password, createdAt, (err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Failed to create new account' });
        }
    })

    res.json(tempUser)
});

module.exports = router;
