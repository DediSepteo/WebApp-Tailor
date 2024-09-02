const express = require('express');
const app = express();
const cors = require('cors');

// Import routes
const customersRouter = require('./api/routes/customerRoute');
const testRouter = require('./api/routes/testRoute');
const loginRouter = require('./api/routes/loginRoute');

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/customers', customersRouter);
app.use('/api/test', testRouter);
app.use('/api/login', loginRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
