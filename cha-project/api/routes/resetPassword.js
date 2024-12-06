const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Organization } = require('../models/organizationModel'); // Assuming you have an Organization model
const router = express.Router();
const { sendResetEmail } = require('../models/emailTransporter'); // Import the function

// POST /api/reset-org-password
router.post('/api/forgot-org-password', async (req, res) => {
    const { email } = req.body;

    try {
        const organization = await Organization.getOrgByEmail({ email }); // Look up org by email
        if (!organization) {
            return res.status(404).json({ error: "Organization not found." });
        }

        // Generate the reset token
        const resetToken = jwt.sign({ org_id: organization.org_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send the reset token to the organization via email (use Nodemailer)
        const resetUrl = `http://localhost:3001/reset-password?token=${resetToken}`;

        // Nodemailer email logic to send the URL
        await sendResetEmail(email, resetUrl);

        res.status(200).json({ message: "Password reset email sent." });
    } catch (err) {
        console.error("Error during password reset request:", err);
        res.status(500).json({ error: "Server error." });
    }
});

module.exports = router;
