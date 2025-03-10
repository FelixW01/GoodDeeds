const jwt = require('jsonwebtoken');

const isAdmin = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the user is an admin
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error('Error verifying token:', err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = isAdmin;