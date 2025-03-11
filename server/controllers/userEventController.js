const pool = require('../db/config.js');

// Register a user for an event
const registerUserForEvent = async (req, res) => {
    const { event_id } = req.body;
    const userId = req.user.userId; // Get userId from the authenticated user

    // Validate required fields
    if (!event_id) {
        return res.status(400).json({ message: 'Event ID is required' });
    }

    const connection = await pool.getConnection();
    try {
        // Insert the user-event relationship into the database
        const [result] = await connection.query(
            'INSERT INTO user_events (user_id, event_id) VALUES (?, ?)',
            [userId, event_id]
        );

        res.status(201).json({
            message: 'User registered for event successfully',
            userEvent: {
                user_event_id: result.insertId,
                user_id: userId,
                event_id,
            },
        });
    } catch (err) {
        console.error('Error registering user for event:', err);
        res.status(500).json({ message: 'Error registering user for event' });
    } finally {
        connection.release();
    }
};

// Get all user-event relationships
const getAllUserEvents = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [userEvents] = await connection.query('SELECT * FROM user_events');
        res.json(userEvents);
    } catch (err) {
        console.error('Error fetching user events:', err);
        res.status(500).json({ message: 'Error fetching user events' });
    } finally {
        connection.release();
    }
};

// Get all user-event relationships for the authenticated user
const getUserEventsByUserId = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Query the database for all user-events associated with the authenticated user
        const [userEvents] = await connection.query(
            'SELECT * FROM user_events WHERE user_id = ?',
            [userId]
        );

        // If no user-events are found, return a 404 error
        if (userEvents.length === 0) {
            return res.status(404).json({ message: 'No events found for this user' });
        }

        // Return the user-events
        res.json(userEvents);
    } catch (err) {
        console.error('Error fetching user events by user ID:', err);
        res.status(500).json({ message: 'Error fetching user events by user ID' });
    } finally {
        connection.release();
    }
};

// Get user-event relationship by ID
const getUserEventById = async (req, res) => {
    const { user_event_id } = req.body; // Get user_event_id from the request body
    const connection = await pool.getConnection();
    try {
        const [userEvent] = await connection.query('SELECT * FROM user_events WHERE user_event_id = ?', [user_event_id]);
        if (userEvent.length === 0) {
            res.status(404).json({ message: 'User event not found' });
        } else {
            res.json(userEvent[0]);
        }
    } catch (err) {
        console.error('Error fetching user event:', err);
        res.status(500).json({ message: 'Error fetching user event' });
    } finally {
        connection.release();
    }
};

// Update a user-event relationship
const updateUserEvent = async (req, res) => {
    const { user_event_id, status, progress, hours_worked } = req.body; // Get data from the request body
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Ensure the user-event belongs to the authenticated user
        const [userEvent] = await connection.query(
            'SELECT * FROM user_events WHERE user_event_id = ? AND user_id = ?',
            [user_event_id, userId]
        );

        if (userEvent.length === 0) {
            return res.status(403).json({ message: 'Access denied. User event does not belong to this user.' });
        }

        // Update the user-event
        const [result] = await connection.query(
            'UPDATE user_events SET status = ?, progress = ?, hours_worked = ? WHERE user_event_id = ?',
            [status, progress, hours_worked, user_event_id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User event not found' });
        } else {
            res.json({ message: 'User event updated successfully' });
        }
    } catch (err) {
        console.error('Error updating user event:', err);
        res.status(500).json({ message: 'Error updating user event' });
    } finally {
        connection.release();
    }
};

// Delete a user-event relationship
const deleteUserEvent = async (req, res) => {
    const { user_event_id } = req.body; // Get user_event_id from the request body
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Ensure the user-event belongs to the authenticated user
        const [userEvent] = await connection.query(
            'SELECT * FROM user_events WHERE user_event_id = ? AND user_id = ?',
            [user_event_id, userId]
        );

        if (userEvent.length === 0) {
            return res.status(403).json({ message: 'Access denied. User event does not belong to this user.' });
        }

        // Delete the user-event
        const [result] = await connection.query('DELETE FROM user_events WHERE user_event_id = ?', [user_event_id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User event not found' });
        } else {
            res.json({ message: 'User event deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting user event:', err);
        res.status(500).json({ message: 'Error deleting user event' });
    } finally {
        connection.release();
    }
};

// Get all user-events for an organization's events (based on the authenticated user's org_id)
const getUserEventsByOrganizationId = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Fetch the organization ID linked to the authenticated user
        const [org] = await connection.query('SELECT org_id FROM organizations WHERE user_id = ?', [userId]);
        if (org.length === 0) {
            return res.status(403).json({ message: 'Access denied. User is not associated with an organization.' });
        }

        const orgId = org[0].org_id;

        // Query the database for all user-events associated with the organization's events
        const [userEvents] = await connection.query(
            `SELECT ue.* 
             FROM user_events ue
             JOIN events e ON ue.event_id = e.event_id
             WHERE e.org_id = ?`,
            [orgId]
        );

        // If no user-events are found, return a 404 error
        if (userEvents.length === 0) {
            return res.status(404).json({ message: 'No user events found for this organization' });
        }

        // Return the user-events
        res.json(userEvents);
    } catch (err) {
        console.error('Error fetching user events by organization ID:', err);
        res.status(500).json({ message: 'Error fetching user events by organization ID' });
    } finally {
        connection.release();
    }
};

module.exports = {
    registerUserForEvent,
    getAllUserEvents,
    getUserEventsByUserId,
    getUserEventById,
    updateUserEvent,
    deleteUserEvent,
    getUserEventsByOrganizationId
};