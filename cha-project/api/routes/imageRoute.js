const express = require('express');
const cloudinary = require('cloudinary')
const crypto = require('crypto-js')
const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env

cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET
})

const router = express.Router();
/* Using Cloudflare
router.post('/upload', async (req, res) => {
    // const { imageUrl, metadata } = req.body
    const { imageUrl } = req.body

    const formData = new URLSearchParams();
    formData.append('url', imageUrl);
    // formData.append('metadata', JSON.stringify(metadata));
    formData.append('requireSignedURLs', 'false');
    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/images/v1`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${ClOUDFLARE_TOKEN}`,
            },
            body: formData
        })
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});
*/

router.post('/upload', async (req, res) => {
    const { image } = req.body

    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp

    const stringToSign = `timestamp=${timestamp}${CLOUDINARY_SECRET}`;

    const signature = crypto.SHA1(stringToSign).toString()


    const formData = new FormData();
    formData.append('timestamp', timestamp)
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default')
    formData.append('public_id', CLOUDINARY_NAME)
    formData.append('api_key', CLOUDINARY_SECRET)
    formData.append('signature', signature)

    // Upload image to Cloudinary or your backend
    fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const imageUrl = data.secure_url; // Get the URL of the uploaded image

            // Now you can send the rest of the form data to your backend, including the image URL
            const productData = {
                prodName,
                prodPrice,
                org_id,
                prodDesc,
                prodImg: imageUrl, // Use the URL of the uploaded image
            };
        });
})

module.exports = router;
