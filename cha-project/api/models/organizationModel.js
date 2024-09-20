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
    createOrg: (orgData, callback) => {
        const name = orgData.name
        const email = orgData.email
        const password = orgData.password
        const type = orgData.type
        const industry = orgData.industry

        const query = 'INSERT INTO ORGANIZATION (name, email, password, type, industry) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [name, email, password, type, industry], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

};

module.exports = Organization;
