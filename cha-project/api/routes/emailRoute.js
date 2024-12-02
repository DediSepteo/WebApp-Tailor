const express = require('express');
const router = express.Router();
const transporter = require('../models/emailTransporter')
require('dotenv').config();


router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const mailOptions = {
        from: email, // Sender's email address
        to: process.env.EMAIL_NAME, // Your receiving email address
        subject: subject,
        text: `You received a new message from ${name} (${email}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            return res.status(500).json({ error: 'Failed to send message. Please try again later.' });
        }

        res.status(200).json({ message: 'Your message has been sent successfully!' });
    });
});

module.exports = router;
