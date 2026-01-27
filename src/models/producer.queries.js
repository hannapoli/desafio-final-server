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

    getInfoParcelSky: `
    SELECT uid_parcel, "time", temperature, relative_humidity, precipitation, cloud_cover, wind_speed, wind_direction 
    FROM public.meteo_forecast 
    WHERE uid_parcel = $1 AND "time"::timestamp = (SELECT MAX("time"::timestamp) FROM public.meteo_forecast WHERE uid_parcel = $1);
    `,

    getInfoParcelCrop: `
    SELECT nombre_cultivo, nombre_variedad, nombre_cientifico, dias_madurez, habito_crecimiento, rango_ph, necesidades_hidricas, resistencias, rendimiento_teorico, grados_brix
    FROM cultivos INNER JOIN parcels ON cultivos.id_cultivo = parcels.id_cultivo
    WHERE uid_parcel = $1
    `,

    getInfoParcelSoil: `
    SELECT uid_parcel, fecha, ndvi, gndvi, ndwi, savi FROM public.parcel_vegetation_indices WHERE uid_parcel = $1;
    `
}

module.exports = {
    producerQueries
}