const express = require("express");
const router = express.Router();

const {getAllParcelsController, getParcelByIDController, getAllReportsController, getReportByIDController} = require("../controllers/director.controller");
const {check} = require("express-validator");
const{validateInputMiddleware}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")

//DASHBOARD
router.get('/dashboard/:id',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getAllParcelsController)

router.get('/parcel/:id',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getParcelByIDController)

//REPORTES
router.get('/reports/getAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getAllReportsController)

router.get('/reports/getByID/:idReport',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getReportByIDController)


module.exports = router;