const pool = require('../db/config.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
const createUser = async (req, res) => {
    const { email, password, first_name, last_name, profile_picture = null } = req.body;

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

    const connection = await pool.getConnection();
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Check if email already exists
        const [existingEmail] = await connection.query(`
            SELECT user_id
            FROM users
            WHERE email = ?;
        `, [email]);

        if (existingEmail.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Set the role to 'user' by default
        const role = 'user';

        // Insert the user into the database
        const [result] = await connection.query(`
            INSERT INTO users (email, password_hash, role, first_name, last_name, profile_picture)
            VALUES (?, ?, ?, ?, ?, ?);
        `, [email, hashedPassword, role, first_name, last_name, profile_picture]);

        res.status(201).json({
            message: 'User created successfully',
            user: {
                user_id: result.insertId,
                email,
                role,
                first_name,
                last_name,
                profile_picture,
            },
        });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Error creating user' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('SELECT * FROM users');
        res.json(result);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Get user profile with ID
const getUserProfile = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('SELECT user_id, email, first_name, last_name, profile_picture, role FROM users WHERE user_id = ?', [userId]);
        if (result.length === 0) {
            return res.status(404).json({ message: 'User  not found' });
        }

        // Return the user profile information
        res.json(result[0]); // Return the first row
    } catch (err) {
        console.error('Error fetching user profile:', err);
        res.status(500).json({ message: 'Error fetching user profile' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Update a user
const updateUser = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const { email, password, role, first_name, last_name, profile_picture } = req.body;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    // Validate password
    if (password && password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long' });
    }

    // Validate role
    if (!role || !['user', 'admin', 'organization'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    // Validate first name and last name
    if (!first_name || !last_name) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    // Validate profile picture
    if (profile_picture && !profile_picture.startsWith('http')) {
        return res.status(400).json({ message: 'Invalid profile picture URL' });
    }

    const connection = await pool.getConnection();
    try {
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await connection.query(`
                UPDATE users
                SET email = ?, password_hash = ?, role = ?, first_name = ?, last_name = ?, profile_picture = ?
                WHERE user_id = ?;
            `, [email, hashedPassword, role, first_name, last_name, profile_picture, userId]);

            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json({ message: 'User updated successfully' });
            }
        } else {
            const [result] = await connection.query(`
                UPDATE users
                SET email = ?, role = ?, first_name = ?, last_name = ?, profile_picture = ?
                WHERE user_id = ?;
            `, [email, role, first_name, last_name, profile_picture, userId]);

            if (result.affectedRows === 0) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.json({ message: 'User updated successfully' });
            }
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    const userId = req.user.userId; // Get userId from the authenticated user

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('DELETE FROM users WHERE user_id = ?', [userId]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    // Validate password
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }

    const connection = await pool.getConnection();
    try {
        const [result] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
        if (result.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const user = result[0];
            const isValidPassword = await bcrypt.compare(password, user.password_hash);
            if (!isValidPassword) {
                res.status(401).json({ message: 'Invalid password' });
            } else {
                const token = jwt.sign(
                    { userId: user.user_id, email: user.email, role: user.role }, // Include role in the token
                    process.env.SECRET_KEY,
                    { expiresIn: '1h' }
                );

                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 3600000,
                    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
                    sameSite: "strict",
                });

                res.json({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    role: user.role,
                });
            }
        }
    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ message: 'Error logging in user' });
    } finally {
        connection.release(); // Release the connection back to the pool
    }
};

// Logs out users
const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
        sameSite: "strict",
    });

    res.json({ message: 'User logged out successfully' });
};

module.exports = { createUser, getAllUsers, getUserProfile, updateUser, deleteUser, loginUser, logoutUser };
