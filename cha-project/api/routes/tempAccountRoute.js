const express = require('express');
const router = express.Router();
const tempAccountModel = require('../models/tempAccountModel');
const bcrypt = require("bcrypt");
const crypto = require('crypto'); // For generating random passwords

router.post('/', async (req, res) => {
    const { org_id, orgName, expiresIn } = req.body;
    const saltRounds = 10;

    function checkActiveAccount(org_id) {
        tempAccountModel.getActiveAccount(org_id, (err, results) => { })
    }

    // Convert tempAccountModel.create to return a Promise
    async function createTempAccount(org_id, retries = 3) {
        const randomInt = Math.floor(Math.random() * 10000);
        const name = `${orgName.slice(0, 5)}_${randomInt}`;
        const email = `${orgName.slice(0, 5)}${randomInt}@tempemail.com`;
        const password = crypto.randomBytes(4).toString('hex')
            .split('')
            .map((char) => (Math.random() > 0.5 ? char.toUpperCase() : char))
            .join('');
        const createdAt = new Date();
        const hashPass = await bcrypt.hash(password, saltRounds);

        return new Promise((resolve, reject) => {
            tempAccountModel.create(org_id, name, email, hashPass, createdAt, (err, results) => {
                if (err?.errno == 1062 && retries > 0) {
                    console.log('Duplicate entry detected. Retrying with a new unique name...');
                    return resolve(createTempAccount(org_id, retries - 1));
                } else if (err) {
                    console.log(err);
                    reject({ error: 'Failed to create temp account' });
                } else {
                    setTimeout(() => {
                        tempAccountModel.deactivate(email, (err, results) => {
                            if (err) {
                                console.log(err);
                                reject({ error: 'Failed to deactivate account' });
                            } else {
                                console.log("Account deactivated!"); // Log for admin page
                            }
                        });
                    }, expiresIn);

                    resolve({ email, password, expiresIn });
                }
            });
        });
    }

    try {
        const accountDetails = await createTempAccount(org_id);
        console.log(accountDetails);

        const response = await fetch("http://localhost:3000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "BrandTailors Co.",
                email: "qoejane6@gmail.com",
                subject: "Temporary Account Credentials",
                message: `Your temporary account has been successfully created. Below are your credentials to access the system:
    
                            Email: ${accountDetails.email}
                            Password: ${accountDetails.password}

                        Please note that this temporary account is valid for ${accountDetails.expiresIn / 3600000} hour(s) and will automatically expire after this period. Once the account expires, you will no longer be able to access the system.`
            })
        });

        if (!response.ok) {
            return res.status(400).json({ error: "Failed to send email" });
        }
        console.log(response)

        return res.status(200).json({ message: "Email sent!" });
    } catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
