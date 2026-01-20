const queriesAuth = {
    addUser: `
        INSERT INTO users (firebase_uid_user, email_user, name_user, uid_role_user) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
    findUserByEmail: `
        SELECT * 
        FROM users 
        WHERE email_user = $1`,
    findUserByUid: `
        SELECT * 
        FROM users 
        WHERE firebase_uid_user = $1`,
};

module.exports = queriesAuth;