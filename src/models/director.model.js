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

const getAllReportsModel = async (email) => {
    let result
    try {
        result = await pool.query(directorQueries.getAllReports, [email])
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

module.exports= {
    getAllParcelsModel,
    getParcelByIDModel,
    getAllReportsModel,
    getReportByIDModel
}