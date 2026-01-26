const pool = require('../configs/dbConnect');
const {alertsQueries} = require("./alerts.queries");


const getAlertByParcelModel =  async (uid_parcel) => {
 let result
    try {
        result = await pool.query(alertsQueries.getAllAlertById, [uid_parcel])
        console.log(result.rows[0], "COLUMNAS")
           return result.rows[0]
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}

const getAllAlertsModel = async (email) => {
    let result
    try {
        result = await pool.query(alertsQueries.getAllAlertsByUser, [email])
        console.log(result.rows, "COLUMNAS")
           return result.rows
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getAllInfoMetoByUserModel = async (email) => {
     let result
    try {
        result = await pool.query(alertsQueries.getAllInfoMetoByUser, [email])
        console.log(result.rows, "COLUMNAS")
           return result.rows
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}
const getInfoMeteoByParcelModel = async (uid_parcel) => {
     let result
    try {
        result = await pool.query(alertsQueries.getInfoMeteoByParcel, [uid_parcel])
        console.log(result.rows[0], "COLUMNAS")
           return result.rows[0]
    } catch (error) {
        console.log(error, "<===========================>")
        return error;
    }
}



module.exports ={
    getAlertByParcelModel,
    getAllAlertsModel,
    getAllInfoMetoByUserModel,
    getInfoMeteoByParcelModel
}