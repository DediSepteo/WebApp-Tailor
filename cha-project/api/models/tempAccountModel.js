const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const TempAccount = {
    create: (org_id, name, email, password, createdAt, callback) => {
        const query = 'INSERT INTO TempAccount (org_id, name, email, password, createdAt, status) VALUES (?, ?, ?, ?, ?, "active")';
        db.query(query, [org_id, name, email, password, createdAt], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};


module.exports = TempAccount;
