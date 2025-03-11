const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrOrganization = require('../../middleware/isAdminOrOrganization');
const isAdminOrUser = require('../../middleware/isAdminOrUser');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    logoutUser,
    getMe
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
router.post('/user/create', createUser);
router.get('/user/all', isAdmin, getAllUsers);
router.get('/user/:id', auth, getUserById);
router.put('/user/:id', auth, updateUser);
router.delete('/user/:id', auth, deleteUser);
router.post('/login', loginUser);
router.post('logout', auth, logoutUser);
router.get('/me', auth, getMe);

// Organization Routes
router.post('/organizations/create', signUpOrganization); // Sign up a new organization
router.get('/organizations/all', auth, getAllOrganizations); // Get all organizations
router.get('/organizations/:id', auth, getOrganizationById); // Get an organization by ID
router.put('/organizations/:id', isAdminOrOrganization, updateOrganization); // Update an organization by ID
router.delete('/organizations/:id', isAdminOrOrganization, deleteOrganization); // Delete an organization by ID

// Event Routes
router.post('/events/create', isAdminOrOrganization, createEvent); // Only authenticated users can create events
router.get('/events/all', getAllEvents); // Public route to get all events
router.get('/events/:id', getEventById); // Public route to get event by ID
router.put('/events/:id', isAdminOrOrganization, updateEvent); // Only authenticated users can update events
router.delete('/events/:id', isAdminOrOrganization, deleteEvent); // Only authenticated users can delete events

// User Event Routes
router.post('/user-events/register', isAdminOrUser, registerUserForEvent); // Only authenticated users can register for events
router.get('/user-events/all', isAdmin, getAllUserEvents); // Only authenticated users can view all user-event relationships
router.get('/user-events/user/:userId', isAdminOrUser, getUserEventsByUserId); // Get all user-events for a specific user
router.get('/user-events/:id', isAdminOrUser, getUserEventById); // Get a specific user-event relationship by ID
router.put('/user-events/:id', isAdminOrUser, updateUserEvent); // Only authenticated users can update user-event relationships
router.delete('/user-events/:id', isAdminOrUser, deleteUserEvent); // Only authenticated users can delete user-event relationships
router.get('/user-events/org/:orgId', isAdminOrOrganization, getUserEventsByOrganizationId); // Organizations can view user-events for their own events



// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
    res.status(404).json({error: "API route not found"});
});

module.exports = router;