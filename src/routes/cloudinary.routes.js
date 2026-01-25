// IMPORTACIONES DE TERCEROS
const express = require('express');
const router = express.Router();

// IMPORTACIONES PROPIAS
const { uploadFilesCloudinaryController } = require("../controllers/cloudinary.controller");
const upload = require("../configs/multerConfig");
const { deleteFilesCloudinaryController } = require("../controllers/cloudinary.controller");
const { verifyTokenMiddleware } = require('../middlewares/verify.token.middleware');
const { getFullUserDataMiddleware } = require('../middlewares/user.data.middleware');


router.post('/upload', [verifyTokenMiddleware, getFullUserDataMiddleware, upload.array("files")], uploadFilesCloudinaryController);

router.delete('/delete', [verifyTokenMiddleware, getFullUserDataMiddleware], deleteFilesCloudinaryController)

module.exports = router;