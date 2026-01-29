const directorQueries = {
    getAllParcels: `SELECT * 
        FROM parcels AS p INNER JOIN director_producer AS dp ON p.uid_producer = dp.uid_producer 
        INNER JOIN users as u ON u.firebase_uid_user = p.uid_producer
        INNER JOIN cultivos as c ON c.id_cultivo = p.id_cultivo
        WHERE dp.uid_director = $1 
        ORDER BY p.name_parcel;`,
    getParcelByID: `SELECT * FROM parcels WHERE uid_parcel = $1`,
    getAllReports: `SELECT * FROM reports WHERE email_creator = $2 AND $1 = ANY(email_receiver) ORDER BY created_at DESC;`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    getReportByID: `SELECT * FROM reports WHERE uid_report = $1`,
    getAllConsultant: `SELECT * FROM users WHERE uid_rol = 'f4409e7e-ec44-4f3b-86a6-a3692a81a7e1';`,
    getAllProductor: `SELECT u.*
        FROM users AS u WHERE u.uid_rol = '9717e4fb-c034-46e9-9350-9375f797a384'`,
    getAllProductorByID: `SELECT u.*
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
    desasignarAsesor: `DELETE FROM producer_consultant
        WHERE uid_producer = (
            SELECT firebase_uid_user FROM users WHERE email_user = $1
        )
        AND uid_consultant = (
            SELECT firebase_uid_user FROM users WHERE email_user = $2
        )
        RETURNING *;`,
    getConsultantsByProductor: `SELECT *
        FROM users
        WHERE firebase_uid_user IN (
            SELECT pc.uid_consultant
            FROM producer_consultant AS pc
            INNER JOIN users AS p
                ON p.firebase_uid_user = pc.uid_producer
            WHERE p.email_user = $1);`,
    contratarProductor:  `
        INSERT INTO director_producer (uid_director, uid_producer)
        VALUES ($1, $2)
        ON CONFLICT (uid_director, uid_producer) DO NOTHING
        RETURNING *;`,
    despedirProductor: `
        DELETE FROM director_producer
        WHERE uid_director = $1
            AND uid_producer = $2
        RETURNING *;`,
}

module.exports = {
    directorQueries
}