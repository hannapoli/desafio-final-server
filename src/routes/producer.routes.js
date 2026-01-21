const express = require("express");
const router = express.Router();

const {getAllParcelsController, getParcelByIDController, createReportsController, deleteReportsByIDController, getAllReportsController, getReportByIDController, updateReportsByIDController, getAllMessagesController, getMessageByIDController, createMessagesController, deleteMessagesByIDController} = require("../controllers/producer.controller");
const {check} = require("express-validator");
const{validateInputs}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")

//DASHBOARD
router.get('/dashboard/:id',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getAllParcelsController)

router.get('/parcel/:id',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getParcelByIDController)

//REPORTES
router.get('/reports/getAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getAllReportsController)

router.get('/reports/getByID/:idReport',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getReportByIDController)

router.post('/reports/create/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], createReportsController )

router.put('/reports/update/:idProductor',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], updateReportsByIDController)

router.delete('/reports/delete/:idReport',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], deleteReportsByIDController)


//MENSAJES
router.get('/messages/getAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getAllMessagesController)

router.get('/messages/getByID/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], getMessageByIDController)

router.post('/messages/create/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], createMessagesController )

router.delete('/messages/delete/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor"])], deleteMessagesByIDController)


module.exports = router;