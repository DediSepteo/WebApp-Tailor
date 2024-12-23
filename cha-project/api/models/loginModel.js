const db = require('./dbconnection'); // Import the MySQL connection from dbconnection.js

const Login = {
    getAccountPass: (email, callback) => {
        const query = `
        SELECT password, 'organization' AS source 
        FROM ORGANIZATION 
        WHERE email = ? AND status = "active"
        UNION
        SELECT password, 'temporary' AS source 
        FROM TempAccount 
        WHERE email = ? AND status = "active";`;
        db.query(query, [email, email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results)
        })
    },
};

module.exports = Login;
