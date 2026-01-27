const express = require("express");
const router = express.Router();

const { getAllParcelsController, getParcelByIDController, createReportsController, deleteReportsByIDController, getAllReportsController, getReportByIDController, updateReportsByIDController, downloadReportPDF, getInfoParcelData } = require("../controllers/producer.controller");
const { check } = require("express-validator");
const { validateInputMiddleware } = require("../middlewares/validate.input.middleware");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const { validateRole } = require("../middlewares/roles.middleware");
const { validateUserUid, validateUserEmail } = require("../middlewares/validate.access.middleware");
const upload = require("../middlewares/upload");

//DASHBOARD
router.get('/dashboard/:id', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"]),
    validateUserUid
], getAllParcelsController)

router.get('/parcel/:id', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"])
], getParcelByIDController)

//REPORTES
router.get('/reports/getAll/:email', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"]),
    validateUserEmail
], getAllReportsController)

router.get('/reports/getByID/:idReport', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"])
], getReportByIDController)

router.post('/reports/create/:email/:idParcel', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"]),
    validateUserEmail,
    upload.array("attached", 10),
    check('email_receiver')
        .isEmail().withMessage("Escriba un email válido").bail()
        .normalizeEmail(),
    check('content_message')
        .notEmpty().withMessage("El mensaje no puede estar vacío").bail()
        .isString().withMessage("Escriba un mensaje válido")
        .isLength({ min: 5, max: 500 }).withMessage("El mensaje debe tener entre 5 y 500 caracteres"),
    validateInputMiddleware
], createReportsController);

router.put('/reports/update/:idReport', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"]),
    upload.array("attached", 10),
    check('email_receiver')
        .isEmail().withMessage("Escriba un email válido").bail()
        .normalizeEmail(),
    check('content_message')
        .notEmpty().withMessage("El mensaje no puede estar vacío").bail()
        .isString().withMessage("Escriba un mensaje válido")
        .isLength({ min: 5, max: 500 }).withMessage("El mensaje debe tener entre 5 y 500 caracteres"),
    validateInputMiddleware
], updateReportsByIDController);

router.delete('/reports/delete/:idReport', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    validateRole(["productor"])
], deleteReportsByIDController)

router.get('/reports/download/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], downloadReportPDF );

// INFORMACIÓN CULTIVOS
router.get('/parcel/data/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getInfoParcelData );

module.exports = router;