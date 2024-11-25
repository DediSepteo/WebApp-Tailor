const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Organization = {
    getAll: (type, callback) => {
        var query = `SELECT o.org_id as "id", o.name, email, phone, industry, city, country, address_line1, address_line2, postal_code, state, o.status, COUNT(product_id) as "Number of Products"
                    FROM organization o LEFT JOIN products p ON o.org_id = p.org_id AND p.status = "active" `
        if (type)
            query += ' WHERE o.type = ?'
        query += ' GROUP BY o.org_id ORDER BY o.status'
        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getRecent: (limit, type, callback) => {
        var query = `SELECT o.org_id as "id", o.name, email, phone, industry, city, country, address_line1, address_line2, postal_code, state, o.status, COUNT(product_id) as "Number of Products"
                    FROM organization o LEFT JOIN products p ON o.org_id = p.org_id AND p.status = "active" 
                    WHERE 
                        o.status = "active"`
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

    getOrgById: (id, callback) => {
        const query = 'SELECT name, email, phone, industry, type, city, country, address_line1, address_line2, postal_code, state, status FROM ORGANIZATION WHERE org_id = ? AND status = "active"';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
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
    createOrg: (name, email, password, type, industry, city, country, address_line1, address_line2, postal_code, state, phone, callback) => {
        const query = `INSERT INTO Organization (name, email, industry, type, password, status, city, country, address_line1, address_line2, postal_code, state, phone)
        VALUES(?, ?, ?, ?, ?, "active", ?, ?, ?, ?, ?, ?, ?)`;

        db.query(query, [name, email, industry, type, password, city, country, address_line1, address_line2, postal_code, state, phone], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },


    updateOrg: (id, data, callback) => {
        var query = 'UPDATE organization SET'
        const keys = Object.keys(data)
        keys.forEach((key) => {
            query += ` ${key} = ?,`
        })
        query = query.slice(0, -1)
        query += " WHERE org_id = ?"
        var params = Object.values(data)
        params.push(id)
        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    activateOrg: (id, callback) => {
        const query = 'UPDATE organization SET status = "active" WHERE org_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    deactivateOrg: (id, callback) => {
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
        const query = 'SELECT * FROM organization WHERE name = ?';

        db.query(query, [name], (error, results) => {
            if (error) {
                return callback(error, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = Organization;
