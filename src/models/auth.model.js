const pool = require('../configs/dbConnect');
const authQueries = require('./auth.queries');

const addUserModel = async (firebaseUid, email, name, idRole) => {
    try {
        const result = await pool.query(authQueries.addUser, [firebaseUid, email, name, idRole]);
        // console.log(result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en addUserModel:', error);
        throw error;
    }
}

const findUserByEmailModel = async (email) => {
    try {
        const result = await pool.query(authQueries.findUserByEmail, [email]);
        // console.log(result.rows);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findUserByEmailModel:', error);
        throw error;
    }
}

const findUserByUidModel = async (firebaseUid) => {
    try {
        const result = await pool.query(authQueries.findUserByUid, [firebaseUid]);
        // console.log(result.rows);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findUserByUidModel:', error);
        throw error;
    }
}

module.exports = {
    addUserModel,
    findUserByEmailModel,
    findUserByUidModel
};