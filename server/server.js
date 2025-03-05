const express = require('express');
const path = require('path')
const dotenv = require('dotenv')
const routes = require('./routes');
require('./db/config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000
app.use(express.json());
app.use(routes);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, "../client/dist")));

// Catch-all to serve React frontend for any other route
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})