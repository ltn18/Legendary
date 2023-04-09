const express = require("express");
const { uploadImage } = require('../controllers/imageController')

const router = express.Router;

router.post("/upload_image", uploadImage);

module.exports = {
    routes: router,
};