const express = require('express');
const router = express.Router();
const transporter = require('../models/emailTransporter')
const organization = require('../models/organizationModel')


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

router.post('/password-reset-request', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Check if the user exists
        const user = await organization.getUserByEmail(email);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Generate a secure token with a 1-hour expiration
        const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Email options
        const mailOptions = {
            from: `<${process.env.EMAIL_NAME}>`,
            to: email,
            subject: 'Password Reset Request',
            text: `You have requested to reset your password. Use the following link to reset it: ${resetUrl}`,
            html: `<p>You have requested to reset your password. Use the following link to reset it:</p>
                   <a href="${resetUrl}">${resetUrl}</a>
                   <p>This link will expire in 1 hour.</p>`
        };

        await transporter.sendMail(mailOptions);

        return res.status(200).json({ message: 'Password reset email sent!' });
    } catch (error) {
        console.error('Error during password reset request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
