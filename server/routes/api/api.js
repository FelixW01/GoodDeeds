const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const isAdmin = require('../../middleware/isAdmin');
const isAdminOrOrganization = require('../../middleware/isAdminOrOrganization');
const isAdminOrUser = require('../../middleware/isAdminOrUser');
const upload = require('../../config/multer')

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
    getOrganizationByUserId,
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
    getEventsByOrganization
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
router.get('/user/profile', auth, getUserProfile);
router.put('/user/update', auth, upload.single('profile_picture'), updateUser);
router.delete('/user/delete', auth, deleteUser);
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);

// Organization Routes
router.post('/organizations/create', signUpOrganization); // Sign up a new organization
router.get('/organizations/all', getAllOrganizations); // Get all organizations
router.get('/organizations/get', auth, getOrganizationByUserId); // Get an organization by ID
router.put('/organizations/update', isAdminOrOrganization, upload.single('logo'), updateOrganization); // Update an organization by ID
router.delete('/organizations/delete', isAdminOrOrganization, deleteOrganization); // Delete an organization by ID

// Event Routes
router.post('/events/create', isAdminOrOrganization, createEvent); // Only authenticated users can create events
router.get('/events/all', getAllEvents); // Public route to get all events
router.get('/events/get', getEventById); // Public route to get event by ID
router.put('/events/update', isAdminOrOrganization, updateEvent); // Only authenticated users can update events
router.delete('/events/delete', isAdminOrOrganization, deleteEvent); // Only authenticated users can delete events
router.get('/events/org/get', isAdminOrOrganization, getEventsByOrganization); // Only authenticated users can get organization events

// User Event Routes
router.post('/user-events/register', isAdminOrUser, registerUserForEvent); // Only authenticated users can register for events
router.get('/user-events/all', isAdmin, getAllUserEvents); // Only authenticated users can view all user-event relationships
router.get('/user-events/user/get', isAdminOrUser, getUserEventsByUserId); // Get all user-events for a specific user
router.get('/user-events/get', isAdminOrUser, getUserEventById); // Get a specific user-event relationship by ID
router.put('/user-events/update', isAdminOrUser, updateUserEvent); // Only authenticated users can update user-event relationships
router.delete('/user-events/delete', isAdminOrUser, deleteUserEvent); // Only authenticated users can delete user-event relationships
router.get('/user-events/org/get', isAdminOrOrganization, getUserEventsByOrganizationId); // Organizations can view user-events for their own events



// Wild card for when user hits a route that doesn't exist
router.use((req, res) => {
    res.status(404).json({error: "API route not found"});
});

module.exports = router;