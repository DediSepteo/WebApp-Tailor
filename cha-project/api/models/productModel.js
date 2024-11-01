const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Product = {
    // Get all customers
    getAll: (type, callback) => {
        var query = `SELECT p.product_id as id, p.name, p.description, FORMAT(p.price, 2) AS price,
                    o.name as "organization" FROM products as p INNER JOIN organization as o ON p.org_id = o.org_id WHERE p.status = "active" `;
        if (type)
            query += ' AND o.type = ?'
        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getRecent: (type, callback) => {
        var query = `SELECT FORMAT(p.price, 2) AS price, p.product_id AS id, p.name, p.description, o.name as org_name
                        FROM products as p
                        INNER JOIN organization as o ON p.org_id = o.org_id WHERE p.status = "active"`
        if (type)
            query += ' AND o.type = ?'
        query += ` ORDER BY p.product_id DESC LIMIT 5;`
        db.query(query, type ? [type] : [], (err, results) => {
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
        const query = 'UPDATE products SET status = "inactive" WHERE product_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

};

module.exports = Product;
