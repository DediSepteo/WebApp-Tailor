const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Get token from "Bearer token"

    if (!token) return res.status(401).json({ error: 'Access denied, token missing' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

module.exports = verifyToken;
