/**
 * Products Routes Module.
 * 
 * This module defines the routes related to product operations such as
 * creating a new product, fetching products based on a category, and searching
 * products by name within a category. All routes in this module require 
 * authentication using JSON Web Tokens (JWT) for security. Additionally, 
 * the creation route supports image uploads for products.
 * 
 */

const productsController = require("../controllers/productsController");
const passport = require("passport");

/**
 * Initializes the product-related routes.
 * 
 * @param {object} app - The express application instance.
 * @param {object} upload - The multer middleware for handling file uploads.
 */
module.exports = (app, upload) => {
  // Route to create a new product with image uploads
  app.post('/api/products/create',  passport.authenticate('jwt', { session: false }), upload.array('image', 3), productsController.create);
  
  app.get('/api/products/getAll', productsController.getAll);

};
