const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Organization = {
    getAll: (type, callback) => {
        var query = `SELECT o.org_id as "id", o.name, email, industry, address, COUNT(product_id) as "Number of Products"
                    FROM organization o LEFT JOIN products p ON o.org_id = p.org_id
                    WHERE 
                        o.status = "active" 
                        AND (p.status = "active" or p.product_id IS NULL)`
        if (type)
            query += ' AND o.type = ?'
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
                    FROM organization o LEFT JOIN products p ON o.org_id = p.org_id 
                    WHERE 
                        o.status = "active" 
                        AND(p.status = "active" or p.product_id IS NULL)`
        if (type) {
            query += " AND o.type = ?"
        }
        query += " GROUP BY o.org_id ORDER BY o.org_id DESC LIMIT ?"
        db.query(query, [type, limit], (err, results) => {
            if (err) {
                return callback(err, null)
            }
            callback(null, results)
        })
    },

    getOrgNames: (type, callback) => {
        const query = 'SELECT name, org_id as id FROM ORGANIZATION WHERE type = ?';
        db.query(query, [type], (err, results) => {
            if (err) {
                return callback(err, null);
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
    createOrg: (name, email, password, type, industry, address, city, country, address_line1, address_line2, postal_code, state, callback) => {
        const query = `INSERT INTO Organization (name, email, industry, type, password, address, status, city, country, address_line1, address_line2, postal_code, state)
VALUES(?, ?, ?, ?, ?, ?, "active", ?, ?, ?, ?, ?, ?)`;

        db.query(query, [name, email, industry, type, password, address, city, country, address_line1, address_line2, postal_code, state], (err, results) => {
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
