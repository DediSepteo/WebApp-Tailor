const db = require('./dbconnection');

const orders = {
    // Get all orders
    getAll: (type, callback) => {
        var query = `
            SELECT 
                o.order_ID,
                o.qty,
                o.status,
                o.Date,
                o.price,
                o.measurementNo,
                org.name
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
        `;
        if (type) {
            query += ` WHERE org.type = ?`
        }

        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });

    },

    getAllCorp: (callback) => {
        const query = `
            SELECT 
                o.order_ID,
                o.qty,
                o.status,
                o.Date,
                o.price,
                o.measurementNo,
                org.name
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
            WHERE
                org.type = "Corporate"
        `;

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getLatestOrder: (callback) => {
        const query = `
            SELECT 
                o.order_ID,
                o.qty,
                o.status,
                o.Date,
                o.price,
                o.measurementNo,
                org.name
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
            WHERE 
                o.status != "Ready"
            ORDER BY 
                o.order_id DESC
            LIMIT 5
        `;

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getReadyOrder: (type, callback) => {
        var query = `SELECT 
                o.order_ID,
                o.qty,
                o.status,
                o.Date,
                o.price,
                o.measurementNo,
                org.name
            FROM 
                \`orders\` o
            JOIN 
                \`organization\` org ON o.org_id = org.org_id
            WHERE o.status = "Ready"`
        if (type) {
            query += `AND org.type = ?`
        }
        db.query(query, type ? [type] : [], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Get a single orders by ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM `orders` WHERE orders_ID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]); // Assuming orders_ID is unique, we return the first (and only) result
        });
    },

    // Create a new orders
    create: (neworders, callback) => {
        const query = 'INSERT INTO `orders` (Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
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
        const query = 'UPDATE orders SET Status = "Cancelled" WHERE order_id = ?'
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Update an existing orders
    update: (id, updatedorders, callback) => {
        const query = 'UPDATE `orders` SET Org_ID = ?, Date = ?, Quantity = ?, Type = ?, Price = ?, MeasurementNo = ?, Status = ? WHERE orders_ID = ?';
        const { Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status } = updatedorders;

        db.query(query, [Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },

    // Delete an orders
    delete: (id, callback) => {
        const query = 'DELETE FROM `orders` WHERE orders_ID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },

    // Get total Revenue
    sumPrice: (callback) => {
        const query = 'SELECT SUM(Price) AS totalPrice FROM `orders`'; // Assuming Price is the column name
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].totalPrice);
        });
    }
};

module.exports = orders;
