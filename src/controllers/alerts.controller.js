
const {getAllAlertByIdModel, getAllAlertsModel, getAllInfoMetoByUserModel, getInfoMeteoByParcelModel, getAlertByParcelModel} = require("../models/alerts.model")


const getAllAlertsController = async (req, res) =>  {
   const {email} = req.params
try {
        const data = await getAllAlertsModel(email)
        console.log("<================ Alertas: ================>", data)
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
const  getAlertByParcelController = async (req,res) => {
    const {uid_parcel} = req.params
    try {
        const data = await getAlertByParcelModel(uid_parcel)
        console.log("<================ Alertas: ================>", data)
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

const getAllInfoMetoByUserController = async (req, res)=> {
 const {email} = req.params
    try {
        const data = await getAllInfoMetoByUserModel(email)
        console.log("<================ Alertas: ================>", data)
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
const getInfoMeteoByParcelController = async (req, res) => {
 const {uid_parcel} = req.params
    try {
        const data = await getInfoMeteoByParcelModel(uid_parcel)
        console.log("<================ Alertas: ================>", data)
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

module.exports ={
   getAlertByParcelController,
    getAllAlertsController,
    getAllInfoMetoByUserController,
    getInfoMeteoByParcelController
}
