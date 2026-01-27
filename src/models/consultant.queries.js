const consultantQueries = {
    getAllParcels: `SELECT p.* 
        FROM parcels AS p INNER JOIN users AS u ON p.uid_producer = u.firebase_uid_user
        WHERE u.email_user = $1 
        ORDER BY p.name_parcel;`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE email_creator = $1;`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    getAllProducers: `SELECT u.* FROM users AS u INNER JOIN producer_consultant AS pc ON u.firebase_uid_user = pc.uid_producer WHERE pc.uid_consultant = $1;`,

}

module.exports = {
    consultantQueries
}