const express = require("express");
const router = express.Router();

const { getAllParcelsController, getParcelByIDController, getAllReportsController, getReportByIDController, getAllProducersController } = require("../controllers/consultant.controller");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const { validateRole } = require("../middlewares/roles.middleware");

//DASHBOARD //El asesor proporciona el email del productor para ver sus tierras
router.get('/dashboard/:email', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor", "director"])], getAllParcelsController)
router.get('/producers/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getAllProducersController)

router.get('/parcel/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getParcelByIDController)

//REPORTES //El asesor proporciona el email del productor para ver sus reportes
router.get('/reports/getAll/:email', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getAllReportsController)

router.get('/reports/getByID/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["asesor"])], getReportByIDController)


module.exports = router;