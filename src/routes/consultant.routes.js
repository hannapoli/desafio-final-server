const express = require("express");
const router = express.Router();

const {getAllParcelsController, getParcelByIDController, getAllReportsController, getReportByIDController} = require("../controllers/consultant.controller");
const {check} = require("express-validator");
const{validateInputMiddleware}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")

//DASHBOARD //La idea es que el asesor meta el mail del productor para ver sus tierras
router.get('/dashboard/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getAllParcelsController)

router.get('/parcel/:id',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getParcelByIDController)

//REPORTES //La idea es que el asesor meta el mail del productor para ver sus reportes también
router.get('/reports/getAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getAllReportsController)

router.get('/reports/getByID/:idReport',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getReportByIDController)


module.exports = router;