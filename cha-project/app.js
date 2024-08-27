const express = require('express');
const app = express();
const cors = require('cors')

const customersRouter = require('./api/routes/customerRoute')

app.use(cors());
app.use('/api/customers', customersRouter)

module.exports = app;
