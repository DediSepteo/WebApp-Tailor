const express = require('express');
const router = express.Router();
const { transporter, sendResetEmail } = require('../models/emailTransporter');
require('dotenv').config();
const organization = require('../models/organizationModel')
const jwt = require('jsonwebtoken');


router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;
    console.log(req.body)

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: process.env.EMAIL_NAME, // Use your authenticated email
        to: process.env.EMAIL_NAME,   // Your receiving email address
        replyTo: email,               // User's email for replies
        subject: subject,
        text: `You received a new message from, ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        }

        res.status(200).json({ message: 'Your message has been sent successfully!' });
    });
});

router.post('/password-reset-request', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendResetEmail(email, resetUrl);

        res.status(200).json({ message: 'Password reset email sent!' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
