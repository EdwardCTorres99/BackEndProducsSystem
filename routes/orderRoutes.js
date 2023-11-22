/**
 * Orders Routes Module.
 * 
 * This module defines the routes associated with order operations. It includes functionalities 
 * like creating new orders, retrieving orders based on various criteria (status, associated delivery person, 
 * or client), and updating the status of orders. All routes in this module are protected with 
 * JSON Web Tokens (JWT) to ensure authenticated and authorized access.
 * 
 */

const OrdersController = require("../controllers/ordersController");
const passport = require("passport");

/**
 * Initializes the order-related routes.
 * 
 * @param {object} app - The express application instance.
 */
module.exports = (app) => {
  // Route to create a new order
  app.post("/api/orders/create", passport.authenticate('jwt', { session: false}), OrdersController.create);
  
  
};
