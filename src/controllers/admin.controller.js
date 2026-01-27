const { admin } = require('../configs/firebaseAdmin');
const { findAllUsersModel, findUserByEmailModel, modifyUserByUidModel, removeUserByUidModel } = require('../models/admin.model');
const { findUserByUidModel } = require('../models/auth.model');

const getAllUsersController = async (req, res) => {
    try {
        const users = await findAllUsersModel();
        return res.status(200).json({
            ok: true,
            users: users
        });
    } catch (error) {
        console.error('Error al obtener la lista de usuarios:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al obtener la lista de usuarios.'
        });
    }
};

const getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    try {
        const userFound = await findUserByEmailModel(email);
        if (!userFound) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el email.'
            });
        }
        return res.status(200).json({
            ok: true,
            user: userFound
        });
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al obtener el usuario.'
        });
    }
};
const editUserByUidController = async (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;
    // console.log(id, name, email, role);
    try {
        const userExists = await findUserByEmailModel(email);
        if (userExists && userExists.firebase_uid_user !== id) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario con este correo electrónico ya está registrado.'
            });
        }
        //Modificamos el usuario en Firebase Auth
        await admin.auth().updateUser(id, {email: email});

        //Modificamos el usuario a la base de datos PostgreSQL
        const updatedUser = await modifyUserByUidModel(id, name, email, role);
        if (!updatedUser) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario actualizado correctamente.',
            user: updatedUser
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al actualizar el usuario.'
        });
    }
};

const deleteUserByUidController = async (req, res) => {
    const { id } = req.params;
    try {
        // Eliminamos el usuario de Firebase Authentication
        await admin.auth().deleteUser(id);

        // Eliminamos el usuario de PostgreSQL
        const deletedUser = await removeUserByUidModel(id);
        if (!deletedUser) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado. Comprueba el ID.'
            });
        }
        return res.status(200).json({
            ok: true,
            message: 'Usuario eliminado correctamente.',
            user: deletedUser
        });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor al eliminar el usuario.'
        });
    }
};

module.exports = {
    getAllUsersController,
    getUserByEmailController,
    editUserByUidController,
    deleteUserByUidController
};