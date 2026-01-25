const express = require("express");
const router = express.Router();

const {getAlertByParcelController, getAllAlertsController, getAllInfoMetoByUserController,getInfoMeteoByParcelController} = require("../controllers/alerts.controller");
const {check} = require("express-validator");
const{validateInputMiddleware}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")



//MENSAJES
router.get('/getAllAlertsByUser/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director"])], getAllAlertsController)
router.get('/getAlertByParcel/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director"])], getAlertByParcelController)
router.get('/getAllInfoMeteoByUser/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director"])], getAllInfoMetoByUserController)
router.get('/getInfoMeteoByParcel/:uid_parcel',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director"])], getInfoMeteoByParcelController)





module.exports = router;