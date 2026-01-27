const queriesAdminUsers = {
    findAllUsers: `
        SELECT 
            u.firebase_uid_user,
            u.name_user,
            u.email_user,
            r.rol_type
        FROM users u
        INNER JOIN roles r ON u.uid_rol = r.uid_rol
        ORDER BY u.name_user ASC`,  
    findUserByEmail: `
        SELECT 
            u.firebase_uid_user,
            u.name_user,
            u.email_user,
            r.rol_type
        FROM users u
        INNER JOIN roles r ON u.uid_rol = r.uid_rol
        WHERE u.email_user = $1`,
    modifyUserByUid: `
        UPDATE users 
        SET 
            name_user = $1, 
            email_user = $2, 
            uid_rol = (SELECT uid_rol FROM roles WHERE rol_type = $3)
        WHERE firebase_uid_user = $4 
        RETURNING 
            firebase_uid_user,
            name_user,
            email_user,
            (SELECT rol_type FROM roles WHERE uid_rol = users.uid_rol) as rol_type`,
    removeUserByUid: `
        WITH user_email AS (
            SELECT email_user FROM users WHERE firebase_uid_user = $1
        ),
        user_parcels AS (
            SELECT uid_parcel FROM parcels WHERE uid_producer = $1
        ),
        delete_alertas AS (
            DELETE FROM alertas WHERE uid_parcel IN (SELECT uid_parcel FROM user_parcels)
        ),
        delete_meteo AS (
            DELETE FROM meteo_forecast WHERE uid_parcel IN (SELECT uid_parcel FROM user_parcels)
        ),
        delete_vegetation AS (
            DELETE FROM parcel_vegetation_indices WHERE uid_parcel IN (SELECT uid_parcel FROM user_parcels)
        ),
        delete_weather AS (
            DELETE FROM weather_archive WHERE uid_parcel IN (SELECT uid_parcel FROM user_parcels)
        ),
        delete_reports AS (
            DELETE FROM reports 
            WHERE uid_parcel IN (SELECT uid_parcel FROM user_parcels)
            OR email_creator IN (SELECT email_user FROM user_email)
            OR (SELECT email_user FROM user_email) = ANY(email_receiver)
        ),
        delete_parcels AS (
            DELETE FROM parcels WHERE uid_producer = $1
        ),
        delete_director_producer AS (
            DELETE FROM director_producer WHERE uid_director = $1 OR uid_producer = $1
        ),
        delete_mensaje AS (
            DELETE FROM mensaje WHERE conversacion_id IN (
                SELECT id FROM conversacion WHERE firebase_uid_user = $1
            )
        ),
        delete_conversacion AS (
            DELETE FROM conversacion WHERE firebase_uid_user = $1
        ),
        delete_messages AS (
            DELETE FROM messages 
            WHERE email_creator IN (SELECT email_user FROM user_email) 
            OR email_receiver IN (SELECT email_user FROM user_email)
        )
        DELETE FROM users
        WHERE firebase_uid_user = $1 
        RETURNING *`,
};

module.exports = {
    queriesAdminUsers
};