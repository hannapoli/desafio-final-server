const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, deleteReportsByIDModel, createReportModel, updateReportModel } = require("../models/producer.model");
const { normalizeAttachedArray, uploadFilesToCloudinary, extractPublicIds, deteleFilesCloudinaryHelper, no } = require("../helpers/cloudinary.helpers");

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

        const attachedUrls = await uploadFilesToCloudinary(req.files);

        const newReport = await createReportModel(
            email_creator,
            email_receiver,
            content_message,
            attachedUrls,
            idParcel
        );

        // console.log("<================ Reporte creado: ================>", newReport);
        
        return res.status(201).json({
            ok: true,
            msg: "El reporte está creado.",
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
    const idReport = req.params.idReport;
    const { email_receiver, content_message } = req.body;
    
    try {
        const attachedUrls = await uploadFilesToCloudinary(req.files);
        
        const updatedReport = await updateReportModel(
            email_receiver,
            content_message,
            attachedUrls,
            idReport
        );
        
        if (updatedReport) {
            return res.status(200).json({
                ok: true,
                msg: "Reporte actualizado correctamente",
                data: updatedReport
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: "Reporte no encontrado"
            });
        }
    } catch (error) {
        console.error("Error en updateReportsByIDController:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al actualizar el reporte, contacta con el administrador"
        });
    }
}
const deleteReportsByIDController = async (req, res) => {
    const id = req.params.idReport;
    
    try {
        const report = await getReportByIDModel(id);
        
        if (!report) {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404, reporte no encontrado"
            });
        }

        if (report.attached && report.attached.length > 0) {
            const attachedFlat = normalizeAttachedArray(report.attached);
            const publicIds = extractPublicIds(attachedFlat);
            await deteleFilesCloudinaryHelper(publicIds);
        }

        // Eliminamos el reporte de la base de datos
        const deletedReport = await deleteReportsByIDModel(id);
        
        return res.status(200).json({
            ok: true,
            msg: "Reporte y archivos adjuntos eliminados correctamente",
            deletedReport
        });
        
    } catch (error) {
        console.error("Error en deleteReportsByIDController:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contacte con el administrador"
        });
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