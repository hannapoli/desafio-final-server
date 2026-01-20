const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel} = require("../models/producer.model")


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

}






module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    createReportsController,
    deleteReportsByIDController,
    getAllReportsController,
    getReportByIDController,
    updateReportsByIDController
}