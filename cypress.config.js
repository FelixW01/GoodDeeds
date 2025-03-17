const { defineConfig } = require('cypress');
require('dotenv').config(); // Load environment variables from .env file

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      orgEmail: process.env.ORG_EMAIL,
      orgPass: process.env.ORG_PASS,
      userEmail: process.env.USER_EMAIL,
      userPass: process.env.USER_PASS,
      userFname: process.env.USER_FNAME,
      userLname: process.env.USER_LNAME,
    },
  },
});