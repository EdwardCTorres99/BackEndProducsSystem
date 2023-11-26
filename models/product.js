//CREAR UN NUEVO PRODUCTO(RESTAURANTE)
const db = require('../config/config');

const Product = {};



Product.create = (product, result) => {

    const sql = `
    INSERT INTO
        products(
            id_restaurant,
            name,
            description,
            price,
            image1,
            image2,
            image3,
            id_category,
            created_at,
            updated_at   
        )
    VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql, 
        [   
            product.id_restaurant,
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            new Date(),
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de la nuevo producto:', res.insertId);
                result(null, res.insertId);
            }
        }

    )

}

Product.getAll = (result) => {
    const sql = 'SELECT * FROM products';

    db.query(sql, (err, res) => {
        if (err) {
            console.log('Error:', err);
            result(err, null);
        } else {
            console.log('Productos obtenidos con éxito.');
            result(null, res);
        }
    });
}

Product.update = (product, result) => {

    const sql = `
    UPDATE
        products
    SET
        name = ?,
        description = ?,
        price = ?,
        image1 = ?,
        image2 = ?,
        image3 = ?,
        id_category = ?,
        updated_at = ?
    WHERE
        id = ?
    `;

    db.query(
        sql, 
        [
            product.name,
            product.description,
            product.price,
            product.image1,
            product.image2,
            product.image3,
            product.id_category,
            new Date(),
            product.id,
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del producto actualizado:', product.id);
                result(null, product.id);
            }
        }

    )

}


module.exports = Product;