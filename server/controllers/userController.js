const pool = require('../db/config.js');


const getUser = async (req, res) => {
    try {
        console.log("Hi, I'm a user!")
    } catch (err) {
        console.log('Error fetching user', err);
        res.status(500).json({ message: 'Error fetching user' });
    }
}

module.exports = { getUser }