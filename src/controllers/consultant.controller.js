const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, getAllProducersModel} = require("../models/consultant.model")


const getAllParcelsController = async (req, res) => {
    const producerEmail = req.params.email;
    
    try {
        // Asesor ve las parcelas de un productor específico
        const data = await getAllParcelsModel(producerEmail);
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
    const producerEmail = req.params.email;
    
    try {
        // Asesor ve los reportes de un productor específico
        const data = await getAllReportsModel(producerEmail);
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
    const idReport = req.params.idReport
    try {
        const data = await getReportByIDModel(idReport)
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

const getAllProducersController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getAllProducersModel(id)
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
    getReportByIDController,
    getAllProducersController
}