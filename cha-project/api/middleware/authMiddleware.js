const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Use your secret key from environment variables

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.Admin_ID = decoded.Admin_ID;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = verifyToken;