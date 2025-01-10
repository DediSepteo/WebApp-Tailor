const express = require('express');
const fs = require("fs");
const path = require("path");
require('dotenv').config();

const multer = require('multer');
const upload = multer()

const {
    PutObjectCommand,
    S3Client,
    S3ServiceException,
    GetObjectCommand,
    HeadObjectCommand
} = require("@aws-sdk/client-s3")

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const imagePath = req.query.imagePath
        console.log(imagePath)
        const s3Client = new S3Client({
            region: 'ap-southeast-2', // Replace with your region
            credentials: {
                accessKeyId: process.env.AWS_ADMIN_KEY_ID,
                secretAccessKey: process.env.AWS_ADMIN_SECRET_KEY,
            },
        });

        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: imagePath,
        });

        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return res.status(200).json({ url: url })
    }
    catch (error) {
        console.error('Error fetching image from S3:', error);
    }
})

router.post('/upload', upload.array('image', 10), async (req, res) => {
    const images = req.files
    var { name, org_id } = req.body
    console.log(name)
    console.log(images)
    if (!Array.isArray(name)) {
        name = [name];
    }
    if (!Array.isArray(org_id)) {
        org_id = [org_id];
    }
    console.log(name.length, images.length)
    if (name.length !== images.length) {
        return res.status(400).json({ message: 'Number of names or org_ids does not match number of uploaded images' });
    }

    const client = new S3Client({
        region: "ap-southeast-2",
        credentials: { accessKeyId: process.env.AWS_ADMIN_KEY_ID, secretAccessKey: process.env.AWS_ADMIN_SECRET_KEY }
    });

    const filesToUpload = images.length ? images : [req.file];

    try {
        const uploadPromises = filesToUpload.map((image, index) => {

            const imagePath = `images/${org_id}/${name[index]}`

            const command = new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: imagePath,
                Body: image.buffer,
                ContentType: 'image/png'
            });
            return client.send(command);
        })
        await Promise.all(uploadPromises);
        return res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (caught) {
        console.log(caught)
        if (
            caught instanceof S3ServiceException &&
            caught.name === "EntityTooLarge"
        ) {
            console.error(
                `Error from S3 while uploading object to ${process.env.BUCKET_NAME}. \
    The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
    or the multipart upload API (5TB max).`,
            );
        } else if (caught instanceof S3ServiceException) {
            console.error(
                `Error from S3 while uploading object to ${process.env.BUCKET_NAME}.  ${caught.name}: ${caught.message}`,
            );
        } else {
            throw caught;
        }
        return res.status(400).json({ message: 'Failed to upload image' });
    }
})


// router.post('/upload', upload.single('image'), async (req, res) => {
//     const image = req.file
//     const { name, org_id } = req.body
//     const imagePath = `images/${org_id}/${name}`
//     console.log(imagePath)
//     const client = new S3Client({ region: "ap-southeast-2", credentials: { accessKeyId: process.env.AWS_ADMIN_KEY_ID, secretAccessKey: process.env.AWS_ADMIN_SECRET_KEY } });
//     const command = new PutObjectCommand({
//         Bucket: process.env.BUCKET_NAME,
//         Key: imagePath,
//         Body: image.buffer,
//         ContentType: 'image/png'
//     });

//     try {
//         await client.send(command);
//         return res.status(200).json({ message: 'Image uploaded successfully' });
//     } catch (caught) {
//         console.log(caught)
//         if (
//             caught instanceof S3ServiceException &&
//             caught.name === "EntityTooLarge"
//         ) {
//             console.error(
//                 `Error from S3 while uploading object to ${process.env.BUCKET_NAME}. \
//     The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
//     or the multipart upload API (5TB max).`,
//             );
//         } else if (caught instanceof S3ServiceException) {
//             console.error(
//                 `Error from S3 while uploading object to ${process.env.BUCKET_NAME}.  ${caught.name}: ${caught.message}`,
//             );
//         } else {
//             throw caught;
//         }
//         return res.status(400).json({ message: 'Failed to upload image' });
//     }
// })
module.exports = router;
