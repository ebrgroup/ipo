// Load Env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

// Import dependencies
const express = require('express');
const cors = require('cors');
const path = require("path");
const cookieParser = require("cookie-parser");
const connectToDb = require("./config/connectToDb");
const authMiddleware = require("./middlewares/auth");
const userController = require("./controllers/userController");

const { 
    authenticationRoute,
    userRoutes,
    emailRoutes,
    messagingRoutes
} = require("./routes/index");

// Create an express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routing
app.use("/ipo", authenticationRoute);
app.use("/ipo", userRoutes);
app.use("/ipo", emailRoutes);
app.use("/ipo", messagingRoutes);
app.get("/ipo/users/Request/:id", (req, res) => {
    userController.checkResetPasswordLink(req, res);
});

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
    res.sendfile(path.join(__dirname, './client/build/index.html'));
});

connectToDb().then(() => {
    app.listen(process.env.PORT);
})
