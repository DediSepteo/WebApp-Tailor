const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Employee = {
    // Get all customers
    getAll: (callback) => {
        const query = 'SELECT * FROM employee';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    getCount: (org_id, callback) => {
        const query = 'SELECT COUNT(*) AS EmployeeNo FROM employee WHERE org_id = ?';
        db.query(query, [org_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results[0].EmployeeNo);
        });
    },

    getEmpPass: (email, org_id, callback) => {
        const query = 'SELECT * FROM employee WHERE email = ? AND org_id = ?';
        db.query(query, [email, org_id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })

    },
    createEmp: (name, email, password, org_id, address, callback) => {
        const query = 'INSERT INTO employee (name, email, password, org_id, address) VALUES (?, ?, ?, ?, ?)';

        db.query(query, [name, email, password, org_id, address], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
    deleteEmp: (id, callback) => {
        const query = 'DELETE FROM employee WHERE org_id = ?';

        db.query(query, [id], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }

};

module.exports = Employee;
