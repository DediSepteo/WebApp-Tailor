const db = require('./dbconnection'); 

const Order = {
    // Get all orders
    getAll: (callback) => {
        const query = `
            SELECT 
                o.Order_ID,
                o.Quantity,
                o.Type,
                o.Status,
                o.Date,
                o.Price,
                o.MeasurementNo,
                org.Org_Name
            FROM 
                \`order\` o
            JOIN 
                \`organization\` org ON o.Org_ID = org.Org_ID
        `;

        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    // Get a single order by ID
    getById: (id, callback) => {
        const query = 'SELECT * FROM `order` WHERE Order_ID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0]); // Assuming Order_ID is unique, we return the first (and only) result
        });
    },

    // Create a new order
    create: (newOrder, callback) => {
        const query = 'INSERT INTO `order` (Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const { Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status } = newOrder;

        db.query(query, [Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.insertId); // Return the ID of the newly created order
        });
    },

    // Update an existing order
    update: (id, updatedOrder, callback) => {
        const query = 'UPDATE `order` SET Org_ID = ?, Date = ?, Quantity = ?, Type = ?, Price = ?, MeasurementNo = ?, Status = ? WHERE Order_ID = ?';
        const { Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status } = updatedOrder;

        db.query(query, [Org_ID, Date, Quantity, Type, Price, MeasurementNo, Status, id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },

    // Delete an order
    delete: (id, callback) => {
        const query = 'DELETE FROM `order` WHERE Order_ID = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results.affectedRows); // Return number of affected rows
        });
    },
};

module.exports = Order;
