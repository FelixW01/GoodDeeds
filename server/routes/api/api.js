const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require('../../controllers/userController');

// API routes for user
router.post('/create', createUser);
router.get('/all', auth, getAllUsers);
router.get('/user/:id', auth, getUserById);
router.put('/user/:id', auth, updateUser);
router.delete('/user/:id', auth, deleteUser);
router.post('/login', loginUser);

// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
  res.status(404).json({ error: "API route not found" });
});

module.exports = router;