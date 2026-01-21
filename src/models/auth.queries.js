const queriesAuth = {
    addUser: `
        INSERT INTO users (firebase_uid_user, email_user, name_user, uid_rol) 
        VALUES ($1, $2, $3, (SELECT uid_rol FROM roles WHERE rol_type = $4)) 
        RETURNING *`,
    findUserByEmail: `
        SELECT * 
        FROM users 
        WHERE email_user = $1`,
    findUserByUid: `
        SELECT u.*, r.rol_type 
        FROM users u
        JOIN roles r ON u.uid_rol = r.uid_rol
        WHERE u.firebase_uid_user = $1`,
};

module.exports = queriesAuth;