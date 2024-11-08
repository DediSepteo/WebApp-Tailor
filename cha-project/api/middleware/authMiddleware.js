const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Use your secret key from environment variables

function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token after "Bearer "
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.Admin_ID = decoded.Admin_ID; // Assuming Admin_ID is part of your token payload

        // Role checking
        if (decoded.role !== 'admin') {
            return res.status(403).json({ error: 'Access forbidden: Admins only' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
        console.log(error);
    }
}

module.exports = verifyToken;
