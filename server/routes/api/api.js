const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrOrganization = require('../../middleware/isAdminOrOrganization');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser
} = require('../../controllers/userController');

const {
    signUpOrganization,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
    getAllOrganizations,
} = require('../../controllers/organizationController');

// API routes for user
router.post('/user/create', createUser);
router.get('/user/all', isAdmin, getAllUsers);
router.get('/user/:id', auth, getUserById);
router.put('/user/:id', auth, updateUser);
router.delete('/user/:id', auth, deleteUser);
router.post('/login', loginUser);

// Organization Routes
router.post('/organizations/create', signUpOrganization); // Sign up a new organization
router.get('/organizations/all', auth, getAllOrganizations); // Get all organizations
router.get('/organizations/:id', auth, getOrganizationById); // Get an organization by ID
router.put('/organizations/:id', isAdminOrOrganization, updateOrganization); // Update an organization by ID
router.delete('/organizations/:id', isAdminOrOrganization, deleteOrganization); // Delete an organization by ID


// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
    res.status(404).json({error: "API route not found"});
});

module.exports = router;