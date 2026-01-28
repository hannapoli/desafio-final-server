const express = require("express");
const router = express.Router();

const { getAllParcelsController, getParcelByIDController, getAllReportsController, getReportByIDController, getAllConsultantController, asignarAsesorController, getAllProductorController, desasignarAsesorController } = require("../controllers/director.controller");
const { verifyTokenMiddleware } = require("../middlewares/verify.token.middleware");
const { getFullUserDataMiddleware } = require("../middlewares/user.data.middleware");
const { validateRole } = require("../middlewares/roles.middleware");
const { validateUserUid, validateUserEmail } = require("../middlewares/validate.access.middleware");

//DASHBOARD
router.get('/dashboard/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"]), validateUserUid], getAllParcelsController)

router.get('/parcel/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getParcelByIDController)

//REPORTES
router.get('/reports/getAll/:email', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"]), validateUserEmail], getAllReportsController)

router.get('/reports/getByID/:idReport', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getReportByIDController)

router.get('/consultant/getAll', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getAllConsultantController)
router.get('/productor/getAll/:id', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], getAllProductorController)

router.post('/consultant/assign/:emailProductor/:emailConsultant', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], asignarAsesorController)
router.post('/consultant/unassign/:emailProductor/:emailConsultant', [verifyTokenMiddleware, getFullUserDataMiddleware, validateRole(["director"])], desasignarAsesorController)

module.exports = router;