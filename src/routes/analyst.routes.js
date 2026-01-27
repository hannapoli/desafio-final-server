const express = require("express");
const router = express.Router();

const { getAllParcelsController, getParcelByIDController } = require("../controllers/analyst.controller");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const { validateRole } = require("../middlewares/roles.middleware");

//DASHBOARD - Analista puede ver todas las parcelas asignadas a él/ella
router.get('/dashboard', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["analista"])], getAllParcelsController)

router.get('/parcel/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["analista"])], getParcelByIDController)

module.exports = router;