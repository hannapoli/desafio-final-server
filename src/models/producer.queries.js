const producerQueries = {
    getAllParcels: `SELECT * FROM parcels WHERE uid_producer= $1`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE email_creator = $1`,
    getReportByIDModel: `SELECT * FROM reports WHERE uid_report = $1`

}

module.exports = {
    producerQueries
}