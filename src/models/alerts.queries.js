
//   /getAllAlertsByUser/:email

    const alertsQueries = {
        getAllAlertById: `SELECT *
	        FROM public.alertas where uid_parcel = $1 order by fecha DESC`,
        getAllAlertsByUser: `SELECT DISTINCT ON (uid_parcel) *
            FROM public.alertas 
            where email = $1 ORDER BY uid_parcel, fecha DESC`,
        getAllInfoMetoByUser: `SELECT DISTINCT ON (uid_parcel)*
                FROM meteo_forecast
                where email = $1 ORDER BY uid_parcel, time DESC`,
        getInfoMeteoByParcel: `SELECT *
	        FROM meteo_forecast where uid_parcel = $1 order by time DESC`
        }
 

module.exports = {
    alertsQueries
}