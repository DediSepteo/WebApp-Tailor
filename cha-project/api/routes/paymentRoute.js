

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
                    send_email_receipt: false,
                    show_description: true,
                    show_line_items: true,
                    line_items: line_items,
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
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
})

module.exports = router;