const db = require('../dbconnection'); // Import the MySQL connection from dbconnection.js

const Customers = {
    // Get all customers
    getAll: (callback) => {
        const query = 'SELECT * FROM customers';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Get customer by ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM customers WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]); // Assuming 'id' is unique, so there should be one result
        });
    },

    // Add a new customer
    add: (customer, callback) => {
        const query = 'INSERT INTO customers SET ?';
        db.query(query, customer, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.insertId);
        });
    },

    // Update a customer by ID
    updateById: (id, customer, callback) => {
        const query = 'UPDATE customers SET ? WHERE id = ?';
        db.query(query, [customer, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows);
        });
    },

    // Delete a customer by ID
    deleteById: (id, callback) => {
        const query = 'DELETE FROM customers WHERE id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows);
        });
    }
};

module.exports = Customers;
