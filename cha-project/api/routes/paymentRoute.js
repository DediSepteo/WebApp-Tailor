

const express = require('express');
const router = express.Router();
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY

router.post("/checkoutSes", async (req, res) => {
    const cart = req.body.cart
    const line_items = cart.map(item => ({
        amount: parseInt(item.price * 100),
        currency: "PHP",
        description: item.description,
        images: [
            item.image ? item.image : "https://placehold.co/430x640"
        ],
        name: item.name,
        quantity: item.qty
    }));
    console.log(line_items)
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Basic ${PAYMONGO_SECRET_KEY}`
        },
        body: JSON.stringify({
            data: {
                "attributes": {
                    send_email_receipt: true,
                    show_description: true,
                    show_line_items: true,
                    line_items: line_items,
                    // Payment method types must be allowed from paymongo account, currently using unactivated account. 
                    payment_method_types: [
                        "card",
                        "gcash",
                        "atome"
                    ],
                    description: "Testing"
                }
            }
        })
    };

    fetch('https://api.paymongo.com/v1/checkout_sessions', options)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json()
        })
        .then(data => {
            if (data?.data?.attributes?.checkout_url) {
                res.json({ checkoutUrl: data.data.attributes.checkout_url });
            } else {
                res.status(500).json({ error: 'Checkout URL not found in response' });
            }
        })
        .catch(err => {
            console.error('Error fetching checkout session:', err);
            res.status(500).json({ error: 'An error occurred while processing the request' })
        });
})

module.exports = router;