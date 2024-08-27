// api/routes/testRoute.js
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json([{ message: 'This is a test JSON response' }]);
});

module.exports = router;
