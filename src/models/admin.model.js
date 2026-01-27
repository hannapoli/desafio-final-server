const pool = require('../configs/dbConnect');
const { queriesAdminUsers } = require('./admin.queries');

const findAllUsersModel = async () => {
    try {
        const result = await pool.query(queriesAdminUsers.findAllUsers);
        return result.rows || [];
    } catch (error) {
        console.error('Error en findAllUsers:', error);
        throw error;
    }
};

const findUserByEmailModel = async (email) => {
    try {
        const result = await pool.query(queriesAdminUsers.findUserByEmail, [email]);
        // console.log(result.rows);
        return result.rows[0];
    } catch (error) {
        console.error('Error en findUserByEmail:', error);
        throw error;
    }
}

const modifyUserByUidModel = async (firebaseUid, name, email, role) => {
    try {
        const result = await pool.query(queriesAdminUsers.modifyUserByUid, [name, email, role, firebaseUid]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en modifyUserByUid:', error);
        throw error;
    }
}

const removeUserByUidModel = async (firebaseUid) => {
    try {
        const result = await pool.query(queriesAdminUsers.removeUserByUid, [firebaseUid]);
        return result.rows[0];
    } catch (error) {
        console.error('Error en removeUserByUid:', error);
        throw error;
    }
}

module.exports = {
    findAllUsersModel,
    findUserByEmailModel,
    modifyUserByUidModel,
    removeUserByUidModel
};