const { existsParcelModel } = require("./producer.model")

const producerQueries = {
    getAllParcels: `SELECT * FROM parcels WHERE uid_producer= $1`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE email_creator = $1`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    createReport: `
        INSERT INTO reports (email_creator, email_receiver, content_message, attached, uid_parcel, is_draft)
        VALUES ($1, $2, $3, $4, $5, FALSE)
        RETURNING *
    `,
    updateReport: `
        UPDATE reports 
        SET email_receiver = $1, content_message = $2, attached = $3
        WHERE uid_report = $4
        RETURNING *
    `,
    deleteReportsByID:`DELETE FROM reports WHERE uid_report = $1 RETURNING *;`,
    existsParcel:  `SELECT * FROM parcels WHERE uid_parcel = $1`,
    createParcel: `INSERT INTO parcels (uid_parcel, uid_producer, name_parcel, id_cultivo, coordinates_parcel, photo_url)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
    deleteParcelById: `DELETE FROM parcels WHERE uid_parcel = $1 RETURNING *;`,
    deleteAlertaByUid_parcel: 'DELETE FROM alertas WHERE uid_parcel = $1',
    deleteMeteoByUid_parcel: 'DELETE FROM meteo_forecast WHERE uid_parcel = $1',
    deleteWeatherByUid_parcel: 'DELETE FROM weather_archive WHERE uid_parcel = $1',
    deleteVegetationByUid_parcel: 'DELETE FROM parcel_vegetation_indices WHERE uid_parcel = $1'
    
}

module.exports = {
    producerQueries
}