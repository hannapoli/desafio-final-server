
//   /getAllAlertsByUser/:email

    const alertsQueries = {
        getAllAlertById: `SELECT *
	        FROM public.alertas where uid_parcel = $1 order by fecha DESC`,
        getAllAlertsByUser: `SELECT DISTINCT ON (alertas.uid_parcel) *
            FROM alertas 
            INNER JOIN parcels p 
            ON alertas.uid_parcel = p.uid_parcel
            INNER JOIN director_producer dp 
            ON dp.uid_producer = p.uid_producer
            INNER JOIN users u
            ON u.firebase_uid_user = dp.uid_producer
            WHERE u.email_user = $1
            ORDER BY alertas.uid_parcel, alertas.fecha DESC;
            `,
        getAllInfoMetoByUser: `SELECT DISTINCT ON (mf.uid_parcel) *
            FROM meteo_forecast mf
            INNER JOIN parcels p 
            ON mf.uid_parcel = p.uid_parcel
            INNER JOIN director_producer dp 
            ON dp.uid_producer = p.uid_producer
            INNER JOIN users u
            ON u.firebase_uid_user = dp.uid_producer
            WHERE u.email_user = $1 
            ORDER BY mf.uid_parcel, mf.time DESC`,

        getInfoMeteoByParcel: `SELECT *
	        FROM meteo_forecast where uid_parcel = $1 order by time DESC`
        }
 

module.exports = {
    alertsQueries
}