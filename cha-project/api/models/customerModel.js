const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Customers = {
    // Get all customers
    getAll: (callback) => {
        const query = 'SELECT * FROM organization';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = Customers;
