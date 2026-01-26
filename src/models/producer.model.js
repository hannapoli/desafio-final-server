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

const createReportModel = async (email_creator, email_receiver, content_message, attached, uid_parcel) => {
    try {
        // email_receiver debe ser un array, attached también
        const emaiReceiverArray = Array.isArray(email_receiver) ? email_receiver : [email_receiver];
        const attachedArray = attached ? [attached] : [];
        
        const result = await pool.query(producerQueries.createReport, [
            email_creator,
            emaiReceiverArray,
            content_message,
            attachedArray,
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
        const emailReceiverArray = Array.isArray(email_receiver) ? email_receiver : [email_receiver];
        const attachedArray = attached ? (Array.isArray(attached) ? attached : [attached]) : [];
        
        const result = await pool.query(producerQueries.updateReport, [
            emailReceiverArray,
            content_message,
            attachedArray,
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
    const {uid_parcel, uid_producer, name_parcel, product_parcel, coordinates_parcel, photo_url} = body

     try {        
        const result = await pool.query(producerQueries.createParcel, [
           uid_parcel,
           uid_producer,
           name_parcel,
           product_parcel,
           coordinates_parcel,
           photo_url
        ]);
        
        console.log(result.rows[0], "REPORTE CREADO");
        return result.rows[0];
    } catch (error) {
        console.error("Error en createReportModel:", error);
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
    deleteParcelModel
}