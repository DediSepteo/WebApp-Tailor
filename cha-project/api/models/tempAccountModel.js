const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const TempAccount = {
    getActiveAccount: (org_id, callback) => {
        const query = 'SELECT account_id from TempAccount WHERE org_id = ? AND status = "active"'
        db.query(query, [org_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getAccountByEmail: (email, callback) => {
        const query = 'SELECT * from tempAccount WHERE email = ? AND status = "active"'
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    },

    create: (org_id, name, email, password, createdAt, callback) => {
        const query = 'INSERT INTO TempAccount (org_id, name, email, password, createdAt, status) VALUES (?, ?, ?, ?, ?, "active")';
        db.query(query, [org_id, name, email, password, createdAt], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    deactivate: (email, callback) => {
        const query = 'UPDATE TempAccount SET status = "inactive" WHERE email = ?'
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};


module.exports = TempAccount;
