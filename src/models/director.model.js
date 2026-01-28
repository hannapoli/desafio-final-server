const pool = require('../configs/dbConnect');
const {directorQueries} = require("./director.queries");

const getAllParcelsModel = async (id) => {
    let result
    try {
        result = await pool.query(directorQueries.getAllParcels, [id])
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
        result = await pool.query(directorQueries.getParcelByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getAllReportsModel = async (userEmail, emailProductor) => {
    let result
    console.log(userEmail)
    console.log(emailProductor)
    try {
        result = await pool.query(directorQueries.getAllReports, [userEmail, emailProductor])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getReportByIDModel = async (id) => {
    let result;
    try {
        result = await pool.query( directorQueries.getReportByID, [id]);
        console.log(result.rows, "COLUMNAS");
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>");
        return error;
    }
};

const getAllConsultantModel = async () => {
    let result
    try {
        result = await pool.query(directorQueries.getAllConsultant)
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getAllProductorModel = async () => {
    let result
    try {
        result = await pool.query(directorQueries.getAllProductor)
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getAllProductorByIDModel = async (id) => {
    let result
    try {
        result = await pool.query(directorQueries.getAllProductorByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getUserByEmailModel = async (email) => {
    let result
    try {
        result = await pool.query(directorQueries.getUserByEmail, [email])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getConsultantsByProductorModel = async (email) => {
    let result
    try {
        console.log(email)
        result = await pool.query(directorQueries.getConsultantsByProductor, [email])
        console.log(result.rows, "COLUMNAS")
        return result.rows;
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const asignarAsesorModel = async (emailProductor, emailConsultant) => {
    let result
    try {
        result = await pool.query(directorQueries.asignarAsesor, [emailProductor, emailConsultant])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const desasignarAsesorModel = async (emailProductor, emailConsultant) => {
    let result
    try {
        result = await pool.query(directorQueries.desasignarAsesor, [emailProductor, emailConsultant])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const contratarProductorModel = async (uid, uid2) => {
    let result
    try {
        result = await pool.query(directorQueries.contratarProductor, [uid, uid2])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const despedirProductorModel = async (uid, uid2) => {
    let result
    try {
        result = await pool.query(directorQueries.despedirProductor, [uid, uid2])
        console.log(result.rows, "COLUMNAS")
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
    getAllConsultantModel,
    getUserByEmailModel,
    asignarAsesorModel,
    getAllProductorByIDModel,
    getConsultantsByProductorModel,
    desasignarAsesorModel,
    getAllProductorModel,
    contratarProductorModel, 
    despedirProductorModel
}