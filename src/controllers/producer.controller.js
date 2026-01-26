const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, deleteReportsByIDModel, createReportModel, updateReportModel } = require("../models/producer.model");
const { normalizeAttachedArray, uploadFilesToCloudinary, extractPublicIds, deteleFilesCloudinaryHelper } = require("../helpers/cloudinary.helpers");

const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
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


const downloadReportPDF = async (req, res) => {
    const idReport = req.params.idReport;
    try {
        const report = await getReportByIDModel(idReport);
        if (!report) return res.status(404).json({ ok: false, msg: "Reporte no encontrado" });

        const doc = new PDFDocument({ margin: 50 });
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=reporte_${report.uid_report}.pdf`
        );
        doc.pipe(res);

        doc.fontSize(18).text(`Reportes de la parcela #${report.uid_parcel}`, { align: "center" });
        doc.moveDown();

        doc.fontSize(14).font('Helvetica-Bold').text('ID del reporte: ', { continued: true });
        doc.fontSize(14).font('Helvetica').text(report.uid_report);
        doc.fontSize(14).font('Helvetica-Bold').text('Creador del reporte: ', { continued: true });
        doc.fontSize(14).font('Helvetica').text(report.email_creator);
        doc.fontSize(14).font('Helvetica-Bold').text('Destinatario: ', { continued: true });
        doc.fontSize(14).font('Helvetica').text(report.email_receiver.join(', '));
        doc.fontSize(14).font('Helvetica-Bold').text('Informe: ', { continued: true });
        doc.fontSize(14).font('Helvetica').text(report.content_message);
        doc.fontSize(14).font('Helvetica-Bold').text('Fecha: ', { continued: true });
        doc.fontSize(14).font('Helvetica').text(new Date(report.created_at).toLocaleString());

        doc.moveDown(1);

        if (report.attached && report.attached.length > 0) {
            for (const [index, imageUrl] of report.attached.entries()) {
                try {
                    // Descargar la imagen de Cloudinary
                    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
                    const imageBuffer = Buffer.from(response.data, "binary");

                    // Guardar en disco temporal
                    const tempFilePath = path.join(__dirname, `temp_${Date.now()}_${index}.jpg`);
                    fs.writeFileSync(tempFilePath, imageBuffer);

                    // Insertar en PDF
                    const maxImageHeight = 250;
                    const pageBottom = doc.page.height - doc.page.margins.bottom;
                    const remainingSpace = pageBottom - doc.y;
                    if (remainingSpace < maxImageHeight) doc.addPage();
                    doc.image(tempFilePath, { width: 250 });
                    doc.moveDown(1);

                    // Borrar la imagen temporal
                    fs.unlinkSync(tempFilePath);
                } catch (err) {
                    console.error("Error al procesar imagen:", err);
                }
            }
        }
        doc.end();
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Error al generar el PDF" });
    }
};


module.exports = {
    getAllParcelsController,
    getParcelByIDController,
    createReportsController,
    deleteReportsByIDController,
    getAllReportsController,
    getReportByIDController,
    updateReportsByIDController,
    downloadReportPDF
}