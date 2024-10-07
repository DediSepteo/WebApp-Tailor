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

    getAllCorp: (callback) => {
        const query = 'SELECT * FROM organization WHERE type = "Corporate"';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getAllGovt: (callback) => {
        const query = 'SELECT * FROM organization WHERE type = "Government"';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getCorpRecent: (limit, callback) => {
        const query = 'SELECT * FROM organization WHERE type = "Corporate" ORDER BY `org_id` DESC LIMIT ?';
        db.query(query, [limit], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    },
    getGovtRecent: (limit, callback) => {
        const query = 'SELECT * FROM organization WHERE type = "Government" ORDER BY `org_id` DESC LIMIT ?';
        db.query(query, [limit], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    },

    getOrgPass: (email, callback) => {
        const query = 'SELECT * FROM ORGANIZATION WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })

    },
    createOrg: (name, email, password, type, industry, callback) => {
        const query = 'INSERT INTO ORGANIZATION (name, email, password, type, industry) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [name, email, password, type, industry], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    deleteOrg: (id, callback) => {
        const query = 'DELETE FROM ORGANIZATION WHERE org_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    countAll: (callback) => {
        const query = 'SELECT COUNT(*) AS totalOrganizations FROM organization';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].totalOrganizations);
        });
    }
};

module.exports = Organization;
