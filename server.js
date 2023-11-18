const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");

const port = process.env.port || 3000;

// Middleware Configuration
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// Disabling 'x-powered-by' header for security reasons
app.disable("x-powered-by");

app.set("port", port);

server.listen(3000, "0.0.0.0", function () {
    console.log(`NodeJS application started on port ${port}`);
});

// Default route for checking server status
app.get("/", (req, res) => {
    res.send("Root path of the backend server.");
  });

/**
 * Error handling middleware.
 * This catches and logs errors, then sends a generic error response.
 */
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).send(err.stack);
  });


/**
 * HTTP Status Codes:
 * 200 - Successful Response
 * 404 - URL Not Found
 * 500 - Internal Server Error
 */