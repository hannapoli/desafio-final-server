const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const {validateInputMiddleware} = require('../middlewares/validate.input.middleware');
const { registerUserController, getRoleController } = require('../controllers/auth.controller');
const {verifyTokenMiddleware} = require('../middlewares/verify.token.middleware');
const {getFullUserDataMiddleware} = require('../middlewares/user.data.middleware');

router.post('/register', [
    //la validación del email y la contraseña se hace en Firebase
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    validateInputMiddleware
], registerUserController);

router.get('/me', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware
], getRoleController);

module.exports = router;