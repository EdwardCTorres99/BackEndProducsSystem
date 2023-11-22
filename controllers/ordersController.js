/**
 * Order Controller.
 * 
 * This controller is responsible for managing different functionalities related to orders:
 * - Retrieval of orders based on their status and other parameters.
 * - Creation of new orders.
 * - Updating the status of orders.
 * 
 */

const Order = require('../models/order');
const OrderHasProducts = require('../models/order_has_products');
const User = require('../models/user');
//const PushNotificationsController = require('../controllers/pushNotificationsController');

module.exports = {


    /**
     * Create a new order entry in the system.
     * 
     * @param {Object} req - Express request object containing order details.
     * @param {Object} res - Express response object used to return the result.
     */
    async create(req, res) {

        const order = req.body;

        Order.create(order, async (err, id) => {

            if (err) {  //VALIDACION EN CASO DE ERROR 
                return res.status(501).json({
                    success: false,
                    message: "Hubo un error al crear la orden",
                    error: err
                });
            }

            for(const product of order.products) {
                await OrderHasProducts.create(id, product.id, product.quantity, (err, id_data) => {
                    if (err) {  //VALIDACION EN CASO DE ERROR 
                        return res.status(501).json({
                            success: false,
                            message: "Hubo un error con los productos en la orden",
                            error: err,
                        });
                    }
                });
            }

            return res.status(201).json({
                success: true,
                message: "La orden se creo correctamente",
                data: `${id}`, // EL ID DE LA NUEVA ORDEN
            });

        });

    },

   
    
}
