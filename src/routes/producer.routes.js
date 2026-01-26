const express = require("express");
const router = express.Router();

const { getAllParcelsController, getParcelByIDController, createReportsController, deleteReportsByIDController, getAllReportsController, getReportByIDController, updateReportsByIDController, downloadReportPDF } = require("../controllers/producer.controller");
const { check } = require("express-validator");
const { validateInputMiddleware } = require("../middlewares/validate.input.middleware");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const { validateRole } = require("../middlewares/roles.middleware");
const { validateUserUid, validateUserEmail } = require("../middlewares/validate.access.middleware");
const upload = require("../middlewares/upload");

//DASHBOARD
router.get('/dashboard/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"]), validateUserUid], getAllParcelsController)

router.get('/parcel/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getParcelByIDController)

//REPORTES
router.get('/reports/getAll/:email', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"]), validateUserEmail], getAllReportsController)

router.get('/reports/getByID/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getReportByIDController)

router.post('/reports/create/:email/:idParcel', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"]), validateUserEmail, upload.single("attached")], createReportsController)

router.put('/reports/update/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"]), upload.single("attached")], updateReportsByIDController)

router.delete('/reports/delete/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], deleteReportsByIDController)

router.get('/reports/download/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], downloadReportPDF );

module.exports = router;