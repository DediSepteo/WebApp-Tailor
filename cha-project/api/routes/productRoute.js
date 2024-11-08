const express = require('express');
const productModel = require('../models/productModel');

const router = express.Router();

router.get('/', (req, res) => {
    const type = req.query.type
    productModel.getAll(type, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error fetching products' });
        }

        return res.status(200).json(results);
    });
});


// // get org shop
// router.get('/:org_id', (req, res) => {
//     const org_id = req.params.org_id;

//     productModel.getOrgProduct(org_id, (error, results) => {
//         if (error) {
//             return res.status(500).json({ error: 'Error fetching products' });
//         }

//         return res.status(200).json(results);
//     });
// });

router.get('/recent', (req, res) => {
    const type = req.query.type
    console.log(type)
    productModel.getRecent(type, (err, results) => {
        if (err) {
            console.error('Error retrieving product:', err);
            return res.status(500).send('Error retrieving product');
        }
        res.setHeader('Content-Type', 'application/json');
        return res.json(results);

    })
})

router.get('/count', (req, res) => {
    const org_id = req.query.org_id
    productModel.getCount(org_id, (err, results) => {
        if (err) {
            console.error('Error getting count:', err);
            return res.status(500).send('Error getting count');
        }
        res.setHeader('Content-Type', 'application/json');
        res.json(results);
    });
});

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
