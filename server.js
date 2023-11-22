/**
 * Main server configuration file for the application.
 * This file sets up the Express server, middleware, routes, and socket.io configurations.
 */

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");

// Route Imports
const usersRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const ordersRoutes = require("./routes/orderRoutes");


// Port configuration, defaults to 3000 if not set in environment
const port = process.env.PORT || 3000;

// Middleware Configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration import
require("./config/passport")(passport);

// Disabling 'x-powered-by' header for security reasons
app.disable("x-powered-by");

app.set("port", port);



/**
 * Multer configuration for memory storage.
 * Useful for temporary uploads or processing before saving to disk/cloud.
 */
const upload = multer({
  storage: multer.memoryStorage(),
});

/**
 * API Route Configuration
 */
usersRoutes(app, upload);
productRoutes(app, upload);
ordersRoutes(app);


// Start server listening
server.listen(3000, "0.0.0.0", function () {
  console.log(`NodeJS application started on port ${port}`);
});

/**
 * Error handling middleware.
 * This catches and logs errors, then sends a generic error response.
 */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.stack);
});

// Default route for checking server status
app.get("/", (req, res) => {
  res.send("Root path of the backend server.");
});

module.exports = {
  app: app,
  server: server,
};

/**
 * HTTP Status Codes:
 * 200 - Successful Response
 * 404 - URL Not Found
 * 500 - Internal Server Error
 */
