const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { getUser } = require('../../controllers/userController');

// API routes for user
router.get('/users', getUser);

// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;