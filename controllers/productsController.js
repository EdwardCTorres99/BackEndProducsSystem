/**
 * Product Controller
 * 
 * This module is responsible for handling all product-related operations, 
 * including fetching products by category or name, and creating a new product 
 * with associated images.
 * 
 */

const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    

    /**
     * Creates a new product entry in the database.
     * For each provided image, it uploads the image to cloud storage,
     * stores its URL, and updates the product entry in the database.
     * 
     * @function
     * @async
     * @param {Object} req - Express request object, containing product details and associated images.
     * @param {Object} res - Express response object.
     */
    create(req, res) {
        const product = JSON.parse(req.body.product);
        const files = req.files;
        
        let inserts = 0; 
        
        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Error al registrar el producto no tiene imagenes',
            });
        }else {
            Product.create(product, (err, id_product) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del producto',
                        error: err
                    });
                }
                
                product.id = id_product;

                const start = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);

                        if (url != undefined && url != null) {
                            if (inserts === 0) {
                                product.image1 = url;
                            }else if (inserts === 1) {
                                product.image2 = url;
                            }else if (inserts === 2) {
                                product.image3 = url;
                            }
                        }

                        await Product.update(product, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con el registro del producto',
                                    error: err
                                });
                            }

                            inserts++;

                            if (inserts === files.length) {
                                return res.status(201).json({
                                    success: true,
                                    message: 'El producto se almaceno correctamente',
                                    data: data
                                });
                            }
                        });
                    });
                }
    
                start();
            });
        }     
    },

    /* @function
    * @async
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    */
    getAll(req, res) {
        Product.getAll((err, products) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'Error al obtener los productos',
                    error: err
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Productos obtenidos con éxito',
                data: products
            });
        });
    }
}
