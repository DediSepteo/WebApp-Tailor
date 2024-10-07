const express = require('express');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/corp/recent', (req, res) => {
    productModel.getCorp((err, results) => {
        if (err) {
            console.error('Error retrieving product:', err);
            return res.status(500).send('Error retrieving product');
        }
        res.setHeader('Content-Type', 'application/json');
        console.log(results)
        return res.json(results);

    })
})

router.post('/register', async (req, res) => {
    const prodData = req.body
    const isBulk = Array.isArray(prodData)

    if (isBulk) {
        try {
            prodData.map((product) => {
                const { name, org_id, price, description } = product
                productModel.createProd(name, org_id, price, description, (err, results) => {
                    if (err) {
                        console.error('Error creating product:', err);
                        return res.status(500).send('Error creating product');
                    }
                    if (results.affectedRows) {
                        console.log("A")
                    }
                })
            })
            return res.status(201).send("Products registered successfully")
        }
        catch {
            console.error('Error during product registration:', error);
            return res.status(500).send('Error registering products');
        }

    }
    else {
        const name = prodData.name
        const org_id = prodData.org_id
        const price = prodData.price
        const description = prodData.description
        productModel.createProd(name, org_id, price, description, (err, results) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).send('Error creating product');
            }
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ message: 'Product created successfully', data: results });

        })
    }
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    productModel.deleteProd(id, (err, results) => {
        if (err) {
            console.error("Failed to delete product", err)
            return res.status(500).send("Error deleting product")
        }
        return res.status(200).send("Product deleted successfully")
    })
})

module.exports = router;
