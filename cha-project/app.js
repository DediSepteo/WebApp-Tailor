const express = require('express');
const app = express();
const cors = require('cors');

// Import routes
const customersRouter = require('./api/routes/organizationRoute');
const testRouter = require('./api/routes/testRoute');
const loginRouter = require('./api/routes/loginRoute');
const protectedRoute = require('./api/routes/protectedRoute')
const orderRouter = require('./api/routes/ordersRoute')

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/org', customersRouter);
app.use('/api/test', testRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', protectedRoute)
app.use('/api/order', orderRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
