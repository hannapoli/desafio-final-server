const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel} = require("../models/director.model")


const getAllParcelsController = async (req, res) => {
    const userUid = req.user.uid;
    
    try {
        const data = await getAllParcelsModel(userUid);
        // console.log("<================ Parcelas (todas): ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        })
    }
}

const getParcelByIDController = async (req, res) => {
    const parcelId = req.params.id;
    try {
        const data = await getParcelByIDModel(parcelId);
        // console.log("<================ Parcela por ID: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        })
    }
}

const getAllReportsController = async (req, res) => {
    const userEmail = req.user.email;
    
    try {
        const data = await getAllReportsModel(userEmail);
        // console.log("<================ Reportes (todos): ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        })
    }
}

const getReportByIDController = async (req, res) => {
    const idReport = req.params.idReport;
    const userEmail = req.user.email;
    try {
        const data = await getReportByIDModel(idReport);
        if (!data || !Array.isArray(data.email_receiver) || !data.email_receiver.includes(userEmail)) {
            return res.status(403).json({
                ok: false,
                msg: "No tienes permiso para acceder a este reporte"
            });
        }
        // console.log("<================ Reporte por ID: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        })
    }
}


module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    getAllReportsController,
    getReportByIDController
}