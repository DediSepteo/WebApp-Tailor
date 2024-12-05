const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // Use 'host' instead of 'service' for Ethereal
    port: 587, // 587 for TLS (non-secure), 465 for SSL (secure)
    auth: {
        user: process.env.EMAIL_NAME, // Ethereal email from .env
        pass: process.env.EMAIL_PASS  // Ethereal password from .env
    }
});

// Verify the transporter setup
transporter.verify((error, success) => {
    if (error) {
        console.error('Error setting up email transporter:', error);
    } else {
        console.log('Email transporter is ready to send messages');
    }
});

module.exports = transporter;
