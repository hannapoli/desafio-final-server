const pool = require('../configs/dbConnect');
const {alertsQueries} = require("./alerts.queries");


const getAlertByParcelModel =  async (uid_parcel) => {
 let result
    try {
        result = await pool.query(alertsQueries.getAllAlertById, [uid_parcel])
        console.log(result.rows[0], "COLUMNAS")
           return result.rows[0]
    } catch (error) {
        console.log(error, "<Error en getAlertByParcelModel>")
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
        console.log(error, "<Error en getAllAlertsModel>")
        return error;
    }
}
const getAllInfoMeteoByUserModel = async (email) => {
     let result
    try {
        result = await pool.query(alertsQueries.getAllInfoMeteoByUser, [email])
        console.log(result.rows, "COLUMNAS")
           return result.rows
    } catch (error) {
        console.log(error, "<Error en getAllInfoMeteoByUserModel>")
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
        console.log(error, "<Error en getInfoMeteoByParcelModel>")
        return error;
    }
}

const getParcelVegetationByParcelIDModel = async (uid_parcel) => {
    let result
   try {
       result = await pool.query(alertsQueries.getParcelVegetationByParcelID, [uid_parcel])
       console.log(result.rows[0], "COLUMNAS")
          return result.rows[0]
   } catch (error) {
       console.log(error, "<Error en getParcelVegetationByParcelID>")
       return error;
   }
}
const getParcelCropsByParcelIDModel = async (uid_parcel) => {
    let result
   try {
       result = await pool.query(alertsQueries.getParcelCropsByParcelID, [uid_parcel])
       console.log(result.rows[0], "COLUMNAS")
          return result.rows[0]
   } catch (error) {
       console.log(error, "<Error en getParcelCropsByParcelID>")
       return error;
   }
}

module.exports = {
    getAlertByParcelModel,
    getAllAlertsModel,
    getAllInfoMeteoByUserModel,
    getInfoMeteoByParcelModel,
    getParcelVegetationByParcelIDModel,
    getParcelCropsByParcelIDModel
}