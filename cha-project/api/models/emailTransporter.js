const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure the transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
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

// Send the email
const sendResetEmail = async (email, resetUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: 'Password Reset Request',
        html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
      `,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (err) {
        console.error("Error sending email:", err);
        throw new Error('Failed to send reset email');
    }
};

module.exports = {
    transporter,
    sendResetEmail
};
