const pool = require('../db/config.js');

// Create a new event
const createEvent = async (req, res) => {
    const { title, description, location, start_date, start_time, end_date, end_time, requirements } = req.body;
    const userId = req.user.userId; // Get userId from the authenticated user

    // Validate required fields
    if (!title || !description || !location || !start_date || !start_time || !end_date || !end_time) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const connection = await pool.getConnection();
    try {
        // Fetch the organization ID linked to the authenticated user
        const [org] = await connection.query('SELECT org_id FROM organizations WHERE user_id = ?', [userId]);
        if (org.length === 0) {
            return res.status(403).json({ message: 'Access denied. User is not associated with an organization.' });
        }

        const orgId = org[0].org_id;

        // Insert the event into the database
        const [result] = await connection.query(
            'INSERT INTO events (org_id, title, description, location, start_date, start_time, end_date, end_time, requirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [orgId, title, description, location, start_date, start_time, end_date, end_time, requirements]
        );

        res.status(201).json({
            message: 'Event created successfully',
            event: {
                event_id: result.insertId,
                org_id: orgId,
                title,
                description,
                location,
                start_date,
                start_time,
                end_date,
                end_time,
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
        // Query to fetch all events with organization details
        const [events] = await connection.query(`
            SELECT 
                events.event_id,
                events.title,
                events.description,
                events.location,
                events.start_date,
                events.start_time,
                events.end_date,
                events.end_time,
                events.requirements,
                events.status,
                events.created_at,
                events.updated_at,
                organizations.org_id,
                organizations.name AS org_name,
                organizations.description AS org_description,
                organizations.logo AS org_logo,
                organizations.website AS org_website,
                organizations.contact_email AS org_contact_email
            FROM 
                events
            JOIN 
                organizations 
            ON 
                events.org_id = organizations.org_id;
        `);

        res.json(events); // Return the events with organization details
    } catch (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ message: 'Error fetching events' });
    } finally {
        connection.release();
    }
};

// Get event by ID
const getEventById = async (req, res) => {
    const { event_id } = req.body; // Get event_id from the request body
    const connection = await pool.getConnection();
    try {
        const [event] = await connection.query('SELECT * FROM events WHERE event_id = ?', [event_id]);
        if (event.length === 0) {
            res.status(404).json({ message: 'Event not found' });
        } else {
            res.json(event[0]);
        }
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Error fetching event' });
    } finally {
        connection.release();
    }
};

// Update an event
const updateEvent = async (req, res) => {
    const { event_id, title, description, location, start_date, start_time, end_date, end_time, requirements } = req.body; // Get data from the request body
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Fetch the organization ID linked to the authenticated user
        const [org] = await connection.query('SELECT org_id FROM organizations WHERE user_id = ?', [userId]);
        if (org.length === 0) {
            return res.status(403).json({ message: 'Access denied. User is not associated with an organization.' });
        }

        const orgId = org[0].org_id;

        // Ensure the event belongs to the organization
        const [event] = await connection.query(
            'SELECT * FROM events WHERE event_id = ? AND org_id = ?',
            [event_id, orgId]
        );

        if (event.length === 0) {
            return res.status(403).json({ message: 'Access denied. Event does not belong to this organization.' });
        }

        // Update the event
        const [result] = await connection.query(
            'UPDATE events SET title = ?, description = ?, location = ?, start_date = ?, start_time = ?, end_date = ?, end_time = ?, requirements = ? WHERE event_id = ?',
            [title, description, location, start_date, start_time, end_date, end_time, requirements, event_id]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Event not found' });
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
    const { event_id } = req.body; // Get event_id from the request body
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Fetch the organization ID linked to the authenticated user
        const [org] = await connection.query('SELECT org_id FROM organizations WHERE user_id = ?', [userId]);
        if (org.length === 0) {
            return res.status(403).json({ message: 'Access denied. User is not associated with an organization.' });
        }

        const orgId = org[0].org_id;

        // Ensure the event belongs to the organization
        const [event] = await connection.query(
            'SELECT * FROM events WHERE event_id = ? AND org_id = ?',
            [event_id, orgId]
        );

        if (event.length === 0) {
            return res.status(403).json({ message: 'Access denied. Event does not belong to this organization.' });
        }

        // Delete the event
        const [result] = await connection.query('DELETE FROM events WHERE event_id = ?', [event_id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Event not found' });
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

// Get events for the organization associated with the authenticated user
const getEventsByOrganization = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Fetch the organization ID linked to the authenticated user
        const [org] = await connection.query('SELECT org_id FROM organizations WHERE user_id = ?', [userId]);
        if (org.length === 0) {
            return res.status(403).json({ message: 'Access denied. User is not associated with an organization.' });
        }

        const orgId = org[0].org_id;

        // Fetch all events for the organization
        const [events] = await connection.query(
            `SELECT 
                events.event_id,
                events.title,
                events.description,
                events.location,
                events.start_date,
                events.start_time,
                events.end_date,
                events.end_time,
                events.requirements,
                events.status,
                organizations.name AS org_name,
                organizations.logo AS org_logo,
                organizations.website AS org_website,
                GROUP_CONCAT(CONCAT(users.first_name, ' ', users.last_name) SEPARATOR ', ') AS volunteer_names,
                GROUP_CONCAT(users.email SEPARATOR ', ') AS volunteer_emails
            FROM 
                events
            JOIN 
                organizations ON events.org_id = organizations.org_id
            LEFT JOIN 
                user_events ON events.event_id = user_events.event_id
            LEFT JOIN 
                users ON user_events.user_id = users.user_id
            WHERE 
                events.org_id = ?
            GROUP BY 
                events.event_id`,
            [orgId]
        );
        
        const processedEvents = events.map(event => ({
            ...event,
            volunteer_names: event.volunteer_names ? event.volunteer_names.split(', ') : [],
            volunteer_emails: event.volunteer_emails ? event.volunteer_emails.split(', ') : []
        }));

        res.json(processedEvents);
    } catch (err) {
        console.error('Error fetching events by organization:', err);
        res.status(500).json({ message: 'Error fetching events by organization' });
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
    getEventsByOrganization
};