const analystQueries = {
    getAllParcels: `SELECT * FROM parcels`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`
}

module.exports = {
    analystQueries
}