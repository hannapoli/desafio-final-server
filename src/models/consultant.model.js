const pool = require('../configs/dbConnect');
const {consultantQueries} = require("./consultant.queries");

const getAllParcelsModel = async (email) => {
    let result
    try {
        result = await pool.query(consultantQueries.getAllParcels, [email])
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
        result = await pool.query(consultantQueries.getParcelByID, [id])
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
        result = await pool.query(consultantQueries.getAllReports, [email])
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
        result = await pool.query( consultantQueries.getReportByID, [id]);
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