const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, deleteReportsByIDModel} = require("../models/producer.model")


const getAllParcelsController = async (req, res) => {
    const userUid = req.user.uid;
    
    try {
        const data = await getAllParcelsModel(userUid);
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        });
    }
}

const getParcelByIDController = async (req, res) => {
    const parcelId = req.params.id;
    const userUid = req.user.uid;
    
    try {
        const data = await getParcelByIDModel(parcelId);
        
        if (!data || data.uid_producer !== userUid) {
            return res.status(403).json({
                ok: false,
                msg: "No tienes permiso para acceder a esta parcela"
            });
        }
        
        console.log("<================ Parcelas: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error del servidor, contacta con el administrador"
        });
    }
}

const getAllReportsController = async (req, res) => {
    const userEmail = req.user.email;
    
    try {
        const data = await getAllReportsModel(userEmail);
        console.log("<================ Reportes: ================>", data)
        return res.status(200).json({
            ok: true,
            msg: "TODO OK",
            data
        });
    } catch (error) {
        console.log(error);
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
            msg: "Error del servidor, contacta con el administrador"
        })
    }
}

const createReportsController = async (req, res) => {
    const email = req.params.email;
    const idParcel = req.params.idParcel;
    const { email_creator, email_receiver, content_message } = req.body;
    
    try {
        // Verificar que el email del creador coincide con el usuario autenticado
        if (email_creator !== email) {
            return res.status(403).json({
                ok: false,
                msg: "No autorizado para crear reportes con este email"
            });
        }

        // El archivo adjunto está en req.file
        const attached = req.file ? req.file.path : null;

        const newReport = await createReportModel(
            email_creator,
            email_receiver,
            content_message,
            attached,
            idParcel
        );

        // console.log("<================ Reporte creado: ================>", newReport);
        
        return res.status(201).json({
            ok: true,
            msg: "Reporte creado.",
            data: newReport
        });
    } catch (error) {
        console.error("Error en createReportsController:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al crear el reporte, contacta con el administrador"
        });
    }
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

module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    createReportsController,
    deleteReportsByIDController,
    getAllReportsController,
    getReportByIDController,
    updateReportsByIDController
}