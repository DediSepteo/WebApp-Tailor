const express = require('express');
const router = express.Router();
const tempAccountModel = require('../models/tempAccountModel')

const crypto = require('crypto'); // For generating random passwords


router.post('/', (req, res) => {
    const name = `${orgName.slice(0, 5)}_${Math.floor(Math.random() * 10000)}`;
    const email = `${orgName.slice(0, 5)}${Math.floor(Math.random() * 10000)}@tempemail.com`;
    const password = crypto.randomBytes(4).toString('hex'); // 8-character random password
    const createdAt = new Date()

    // Temporary user data
    const tempUser = {
        username,
        email,
        password,
        name: 'Temporary User',
        address: '123 Example St, City, Country', // Default address
        isTemporary: true,
        createdAt: new Date(),
    };

    tempAccountModel.create(name, email, password, createdAt, (err, results) => {

    })



});

module.exports = router;
