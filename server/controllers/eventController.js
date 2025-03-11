const pool = require('../db/config.js');

// Create a new event
const createEvent = async (req, res) => {
    const { title, description, location, start_date, end_date, requirements } = req.body;
    const org_id = req.user.ordId
    // Validate required fields
    if (!org_id || !title || !description || !location || !start_date || !end_date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const connection = await pool.getConnection();
    try {
        // Insert the event into the database
        const [result] = await connection.query(
            'INSERT INTO events (org_id, title, description, location, start_date, end_date, requirements) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [org_id, title, description, location, start_date, end_date, requirements]
        );

        res.status(201).json({
            message: 'Event created successfully',
            event: {
                event_id: result.insertId,
                org_id,
                title,
                description,
                location,
                start_date,
                end_date,
                requirements,
            },
        });
    } catch (err) {
        console.error('Error creating event:', err);
        res.status(500).json({ message: 'Error creating event' });
    } finally {
        connection.release();
    }
};

// Get all events
const getAllEvents = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [events] = await connection.query('SELECT * FROM events');
        res.json(events);
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Error fetching events' });
    } finally {
        connection.release();
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    const { eventId } = req.body; // Get event_id from the request body
    const connection = await pool.getConnection();
    try {
        const [event] = await connection.query('SELECT * FROM events WHERE event_id = ?', [eventId]);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.json(event[0]);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Error fetching event' });
    } finally {
        connection.release();
    }
};

// Update an event
const updateEvent = async (req, res) => {
    const { eventId, title, description, location, start_date, end_date, requirements } = req.body; // Get event_id from the request body
    const org_id = req.user.orgId; // Get org_id from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Check if the event belongs to the user's organization
        const [event] = await connection.query('SELECT org_id FROM events WHERE event_id = ?', [eventId]);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event[0].org_id !== org_id) {
            return res.status(403).json({ message: 'You do not have permission to update this event' });
        }

        // Update the event
        const [result] = await connection.query(
            'UPDATE events SET title = ?, description = ?, location = ?, start_date = ?, end_date = ?, requirements = ? WHERE event_id = ?',
            [title, description, location, start_date, end_date, requirements, eventId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        } else {
            res.json({ message: 'Event updated successfully' });
        }
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ message: 'Error updating event' });
    } finally {
        connection.release();
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    const { eventId } = req.body; // Get event_id from the request body
    const org_id = req.user.orgId; // Get org_id from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Check if the event belongs to the user's organization
        const [event] = await connection.query('SELECT org_id FROM events WHERE event_id = ?', [eventId]);
        if (event.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }
        if (event[0].org_id !== org_id) {
            return res.status(403).json({ message: 'You do not have permission to delete this event' });
        }

        // Delete the event
        const [result] = await connection.query('DELETE FROM events WHERE event_id = ?', [eventId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found' });
        } else {
            res.json({ message: 'Event deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ message: 'Error deleting event' });
    } finally {
        connection.release();
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
};