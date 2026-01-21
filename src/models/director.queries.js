const directorQueries = {
    getAllParcels: `SELECT p.* 
        FROM parcels AS p INNER JOIN director_producer AS dp ON p.uid_producer = dp.uid_producer 
        WHERE dp.uid_director = $1 
        ORDER BY p.name_parcel;`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE $1 = ANY(email_receiver);`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
}

module.exports = {
    directorQueries
}