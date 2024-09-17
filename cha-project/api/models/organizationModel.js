const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Organization = {
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
    createOrg: (callback) => {
        const query = 'INSERT INTO ORGANIZATION'
    }
};

module.exports = Organization;
