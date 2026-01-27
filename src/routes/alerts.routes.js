const express = require("express");
const router = express.Router();

const {getAlertByParcelController, getAllAlertsController, getAllInfoMeteoByUserController,getInfoMeteoByParcelController, getParcelVegetationByParcelIDController, getParcelCropsByParcelIDController} = require("../controllers/alerts.controller");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware");

//MENSAJES
router.get('/getAllAlertsByUser/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], getAllAlertsController)
router.get('/getAlertByParcel/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director", "asesor"])], getAlertByParcelController)
router.get('/getAllInfoMeteoByUser/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], getAllInfoMeteoByUserController)
router.get('/getInfoMeteoByParcel/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], getInfoMeteoByParcelController)
router.get('/getParcelVegetation/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], getParcelVegetationByParcelIDController);
router.get('/getParcelCrops/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor", "director", "asesor"])], getParcelCropsByParcelIDController);

module.exports = router;
