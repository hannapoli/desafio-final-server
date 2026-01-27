const express = require("express");
const router = express.Router();

const { param, check } = require("express-validator");
const { validateInputMiddleware } = require("../middlewares/validate.input.middleware");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const {checkAdmin} = require("../middlewares/roles.middleware");
const { getAllUsersController, getUserByEmailController, editUserByUidController, deleteUserByUidController } = require("../controllers/admin.controller");

// Devuelve la lista completa de usuarios registrados
router.get('/users/getall', [
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    checkAdmin
], getAllUsersController);

// Devuelve la información de un usuario encontrado por su ID:
router.get('/users/get/:email', [
    param('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email no es válido'),
    validateInputMiddleware,
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    checkAdmin
], getUserByEmailController);

// Modificar la información de un usuario encontrado por su ID:
router.put('/users/edit/:id', [
    //la validación del email y la contraseña se hace en Firebase
    param('id')
        .notEmpty().withMessage('El UID es obligatorio')
        .isLength({ min: 20 }).withMessage('El UID debe tener por lo menos 20 caracteres')
        .matches(/^[A-Za-z0-9\-_]+$/).withMessage('El UID solo puede contener letras, números, guiones y guiones bajos'),
    validateInputMiddleware,
    check('name')
        .notEmpty().withMessage("Escriba el nombre").bail()
        .trim()
        .isString().withMessage("Escriba un nómbre válido")
        .isLength({ min: 3, max: 50 }).withMessage("Escriba un nómbre válido"),
    check("role")
        .notEmpty().withMessage("Escriba el rol").bail()
        .trim()
        .isIn(["admin", "productor", "asesor", "analista", "director", "distribuidor"]).withMessage("El rol debe ser 'admin', 'productor', 'asesor', 'analista', 'director' o 'distribuidor'."),
    validateInputMiddleware,
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    checkAdmin
], editUserByUidController);

// Eliminar el usuario encontrado por su ID:
router.delete('/users/delete/:id', [
    param('id')
        .notEmpty().withMessage('El UID es obligatorio')
        .isLength({ min: 20 }).withMessage('El UID debe tener por lo menos 20 caracteres')
        .matches(/^[A-Za-z0-9\-_]+$/).withMessage('El UID solo puede contener letras, números, guiones y guiones bajos'),
    validateInputMiddleware,
    verifyTokenMiddleware,
    getFullUserDataMiddleware,
    checkAdmin
], deleteUserByUidController);

module.exports = router;