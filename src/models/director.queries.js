const directorQueries = {
    getAllParcels: `SELECT p.* 
        FROM parcels AS p INNER JOIN director_producer AS dp ON p.uid_producer = dp.uid_producer 
        WHERE dp.uid_director = $1 
        ORDER BY p.name_parcel;`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE $1 = ANY(email_receiver);`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    getAllConsultant: `SELECT * FROM users WHERE uid_rol = 'f4409e7e-ec44-4f3b-86a6-a3692a81a7e1';`,
    getAllProductor: `SELECT u.*
        FROM users AS u
        INNER JOIN director_producer AS dp
        ON dp.uid_producer = u.firebase_uid_user
        WHERE u.uid_rol = '9717e4fb-c034-46e9-9350-9375f797a384'
        AND dp.uid_director = $1;`,
    getUserByEmail: `SELECT * FROM users WHERE email_user = $1;`,
    asignarAsesor: `INSERT INTO producer_consultant (uid_producer, uid_consultant)
        VALUES (
            (SELECT firebase_uid_user FROM users WHERE email_user = $1),
            (SELECT firebase_uid_user FROM users WHERE email_user = $2)
            )
        RETURNING *;`,
}

module.exports = {
    directorQueries
}