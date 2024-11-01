const express = require('express');
const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employeeModel'); // Import the model for employee

const router = express.Router();
const bcrypt = require('bcrypt');

const saltRounds = 10;

const { JWT_SECRET } = process.env

router.get('/', (req, res) => {
    employeeModel.getAll((err, results) => {
        if (err) {
            console.error('Error fetching employee:', err);
            return res.status(500).send('Error fetching employee');
        }
        console.log('Fetched employee data:', results); // Log the results
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

router.get('/count', (req, res) => {
    const org_id = req.query.org_id
    console.log(org_id)
    employeeModel.getCount(org_id, (err, results) => {
        if (err) {
            console.error('Error getting count:', err);
            return res.status(500).send('Error getting count');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

router.post('/register', async (req, res) => {
    const empData = req.body
    const { name, email, encodedOrgID, address } = empData
    const password = empData.password.toString()
    if (!encodedOrgID) {
        return res.status(400).send("Organization ID not found")
    }
    const org_id = jwt.decode(encodedOrgID).orgID

    if (!org_id) {
        return res.status(400).send("Organization ID not found")
    }

    const hashPass = await bcrypt.hash(password, saltRounds)

    employeeModel.createEmp(name, email, hashPass, org_id, address, (err, results) => {
        if (err) {
            console.error('Error creating employee:', err);
            return res.status(500).send('Error creating employee');
        }
        res.setHeader('Content-Type', 'application/json');
        return res.status(201).json({ message: 'employee created successfully', data: results });
    });
});

router.delete('/:id', (req, res) => {
    const empID = req.params.id;
    console.log(empID)
    employeeModel.deleteEmp(empID, (err, results) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).send('Error deleting employee');
        }
        return res.status(200).send('employee deleted successfully');
    })
})



module.exports = router;
