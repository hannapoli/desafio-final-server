// IMPORTACIONES DE TERCEROS
const express = require('express');
const router = express.Router();

// IMPORTACIONES PROPIAS
const { uploadFilesCloudinaryController } = require("../controllers/cloudinary.controller");
const upload = require("../configs/multerConfig");
const { deleteFilesCloudinaryController } = require("../controllers/cloudinary.controller");


router.post('/upload', //[], Pendiente poner middlewares de jwt, dataUser y rol
    upload.array("files"), uploadFilesCloudinaryController);

router.delete('/delete', //[], Pendiente poner middlewares de jwt, dataUser y rol
    deleteFilesCloudinaryController)

module.exports = router;