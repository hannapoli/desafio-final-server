const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, getAllConsultantModel, getUserByEmailModel, asignarAsesorModel, getAllProductorModel} = require("../models/director.model")


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

const getAllConsultantController = async (req, res) => {
    try {
        const data = await getAllConsultantModel();
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

const getAllProductorController = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await getAllProductorModel(id);
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

const asignarAsesorController = async (req, res) => {
    const emailProductor = req.params.emailProductor;
    const emailConsultant = req.params.emailConsultant;
    try {
        
        const exist = await getUserByEmailModel(emailProductor)
        if (!exist || exist.uid_rol != "9717e4fb-c034-46e9-9350-9375f797a384"){
            return res.status(403).json({
                ok: false,
                msg: "El usuario no existe o no es productor"
            });
        }

        const exist2 = await getUserByEmailModel(emailConsultant)
        if (!exist2 || exist2.uid_rol != "f4409e7e-ec44-4f3b-86a6-a3692a81a7e1"){
            return res.status(403).json({
                ok: false,
                msg: "El usuario no existe o no es asesor"
            });
        }
        
        const data = await asignarAsesorModel(emailProductor, emailConsultant);
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

const desasignarAsesorController = async (req, res) => {
    const emailProductor = req.params.emailProductor;
    const emailConsultant = req.params.emailConsultant;
    try {
        
        const exist = await getUserByEmailModel(emailProductor)
        if (!exist || exist.uid_rol != "9717e4fb-c034-46e9-9350-9375f797a384"){
            return res.status(403).json({
                ok: false,
                msg: "El usuario no existe o no es productor"
            });
        }

        const exist2 = await getUserByEmailModel(emailConsultant)
        if (!exist2 || exist2.uid_rol != "f4409e7e-ec44-4f3b-86a6-a3692a81a7e1"){
            return res.status(403).json({
                ok: false,
                msg: "El usuario no existe o no es asesor"
            });
        }
        
        const data = await asignarAsesorModel(emailProductor, emailConsultant);
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
    getAllConsultantController,
    asignarAsesorController,
    getAllProductorController,
    desasignarAsesorController
}