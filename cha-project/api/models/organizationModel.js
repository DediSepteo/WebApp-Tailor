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
        const query = 'SELECT name, org_id as id FROM ORGANIZATION WHERE type = ? AND status = "active"';
        db.query(query, [type], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })
    },

    // getOrgPass: (email, callback) => {
    //     const query = 'SELECT * FROM ORGANIZATION WHERE email = ?';
    //     db.query(query, [email], (err, results) => {
    //         if (err) {
    //             return callback(err, null);
    //         }
    //         callback(null, results)
    //     })
    // },

    getOrgByEmail: (email, callback) => {
        const query = 'SELECT org_id, email, industry, name, address_line1, phone FROM ORGANIZATION WHERE email = ? AND status = "active"';
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })
    },

    getOrgPassById: (org_id, callback) => {
        const query = 'SELECT * FROM ORGANIZATION WHERE org_id = ? AND status = "active"';
        db.query(query, [org_id], (err, results) => {
            console.log('Query executed:', query);
            console.log('Query parameters:', org_id);
            console.log('Query results:', results);

            if (err) {
                console.error('Database error:', err);
                return callback(err, null);
            }
            if (!results || results.length === 0) {
                console.error('No results found for org_id:', org_id);
                return callback(new Error('Organization not found'), null);
            }
            callback(null, results);
        });
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
        console.log(data)
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
    },

    getRecentOrgOrders: (org_id, callback) => {
        const query = `SELECT o.order_id, o.status, o.date, o.subtotal, p.name AS product_name, op.qty AS quantity FROM Orders o INNER JOIN 
        Order_Products op ON o.order_id = op.order_id INNER JOIN Products p ON op.product_id = p.product_id WHERE o.org_id = ? AND 
        (o.status = 'Awaiting Measurements' OR o.status = 'Ready') ORDER BY o.date DESC`;

        db.query(query, [org_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getOrgByEmail: (email, callback) => {
        const query = 'SELECT * FROM organization WHERE email = ?';

        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    updatePassword: async (email, hashedPassword) => {
        const query = `UPDATE organization SET password = ? WHERE email = ?`;
        const values = [hashedPassword, email];

        try {
            const result = await db.query(query, values);

            console.log('Update Result:', result);

            if (result.affectedRows === 0) {
                throw new Error('No user found with the specified email');
            }
            //qwerty123

            return result; // Return the result of the update query
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    },

};

module.exports = Organization;
