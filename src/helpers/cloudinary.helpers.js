// IMPORTACIONES DE TERCEROS
const cloudinary = require("../configs/cloudinaryConnect");

// HELPERS

//Pasa los archivos al formato de un array plano de URLs
const normalizeAttachedArray = (attached) => {
    if (!attached || attached.length === 0) return [];
    return Array.isArray(attached[0]) ? attached.flat() : attached;
};

//Extraer IDs públicos de Cloudinary para eliminar los archivos
const extractPublicIds = (fileUrls) => {
    return fileUrls.map(fileUrl => {
        const urlParts = fileUrl.split('/');
        const fileWithExtension = urlParts[urlParts.length - 1];
        const folder = urlParts[urlParts.length - 2];
        const fileName = fileWithExtension.split('.')[0];
        return `${folder}/${fileName}`;
    });
};

const uploadOneFileCloudinaryHelper = (buffer, originalname) => { // Buffer (es necesario al no usar memoryStorage y originalname con multer
    
    return new Promise((resolve, reject) => {
    //Filtrar por extensión para guardar en la carpeta correcta
    const nameFile = originalname.toLowerCase();

    //Detectar si es imagen o vídeo según la extensión
    const isImage = nameFile.endsWith('.jpg') || nameFile.endsWith('.jpeg') || nameFile.endsWith('.png') || nameFile.endsWith('.webp') || nameFile.endsWith('.insp');
    const isVideo = nameFile.endsWith('.mp4') || nameFile.endsWith('.mov') || nameFile.endsWith('.avi') || nameFile.endsWith('.webm')  || nameFile.endsWith('.insv');

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

//Subir los archivos a Cloudinary y devolver un array de URLs
const uploadFilesToCloudinary = async (files) => {
    if (!files || files.length === 0) return null;
    const uploadResults = await uploadFilesCloudinaryHelper(files);
    return uploadResults.map(result => result.url);
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
    normalizeAttachedArray,
    uploadOneFileCloudinaryHelper,
    uploadFilesToCloudinary,
    deleteOneFileCloudinaryHelper,
    extractPublicIds,
    deteleFilesCloudinaryHelper
}