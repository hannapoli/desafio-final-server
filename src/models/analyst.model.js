const pool = require('../configs/dbConnect');
const {analystQueries} = require("./analyst.queries");

const getAllParcelsModel = async () => {
    let result
    try {
        result = await pool.query(analystQueries.getAllParcels)
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
        result = await pool.query(analystQueries.getParcelByID, [id])
        console.log(result.rows, "COLUMNAS")
        return result.rows[0];
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}


module.exports= {
    getAllParcelsModel,
    getParcelByIDModel
}