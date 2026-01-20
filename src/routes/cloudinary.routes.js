// IMPORTACIONES DE TERCEROS
const express = require('express');
const router = express.Router();

// IMPORTACIONES PROPIAS
const { uploadFilesCloudinaryController } = require("../controllers/cloudinary.controller");
const upload = require("../configs/multerConfig")


router.post('/upload', //[], Pendiente poner middlewares de jwt, dataUser y rol
    upload.array("files"), uploadFilesCloudinaryController);

module.exports = router;