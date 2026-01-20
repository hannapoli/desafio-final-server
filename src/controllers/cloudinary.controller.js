// IMPORTACIONES INTERNAS
const { 
    uploadOneFileCloudinaryHelper, 
    uploadFilesCloudinaryHelper,     
    deleteOneFileCloudinaryHelper,
    deteleFilesCloudinaryHelper 
} = require("../helpers/cloudinary.helpers");

// CONTROLADORES
const uploadFilesCloudinaryController = async (req, res) => {

    try {
        // Comprobar que hay archivos
        if(!req.files || req.files.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: "No se han encontrado archivos para subir"
            });
        };

        // Cuando solo hay un archivo
        if(req.files.length === 1) {
            const file = req.files[0];

            const url = await uploadOneFileCloudinaryHelper(file.buffer, file.originalname);

            return res.status(200).json({
                ok: true,
                msg: "Archivo subido de forma correcta",
                data: url
            });

        };

        // Cuando hay varios archivos para subir
        const urls = await uploadFilesCloudinaryHelper(req.files);

        return res.status(200).json({
            ok: true,
            msg: "Archivos subidos de forma correcta",
            data: urls
        });

    } catch(error) {
        
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contacte con el administrador"
        });

    };

};

const deleteFilesCloudinaryController = async (req, res) => {

    const { publicIds } = req.body;

    try {

        if(!publicIds || publicIds.length === 0) {
            return res.status(400).json({
                ok: false,
                msg: "No se han encontrado archivos para eliminar"
            })
        };

        // Cuando solo hay un archivo
        if(publicIds.length === 1) {
            const result = await deleteOneFileCloudinaryHelper(publicIds[0]);
            return res.status(200).json({
                ok: true,
                msg: "Archivo eliminado de forma correcta",
                data: result // Info desde Cloudinary
            });
        };

        const results = await deteleFilesCloudinaryHelper (publicIds);

        return res.status(200).json({
            ok: true,
            msg: "Archivos eliminados de forma correcta",
            data: results // Info desde Cloudinary
        });

    } catch(error) {

        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contacte con el administrador"
        })
    }
}

// EXPORTACIONES
module.exports = { 
    uploadFilesCloudinaryController,
    deleteFilesCloudinaryController
}