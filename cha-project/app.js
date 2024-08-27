const express = require('express');
const app = express();
const cors = require('cors')

const customersRouter = require('./api/routes/customerRoute')
const testRouter = require('./api/routes/testRoute');


app.use(cors());
app.use('/api/customers', customersRouter)
app.use('/api/test', testRouter);


module.exports = app;
