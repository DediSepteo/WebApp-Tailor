const express = require('express');
const app = express();
const cors = require('cors');

// Import routes
const organizationRouter = require('./api/routes/organizationRoute');
const employeeRouter = require('./api/routes/employeeRoute')
const testRouter = require('./api/routes/testRoute');
const loginRouter = require('./api/routes/loginRoute');
const protectedRoute = require('./api/routes/protectedRoute')
const orderRouter = require('./api/routes/ordersRoute')
const productRouter = require('./api/routes/productRoute')
const paymentRouter = require('./api/routes/paymentRoute')
const contactRoutes = require('./api/routes/emailRoute'); // Adjust the path


// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/org', organizationRouter);
app.use('/api/emp', employeeRouter)
app.use('/api/test', testRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', protectedRoute)
app.use('/api/order', orderRouter)
app.use('/api/product', productRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/contact', contactRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app;
