const db = require('./dbconnection');

const orders = {
    // Get all orders
    getAll: (type, callback) => {
        var query = `
            SELECT 
                o.order_id AS id,
                o.qty,
                o.status,
                o.date as date,
                FORMAT(o.subtotal, 2) AS subtotal,
                org.name AS "placed by"
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
        `;
        if (type) {
            query += ` WHERE org.type = ?`
        }

        query += " ORDER BY o.order_id DESC"

        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });

    },

    getLatestOrder: (type, callback) => {
        var query = `
            SELECT 
                o.order_id,
                o.qty,
                o.status,
                o.date,
                FORMAT(o.subtotal,2) AS subtotal,
                org.name AS "placed by",
                COUNT(emp_id) AS measurementNo
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
            LEFT JOIN
				\`measurements\` m ON m.order_id = o.order_id
            WHERE 
                o.status != "Ready"`
        if (type) {
            query += `AND org.type = ?`
        }

        query += `GROUP BY o.order_id
                ORDER BY
                o.order_id DESC
                LIMIT 5;`

        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getReadyOrder: (type, limit, callback) => {
        var query = `SELECT
            o.order_id,
            o.qty,
            o.status,
            o.date,
            FORMAT(o.subtotal, 2) AS subtotal,
            org.name AS "placed by",
            COUNT(emp_id) AS measurementNo
            FROM
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
            LEFT JOIN
				\`measurements\` m ON m.order_id = o.order_id
            WHERE o.status = "Ready"`
        if (type) {
            query += ` AND org.type = ?`
        }
        query += `GROUP BY o.order_id
                ORDER BY
                o.order_id DESC`
        if (limit)
            query += " LIMIT ?"

        const params = [];
        if (type) params.push(type);
        if (limit) params.push(parseInt(limit));
        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Get a single orders by ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM `orders` WHERE orders_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]); // Assuming orders_ID is unique, we return the first (and only) result
        });
    },

    // Create a new orders
    create: (neworders, callback) => {
        const query = 'INSERT INTO `orders` (org_id, date, quantity, type, subtotal, measurementNo, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status } = neworders;

        db.query(query, [Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.insertId); // Return the ID of the newly created orders
        });
    },

    cancelOrder: (id, callback) => {
        console.log(id)
        const query = 'UPDATE `orders` SET status = "Cancelled" WHERE order_id = ?'
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Update an existing orders
    update: (id, updatedOrders, callback) => {
        const query = 'UPDATE `orders` SET org_id = ?, date = ?, quantity = ?, type = ?, subtotal = ?, measurementNo = ?, status = ? WHERE order_id = ?';
        const { org_id, date, quantity, type, subtotal, measurementNo, status } = updatedOrders;

        db.query(query, [org_id, date, quantity, type, subtotal, measurementNo, status, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },

    // Delete an orders
    delete: (id, callback) => {
        const query = 'DELETE FROM `orders` WHERE order_id = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },

    // Get total Revenue
    sumSubtotal: (callback) => {
        const query = 'SELECT SUM(subtotal) AS grandTotal FROM `orders`'; // Assuming Price is the column name
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].grandTotal);
        });
    }
};

module.exports = orders;
