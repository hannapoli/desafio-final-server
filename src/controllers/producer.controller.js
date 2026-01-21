const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, deleteReportsByIDModel, getAllMessagesModel, getMessageByIDModel, deleteMessagesByIDModel} = require("../models/producer.model")


const getAllParcelsController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getAllParcelsModel(id)
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getParcelByIDController = async (req, res) => {
    const id = req.params.id
    try {
        const data = await getParcelByIDModel(id)
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getAllReportsController = async (req, res) => {
    const email = req.params.email
    try {
        const data = await getAllReportsModel(email)
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getReportByIDController = async (req, res) => {
    const idReport = req.params.idReport
    try {
        const data = await getReportByIDModel(idReport)
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const createReportsController = async (req, res) => {
}

const updateReportsByIDController = async (req, res) => {

}
const deleteReportsByIDController = async (req, res) => {
    const id = req.params.idReport
    try {
        const deletedReport = await deleteReportsByIDModel(id)
        if (deletedReport) {
            return res.status(200).json({
                ok: true,
                msg: "reporte borrado",
                deletedReport
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, reporte no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}



const getAllMessagesController =async (req, res) => {
    const email = req.params.email
    try {
        const data = await getAllMessagesModel(email)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}

const getMessageByIDController =async (req, res) => {
    const email = req.params.idMesage
    try {
        const data = await getMessageByIDModel(email)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: "TODO MAL, CONTACTA CON EL ADMIN"
        })
    }
}


const createMessagesController = async (req, res) => {
}

const deleteMessagesByIDController = async (req, res) => {
    const id = req.params.idMesage
    try {
        const deletedReport = await deleteMessagesByIDModel(id)
        if (deletedReport) {
            return res.status(200).json({
                ok: true,
                msg: "mensaje borrado",
                deletedReport
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, mensaje no encontrado",
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error, contacte con el administrador',
        })
    }
}



module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    createReportsController,
    deleteReportsByIDController,
    getAllReportsController,
    getReportByIDController,
    updateReportsByIDController,
    getAllMessagesController,
    getMessageByIDController,
    createMessagesController,
    deleteMessagesByIDController
}