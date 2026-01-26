const { getAllParcelsModel, getParcelByIDModel } = require("../models/analyst.model")


const getAllParcelsController = async (req, res) => {

    try {
        const data = await getAllParcelsModel()
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


module.exports = {
    getAllParcelsController,
    getParcelByIDController,
}