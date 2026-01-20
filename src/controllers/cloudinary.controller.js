// IMPORTACIONES INTERNAS
const { uploadOneFileCloudinaryHelper, uploadFilesCloudinaryHelper } = require("../helpers/cloudinary.helpers");

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


            return res.json({ url });
        };

        // Cuando hay varios archivos para subir
        const urls = await uploadFilesCloudinaryHelper(req.files);

        return res.json({ urls });

    } catch(error) {
        
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: "Error, contacte con el administrador"
        });

    };

};

// EXPORTACIONES
module.exports = { uploadFilesCloudinaryController }