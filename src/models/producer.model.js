const pool = require('../configs/dbConnect');
const {producerQueries} = require("./producer.queries");

const getAllParcelsModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getAllParcels, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }

}
const getParcelByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getParcelByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getAllReportsModel = async (email) => {
    let result
    try {
        result = await pool.query(producerQueries.getAllReports, [email])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getReportByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getReportByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const deleteReportsByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.deleteReportsByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const toArray = (value) => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
};

const createReportModel = async (email_creator, email_receiver, content_message, attached, uid_parcel) => {
    try {
        const result = await pool.query(producerQueries.createReport, [
            email_creator,
            toArray(email_receiver),
            content_message,
            toArray(attached),
            uid_parcel
        ]);
        
        console.log(result.rows[0], "REPORTE CREADO");
        return result.rows[0];
    } catch (error) {
        console.error("Error en createReportModel:", error);
        throw error;
    }
};

const updateReportModel = async (email_receiver, content_message, attached, uid_report) => {
    try {
        const result = await pool.query(producerQueries.updateReport, [
            toArray(email_receiver),
            content_message,
            toArray(attached),
            uid_report
        ]);
        
        console.log(result.rows[0], "REPORTE ACTUALIZADO");
        return result.rows[0];
    } catch (error) {
        console.error("Error en updateReportModel:", error);
        throw error;
    }
};

const existsParcelModel = async (uid_parcel) => {
    let result
    try {
        result= await pool.query(producerQueries.existsParcel, [uid_parcel])
        return result.rows[0]
    } catch(error) {
        console.log('Este es el error al comprobar si exisiste una parcela: ', error)
        throw error
    }
}

const createParcelModel = async (body) => {
    const {uid_parcel, uid_producer, name_parcel, id_cultivo, coordinates_parcel, photo_url} = body

     try {        
        const result = await pool.query(producerQueries.createParcel, [
           uid_parcel,
           uid_producer,
           name_parcel,
           id_cultivo,
           coordinates_parcel,
           photo_url
        ]);
        
        console.log(result.rows[0], "Parcela creada");
        return result.rows[0];
    } catch (error) {
        console.error("Error en creaParcela:", error);
        throw error;
    }
}

const deleteParcelModel = async (uid) => {
    let result
    try {
        result = await pool.query(producerQueries.deleteParcelById, [uid])
        // console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getInfoParcelSkyModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getInfoParcelSky, [id])
        console.log(result.rows, "SKY MODELO")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getInfoParcelCropModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getInfoParcelCrop, [id])
        console.log(result.rows, "CROP MODELO")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getInfoParcelSoilModel = async (id) => {
    let result
    try {
        result = await pool.query(producerQueries.getInfoParcelSoil, [id])
        console.log(result.rows, "SOIL MODELO")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

module.exports= {
    getAllParcelsModel,
    getParcelByIDModel,
    getAllReportsModel,
    getReportByIDModel,
    deleteReportsByIDModel,
    createReportModel,
    updateReportModel,
    existsParcelModel,
    createParcelModel,
    deleteParcelModel, 
    getInfoParcelSkyModel,
    getInfoParcelCropModel,
    getInfoParcelSoilModel,
}