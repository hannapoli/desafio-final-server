const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel} = require("../models/consultant.model")


const getAllParcelsController = async (req, res) => {
    const email = req.params.email
    try {
        const data = await getAllParcelsModel(email)
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


module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    getAllReportsController,
    getReportByIDController
}