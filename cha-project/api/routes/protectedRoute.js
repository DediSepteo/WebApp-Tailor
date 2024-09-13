const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
// Protected route
router.get('/admin/dashboard', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
    console.log("access accepted")
});

module.exports = router;