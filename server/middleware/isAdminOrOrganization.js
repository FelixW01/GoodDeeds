const jwt = require('jsonwebtoken');

const isAdminOrOrganization = (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if the user is an admin or an organization
        if (decoded.role !== 'admin' && decoded.role !== 'organization') {
            return res.status(403).json({ message: 'Access denied. Admin or organization role required.' });
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

module.exports = isAdminOrOrganization;