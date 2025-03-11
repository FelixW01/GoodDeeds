const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the cookie
  const token = req.cookies.token;

  if (!token) {
    // If token is not provided, return 401 Unauthorized
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      // If token is invalid, return 403 Forbidden
      return res.status(403).json({ error: 'Invalid token' });
    }

    // If token is valid, attach user information to request object
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;