

const express = require('express');
const router = express.Router();
const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY


// Incomplete as payment account is unactivated
router.post("/checkoutSes", async (req, res) => {
    const cart = req.body.cart
    const org_id = req.body.org_id
    const source = req.headers.source
    const org_data = await fetch(`http://localhost:3000/api/org/${org_id}`)
        .then(response => {
            if (!response.ok) {
                return res.status(404).send("Organization not found")
            }
            return response.json()
        })
        .then(data => {
            return data[0]
        })
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
    const paymongo_body = source == "organization" ? {
        data: {
            "attributes": {
                billing: {
                    address: {
                        country: org_data.country,
                        state: org_data.state,
                        city: org_data.city,
                        line1: org_data.address_line1,
                        line2: org_data.address_line2 || null,
                        postal_code: org_data.postal_code
                    },
                    email: org_data.email
                },
                cancel_url: "http://localhost:3001/shoppingcart",
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
    } :
        {
            data: {
                "attributes": {
                    cancel_url: "http://localhost:3001/shoppingcart",
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
        }
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Basic ${PAYMONGO_SECRET_KEY}`
        },
        body: JSON.stringify(paymongo_body)
    };

    fetch('https://api.paymongo.com/v1/checkout_sessions', options)
        .then(response => response.json())
        .then(data => {
            if (data.errors) {
                console.log(data.errors)
            }
            else if (data?.data?.attributes?.checkout_url) {
                const checkout_id = data.data.id
                // Expire checkout session after 10 minutes
                setTimeout(() => {
                    fetch(`https://api.paymongo.com/v1/checkout_sessions/${checkout_id}/expire`, {
                        method: 'POST',
                        headers: {
                            accept: 'application/json',
                            authorization: `Basic ${PAYMONGO_SECRET_KEY}`
                        }
                    })
                        .then(res => res.json())
                        .then(res => console.log(res))
                        .catch(err => console.error(err));
                }, 600000)
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