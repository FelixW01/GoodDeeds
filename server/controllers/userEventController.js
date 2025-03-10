const pool = require('../db/config.js');

// Register a user for an event
const registerUserForEvent = async (req, res) => {
    const { user_id, event_id } = req.body;

    // Validate required fields
    if (!user_id || !event_id) {
        return res.status(400).json({ message: 'User ID and Event ID are required' });
    }

    const connection = await pool.getConnection();
    try {
        // Insert the user-event relationship into the database
        const [result] = await connection.query(
            'INSERT INTO user_events (user_id, event_id) VALUES (?, ?)',
            [user_id, event_id]
        );

        res.status(201).json({
            message: 'User registered for event successfully',
            userEvent: {
                user_event_id: result.insertId,
                user_id,
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

// Get all user-event relationships for a specific user
const getUserEventsByUserId = async (req, res) => {
    const userId = req.params.userId; // Get the user ID from the request parameters

    const connection = await pool.getConnection();
    try {
        // Query the database for all user-events associated with the given user ID
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
    const userEventId = req.params.id;
    const connection = await pool.getConnection();
    try {
        const [userEvent] = await connection.query('SELECT * FROM user_events WHERE user_event_id = ?', [userEventId]);
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
    const userEventId = req.params.id;
    const { status, progress, hours_worked } = req.body;

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query(
            'UPDATE user_events SET status = ?, progress = ?, hours_worked = ? WHERE user_event_id = ?',
            [status, progress, hours_worked, userEventId]
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
    const userEventId = req.params.id;
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('DELETE FROM user_events WHERE user_event_id = ?', [userEventId]);
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

// Get all user-events for an organization's events
const getUserEventsByOrganizationId = async (req, res) => {
    const orgId = req.params.orgId; // Get the organization ID from the request parameters

    const connection = await pool.getConnection();
    try {
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