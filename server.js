// Load Env variables
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const path = require("path");
const connectToDb = require("./config/connectToDb");
const authMiddleware = require("./middlewares/auth");

const { 
    authenticationRoute,
    userRoutes
} = require("./routes/index");

// Create an express app
const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectToDb();

// Routing
app.use("/ipo", authenticationRoute);
app.use("/ipo", authMiddleware, userRoutes);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, './client/build')));

// Handle requests to your React app's HTML file
app.all('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// Start the server
app.listen(process.env.PORT);
