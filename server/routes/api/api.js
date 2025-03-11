const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrOrganization = require('../../middleware/isAdminOrOrganization');
const isAdminOrUser = require('../../middleware/isAdminOrUser');
const {
    createUser,
    getAllUsers,
    getUserProfile,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser
} = require('../../controllers/userController');

const {
    signUpOrganization,
    getOrganizationById,
    updateOrganization,
    deleteOrganization,
    getAllOrganizations,
} = require('../../controllers/organizationController');

const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} = require('../../controllers/eventController');

const {
    registerUserForEvent,
    getAllUserEvents,
    getUserEventsByUserId,
    getUserEventById,
    updateUserEvent,
    deleteUserEvent,
    getUserEventsByOrganizationId
} = require('../../controllers/userEventController');

// API routes for user
router.post('/user/create', createUser); // Create a new user
router.get('/user/all', isAdmin, getAllUsers); // Get all users (admin only)
router.get('/user/profile', auth, getUserProfile); // Get the authenticated user's profile
router.put('/user/update', auth, updateUser); // Update the authenticated user
router.delete('/user/delete', auth, deleteUser); // Delete the authenticated user
router.post('/login', loginUser); // User login
router.post('/logout', auth, logoutUser); // User logout

// Organization Routes
router.post('/organizations/create', signUpOrganization); // Sign up a new organization
router.get('/organizations/all', auth, getAllOrganizations); // Get all organizations
router.get('/organizations/:id', auth, getOrganizationById); // Get an organization by ID
router.put('/organizations/:id', isAdminOrOrganization, updateOrganization); // Update an organization by ID
router.delete('/organizations/:id', isAdminOrOrganization, deleteOrganization); // Delete an organization by ID

// Event Routes
router.post('/events/create', isAdminOrOrganization, createEvent); // Only authenticated users can create events
router.get('/events/all', getAllEvents); // Public route to get all events
router.get('/events/get', getEventById); // Public route to get event by ID
router.put('/events/update', isAdminOrOrganization, updateEvent); // Only authenticated users can update events
router.delete('/events/delete', isAdminOrOrganization, deleteEvent); // Only authenticated users can delete events


// User Event Routes
router.post('/user-events/register', isAdminOrUser, registerUserForEvent); // Only authenticated users can register for events
router.get('/user-events/all', isAdmin, getAllUserEvents); // Only authenticated users can view all user-event relationships
router.post('/user-events/get', isAdminOrUser , getUserEventsByUserId); // Get all user-events for a specific user
router.post('/user-events/get-by-id', isAdminOrUser , getUserEventById); // Get a specific user-event relationship by ID
router.put('/user-events/update', isAdminOrUser , updateUserEvent); // Only authenticated users can update user-event relationships
router.delete('/user-events/delete', isAdminOrUser , deleteUserEvent); // Only authenticated users can delete user-event relationships
router.get('/user-events/org', isAdminOrOrganization, getUserEventsByOrganizationId); // Organizations can view user-events for their own events



// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
    res.status(404).json({error: "API route not found"});
});

module.exports = router;