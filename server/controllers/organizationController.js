const pool = require('../db/config.js');
const bcrypt = require('bcrypt');
const fs = require('fs');
const { uploadToCloudinary } = require('../config/cloudinary');

//signup an organization
const signUpOrganization = async (req, res) => {
    const { email, password, first_name, last_name, profile_picture = null, name, description, logo, website, contact_email } = req.body;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    // Validate password
    if (!password || password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validate first name and last name
    if (!first_name || !last_name) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    // Validate profile picture
    if (profile_picture && !profile_picture.startsWith('http')) {
        return res.status(400).json({ message: 'Invalid profile picture URL' });
    }

    // Validate organization name
    if (!name) {
        return res.status(400).json({ message: 'Organization name is required' });
    }

    // Validate contact email
    if (!contact_email || !emailRegex.test(contact_email)) {
        return res.status(400).json({ message: 'Invalid contact email' });
    }

    const connection = await pool.getConnection();
    try {
        // Start a transaction
        await connection.beginTransaction();

        // Step 1: Create a user account
        const hashedPassword = await bcrypt.hash(password, 10);
        await connection.query(
            'INSERT INTO users (email, password_hash, role, first_name, last_name, profile_picture) VALUES (?, ?, ?, ?, ?, ?)',
            [email, hashedPassword, 'organization', first_name, last_name, profile_picture]
        );

        // Step 2: Retrieve the newly created user_id
        const [userResult] = await connection.query(
            'SELECT user_id FROM users WHERE email = ?',
            [email]
        );

        if (userResult.length === 0) {
            throw new Error('Failed to retrieve user_id after insertion');
        }

        const userId = userResult[0].user_id; // Get the user_id from the query result

        // Step 3: Create an organization profile linked to the user
        await connection.query(
            'INSERT INTO organizations (user_id, name, description, logo, website, contact_email) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, description, logo, website, contact_email]
        );

        // Commit the transaction
        await connection.commit();

        res.status(201).json({
            message: 'Organization sign-up successful',
            user: {
                user_id: userId,
                email,
                role: 'organization',
                first_name,
                last_name,
                profile_picture,
            },
            organization: {
                name,
                description,
                logo,
                website,
                contact_email,
            },
        });
    } catch (err) {
        // Rollback the transaction in case of an error
        await connection.rollback();

        console.error('Error signing up organization:', err);

        if (err.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Email already exists' });
        } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
            res.status(400).json({ message: 'Invalid user ID. User creation failed.' });
        } else {
            res.status(500).json({ message: 'Error signing up organization' });
        }
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Get organization by user ID (for authenticated organization users)
const getOrganizationByUserId = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Check if the user is an organization
        const [user] = await connection.query('SELECT role FROM users WHERE user_id = ?', [userId]);
        if (user.length === 0 || user[0].role !== 'organization') {
            return res.status(403).json({ message: 'Access denied. User is not an organization.' });
        }

        // Fetch the organization linked to the user
        const [organization] = await connection.query('SELECT * FROM organizations WHERE user_id = ?', [userId]);
        if (organization.length === 0) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.json(organization[0]);
    } catch (err) {
        console.error('Error fetching organization:', err);
        res.status(500).json({ message: 'Error fetching organization' });
    } finally {
        connection.release();
    }
};

// Update organization profile (for authenticated organization users)
const updateOrganization = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user
    const { name, description, website, contact_email } = req.body;

    // Logo will come from Cloudinary upload
    let logoUrl = null;

    // Validate contact email if provided
    if (contact_email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(contact_email)) {
            return res.status(400).json({ message: 'Invalid contact email' });
        }
    }

    // If file was uploaded, process it
    if (req.file) {
        try {
            // Upload file to Cloudinary
            logoUrl = await uploadToCloudinary(req.file.path);

            // Delete the temporary file
            fs.unlinkSync(req.file.path);
        } catch (error) {
            console.error('Error processing organization logo:', error);
            return res.status(500).json({ message: 'Error processing organization logo' });
        }
    }

    const connection = await pool.getConnection();
    try {
        // Check if the user is an organization
        const [user] = await connection.query('SELECT role FROM users WHERE user_id = ?', [userId]);
        if (user.length === 0 || user[0].role !== 'organization') {
            return res.status(403).json({ message: 'Access denied. User is not an organization.' });
        }

        // Dynamically build the SQL query based on provided fields
        let query = 'UPDATE organizations SET ';
        const updates = [];
        const values = [];

        if (name) {
            updates.push('name = ?');
            values.push(name);
        }

        if (description) {
            updates.push('description = ?');
            values.push(description);
        }

        if (website) {
            updates.push('website = ?');
            values.push(website);
        }

        if (contact_email) {
            updates.push('contact_email = ?');
            values.push(contact_email);
        }

        if (logoUrl) {
            updates.push('logo = ?');
            values.push(logoUrl);
        }

        // If no fields are provided to update, return an error
        if (updates.length === 0) {
            return res.status(400).json({ message: 'No fields provided for update' });
        }

        // Add the WHERE clause
        query += updates.join(', ') + ' WHERE user_id = ?';
        values.push(userId);

        // Execute the query
        const [result] = await connection.query(query, values);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.json({
            message: 'Organization updated successfully',
            logo: logoUrl || 'No change' // Return the new logo URL if updated
        });
    } catch (err) {
        console.error('Error updating organization:', err);
        res.status(500).json({ message: 'Error updating organization' });
    } finally {
        connection.release();
    }
};

// Delete organization (for authenticated organization users)
const deleteOrganization = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        // Check if the user is an organization
        const [user] = await connection.query('SELECT role FROM users WHERE user_id = ?', [userId]);
        if (user.length === 0 || user[0].role !== 'organization') {
            return res.status(403).json({ message: 'Access denied. User is not an organization.' });
        }

        // Delete the organization linked to the user
        const [result] = await connection.query('DELETE FROM organizations WHERE user_id = ?', [userId]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Organization not found' });
        } else {
            res.json({ message: 'Organization deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting organization:', err);
        res.status(500).json({ message: 'Error deleting organization' });
    } finally {
        connection.release();
    }
};

// Get all organizations (public route)
const getAllOrganizations = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [organizations] = await connection.query('SELECT * FROM organizations');
        res.json(organizations);
    } catch (err) {
        console.error('Error fetching organizations:', err);
        res.status(500).json({ message: 'Error fetching organizations' });
    } finally {
        connection.release();
    }
};

module.exports = { signUpOrganization, getOrganizationByUserId, updateOrganization, deleteOrganization, getAllOrganizations };