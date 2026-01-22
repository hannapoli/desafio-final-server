const express = require("express");
const router = express.Router();

const {getAllMessagesController, getMessageByIDController, createMessagesController, deleteMessagesByIDController, deleteAllMessagesController, getChatsController} = require("../controllers/messages.controller");
const {check} = require("express-validator");
const{validateInputMiddleware}= require("../middlewares/validate.input.middleware");
const{verifyTokenMiddleware}= require("../middlewares/verify.token.middleware");
const{getFullUserDataMiddleware}= require("../middlewares/user.data.middleware");
const {validateRole} = require("../middlewares/roles.middleware")



//MENSAJES
router.get('/getChats/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], getChatsController)
router.get('/getAll/:email_creator/:email_receiver',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], getAllMessagesController)

router.get('/getByID/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], getMessageByIDController)

router.post('/create/:email_creator/:email_receiver',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"]),
    check("content_message")
      .notEmpty().withMessage("El mensaje es obligatorio"),
    validateInputMiddleware
    ], createMessagesController)

router.delete('/delete/:idMesage',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], deleteMessagesByIDController)

router.delete('/deleteAll/:email',[verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["productor","director","analista","asesor","distribuidor"])], deleteAllMessagesController)


module.exports = router;