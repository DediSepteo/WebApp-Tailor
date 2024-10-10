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
        return res.json(results);

    })
})

router.post('/register', async (req, res) => {
    const productData = req.body
    const isBulk = Array.isArray(productData)

    if (isBulk) {
        try {
            productData.map((product) => {
                const { name, org_id, price, description } = product
                productModel.createProduct(name, org_id, price, description, (err, results) => {
                    if (err) {
                        console.error('Error creating product:', err);
                        return res.status(500).send('Error creating product');
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
        const name = productData.name
        const org_id = productData.org_id
        const price = productData.price
        const description = productData.description
        productModel.createProduct(name, org_id, price, description, (err, results) => {
            if (err) {
                console.error('Error creating product:', err);
                return res.status(500).send('Error creating product');
            }
            res.setHeader('Content-Type', 'application/json');
            return res.status(201).json({ message: 'Product created successfully', data: results });

        })
    } ``
})

router.put("/:id", (req, res) => {
    const id = Number(req.params.id)
    const data = req.body
    const { name, desc, price } = data
    productModel.updateProduct(id, name, desc, price, (err, results) => {
        if (err) {
            console.error("Failed to update product", err)
            return res.status(500).send("Error updating product")
        }
        return res.status(204).send("Product updated successfully")
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    productModel.deleteProduct(id, (err, results) => {
        if (err) {
            console.error("Failed to delete product", err)
            return res.status(500).send("Error deleting product")
        }
        return res.status(200).send("Product deleted successfully")
    })
})

module.exports = router;
