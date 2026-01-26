const { getAllParcelsModel, getParcelByIDModel, getAllReportsModel, getReportByIDModel, deleteReportsByIDModel, createReportModel, updateReportModel, existsParcelModel, createParcelModel, deleteParcelModel } = require("../models/producer.model");
const { uploadOneFileCloudinaryHelper } = require("../helpers/cloudinary.helpers");


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

        let attached = null;
        if (req.file) {
            const uploadResult = await uploadOneFileCloudinaryHelper(
                req.file.buffer,
                req.file.originalname
            );
            // Cloudinary URL
            attached = uploadResult.url;
        }

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
        let attached = null;
        if (req.file) {
            const uploadResult = await uploadOneFileCloudinaryHelper(
                req.file.buffer,
                req.file.originalname
            );
            attached = uploadResult.url;
        }
        
        const updatedReport = await updateReportModel(
            email_receiver,
            content_message,
            attached,
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


// const createParcelController = async (req, res) =>  {
//     const {body} = req
//     const {uid_parcel} = body
//     try {
//         const existe = await existsParcelModel(uid_parcel);
//         // console.log(existe, "existe desde producer controllers")
//         if(existe){
//             return res.status(401).json({
//                 ok:false,
//                 msg: "Ya hay una parcela con ese uid"
//             })
//         }

//         let attached = null;
//         if (req.file) {
//             const uploadResult = await uploadOneFileCloudinaryHelper(
//                 req.file.buffer,
//                 req.file.originalname
//             );
//             // Cloudinary URL
//             attached = uploadResult.url;
//         }

//         req.body.photo_url = attached

//         const data = await createParcelModel(body)
//         console.log("Se ha añadido esta parcela:", data);
//         return res.status(201).json({
//             ok: true,
//             msg: "Parcela añadida correctamente",
//             data
//         })
        
//     } catch (error) {
//         console.log(error)
//     }
// }

const createParcelController = async (req, res) => {
  try {
    const { uid_parcel } = req.body;

    if (!uid_parcel) {
      return res.status(400).json({
        ok: false,
        msg: 'uid_parcel es obligatorio',
      });
    }

    const existe = await existsParcelModel(uid_parcel);

    if (existe) {
      return res.status(409).json({
        ok: false,
        msg: 'Ya hay una parcela con ese uid',
      });
    }

    let attached = null;
    if (req.file) {
      const uploadResult = await uploadOneFileCloudinaryHelper(
        req.file.buffer,
        req.file.originalname
      );
      attached = uploadResult.url;
    }

    req.body.photo_url = attached;

    const data = await createParcelModel(req.body);

    console.log('Se ha añadido esta parcela:', data);

    return res.status(201).json({
      ok: true,
      msg: 'Parcela añadida correctamente',
      data,
    });

  } catch (error) {
    console.error('createParcelController error:', error);
    return res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor',
    });
  }
};


const deleteParcelController = async () => {
//   console.log('hola desde eliminar parcela controller')
    const uid = parseInt(req.params.idParcel)
    // console.log(uid)
    try {
        const deletedParcel = await deleteParcelModel(uid)
        // console.log({deletedParcel})
        if (deletedParcel) {
            return res.status(200).json({
                ok: true,
                msg: "Se ha borrado la parcela",
                deletedParcel
            })
        } else {
            return res.status(404).json({
                ok: false,
                msg: "ERROR 404 al borrar parcela",
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
    createParcelController,
    deleteParcelController
}