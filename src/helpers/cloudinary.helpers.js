// IMPORTACIONES DE TERCEROS
const cloudinary = require("../configs/cloudinaryConnect");

// HELPERS
const uploadOneFileCloudinaryHelper = (buffer, originalname) => { // Buffer (es necesario al no usar memoryStorage y originalname con multer
    
    return new Promise((resolve, reject) => {
    //Filtrar por extensión para guardar en la carpeta correcta
    const nameFile = originalname.toLowerCase();

    //Detectar si es imagen o vídeo según la extensión
    const isImage = nameFile.endsWith('.jpg') || nameFile.endsWith('.jpeg') || nameFile.endsWith('.png') || nameFile.endsWith('.webp');
    const isVideo = nameFile.endsWith('.mp4') || nameFile.endsWith('.mov') || nameFile.endsWith('.avi') || nameFile.endsWith('.webm');

    //Elegir carpeta correcta en función de la extensión
    const folder = isVideo ? 'agrosync_video_360' : isImage ? 'agrosync_image_360' : 'agrosync_raw';

    //Crear stream de subida a Cloduinary
    const stream = cloudinary.uploader.upload_stream({
        folder,
        resource_type: "auto" //Porque ya hemos filtrado por extensión antes
    },
    (error, result) => {
        if (error) return reject(error);
        return resolve({
            url: result.secure_url, // URL para guardar en la bbdd
            public_id: result.public_id // Public id para luego manejar (eliminar)
        }); 
    });
    
    //Enviar buffer
    stream.end(buffer);

})};

const uploadFilesCloudinaryHelper = async (files) => {

    let urlFiles = [];
    // Filtrar por extensión para guardar en la carpeta correcta
    for(const file of files) {
        const nameFile = file.originalname.toLowerCase();
    
        //Detectar si es imagen o vídeo según la extensión
        const isImage = nameFile.endsWith('.jpg') || nameFile.endsWith('.jpeg') || nameFile.endsWith('.png') || nameFile.endsWith('.webp');
        const isVideo = nameFile.endsWith('.mp4') || nameFile.endsWith('.mov') || nameFile.endsWith('.avi') || nameFile.endsWith('.webm');

        //Elegir carpeta correcta en función de la extensión
        const folder = isVideo ? 'agrosync_video_360' : isImage ? 'agrosync_image_360' : 'agrosync_raw';

        //Crear stream de subida a Cloduinary
        const url = await new Promise((resolve, reject) => { 
            const stream = cloudinary.uploader.upload_stream({
                folder, 
                resource_type: 'auto' 
            }, 
            (error, result) => { 
                if (error) return reject(error); 
                return resolve({
                    url: result.secure_url, // URL para guardar en la bbdd
                    public_id: result.public_id // Public id para luego manejar (eliminar)
                }) 
            }); 

            //Enviar buffer
            stream.end(file.buffer); 
        }); 
        
        urlFiles.push(url); 
    } 

    return urlFiles

};

const deleteOneFileCloudinaryHelper = async (publicId) => {

    return new Promise ((resolve, reject) => {
        cloudinary.uploader.destroy(publicId,
            (error, result) => {
                if(error) return reject(error);

                return resolve({ 
                    ok: true, 
                    msg: "Archivo eliminado correctamente", 
                    data: publicId
                });
            }
        )
    })
}

const deteleFilesCloudinaryHelper = async (publicIds) => {

    let results = [];

    for (const id of publicIds) {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(id,
                (error, result) => {
                   if (error) return reject(error); 

                   return resolve({
                    ok: true,
                    msg: "Archivos eliminados correctamente",
                    data: id
                   }); 
                }
            )
        })

        results.push(result)
    }

    return results;

}

// EXPORTACIONES
module.exports = {
    uploadOneFileCloudinaryHelper,
    uploadFilesCloudinaryHelper,
    deleteOneFileCloudinaryHelper,
    deteleFilesCloudinaryHelper
}