const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Organization = {
    getAll: (type, callback) => {
        var query = `SELECT o.org_id as "id", o.name, email, industry, address, COUNT(product_id) as "Number of Products"
                     FROM organization o LEFT JOIN products p ON o.org_id = p.org_id WHERE o.status = "active" and p.status = "active"`
        if (type)
            query += ' AND type = ?'
        query += ' GROUP BY o.org_id'
        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getRecent: (limit, type, callback) => {
        var query = `SELECT o.org_id as "id", o.name, email, industry, address, COUNT(product_id) as "Number of Products"
                     FROM organization o LEFT JOIN products p ON o.org_id = p.org_id WHERE o.status = "active" and p.status = "active"`
        if (type) {
            query += " AND type = ?"
        }
        query += " GROUP BY o.org_id ORDER BY o.org_id DESC LIMIT ?"
        db.query(query, [type, limit], (err, results) => {
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
    createOrg: (name, email, password, type, industry, address, callback) => {
        const query = 'INSERT INTO ORGANIZATION (name, email, password, type, industry, address, status) VALUES (?, ?, ?, ?, ?, ?, "active")';

        db.query(query, [name, email, password, type, industry, address], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    updateOrg: (id, name, email, industry, address, callback) => {
        const query = 'UPDATE organization SET name = ?, email = ?, industry = ?, address=? WHERE org_id = ?'
        db.query(query, [name, email, industry, address, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    deleteOrg: (id, callback) => {
        const query = 'UPDATE organization SET status = "inactive" WHERE org_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    countAll: (callback) => {
        const query = 'SELECT COUNT(*) AS totalOrganizations FROM organization WHERE status = "active"';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].totalOrganizations);
        });
    },

    getOrgByCompany: (name, callback) => {
        const query = 'SELECT * FROM organization WHERE name = ?'; // Assuming `name` is a field in your `organizations` table

        db.query(query, [name], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = Organization;
