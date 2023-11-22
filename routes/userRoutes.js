/**
 * User Routes Module.
 * 
 * This module defines the routes related to user operations such as registration, login,
 * and user profile updates. It incorporates authentication using JSON Web Tokens (JWT)
 * and also handles routes that involve image uploads.
 * 
 */

const usersController = require("../controllers/usersController");
const passport = require("passport");

/**
 * Initializes the user-related routes.
 * 
 * @param {object} app - The express application instance.
 * @param {object} upload - The multer middleware for handling file uploads.
 */

module.exports = (app, upload) => {
    // User creation routes
    app.post("/api/users/create", usersController.register);
    app.post("/api/users/createWithImage", upload.array("image", 1), usersController.registerWithImage);
    
    
  };