const express = require("express");
const router = express.Router();

const {getAllMessagesController, getMessageByIDController, createMessagesController, deleteMessagesByIDController, deleteAllMessagesController} = require("../controllers/messages.controller");
const {check} = require("express-validator");
const{validateInputMiddleware}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")



//MENSAJES
router.get('/getAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], getAllMessagesController)

router.get('/getByID/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], getMessageByIDController)

router.post('/create/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"]),
    check("email_receiver")
      .notEmpty().withMessage("El email es obligatorio").isEmail().withMessage("Email de usuario no válido"),
    check("content_message")
      .notEmpty().withMessage("El mensaje es obligatorio"),
    validateInputMiddleware
    ], createMessagesController)

router.delete('/delete/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], deleteMessagesByIDController)

router.delete('/deleteAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], deleteAllMessagesController)


module.exports = router;