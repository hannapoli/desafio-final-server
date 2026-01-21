const { getAllParcelsModel, getParcelByIDModel} = require("../models/analyst.model")


const getAllParcelsController = async (req, res) => {
    try {
        const data = await getAllParcelsModel()
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


module.exports = {
    getAllParcelsController,
    getParcelByIDController,
}