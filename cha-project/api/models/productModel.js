const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Product = {
    // Get all customers
    getAll: (callback) => {
        const query = 'SELECT * FROM products';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Get all govt prod
    getGovt: (callback) => {
        const query = `SELECT p.price, p.product_id, p.name, p.description, o.name as org_name
                        FROM products as p, organization as o
                        WHERE o.type = "Government" AND p.org_id = o.org_id
                        ORDER BY p.product_id DESC;`
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Corp Product
    getCorp: (callback) => {
        const query = `SELECT p.price, p.product_id, p.name, p.description, o.name as org_name
                        FROM products as p, organization as o
                        WHERE o.type = "Corporate" AND p.org_id = o.org_id
                        ORDER BY p.product_id DESC;`
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    getCount: (org_id, callback) => {
        const query = 'SELECT COUNT(*) AS productNo FROM products WHERE org_id = ?';
        db.query(query, [org_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].productNo);
        });
    },
    createProduct: (name, org_id, price, description, callback) => {
        const query = 'INSERT INTO products (name, org_id, price, description) VALUES (?, ?, ?, ?)';

        db.query(query, [name, org_id, price, description], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    updateProduct: (id, name, desc, price, callback) => {
        const query = 'UPDATE products SET name = ?, description = ?, price = ? WHERE product_id = ?'
        db.query(query, [name, desc, price, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    deleteProduct: (id, callback) => {
        const query = 'DELETE FROM products WHERE product_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // for the shop page
    getOrgProduct: (org_id, callback) => {
        const query = 'SELECT * FROM products WHERE org_id = ?';
        db.query(query, [org_id], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    },
};

module.exports = Product;
