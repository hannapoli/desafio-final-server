const { addUserModel, findUserByEmailModel } = require('../models/auth.model');

const registerUserController = async (req, res) => {
    const { uid, email, name, role } = req.body;
    if (!uid) {
        return res.status(400).json({
            ok: false,
            message: "Falta Firebase uid"
        });
    }
    try {
        const userExists = await findUserByEmailModel(email);

        if (userExists.length > 0) {
            return res.status(409).json({
                ok: false,
                message: 'Error: el usuario con este correo electrónico ya está registrado.'
            });
        }
        
        //Añadimos el usuario a la base de datos PostgreSQL

        //recibir role_id de role
        const roleId = 1; //temporalmente para pruebas
        const newUser = await addUserModel(uid, email, name, roleId);
        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado correctamente.',
            user: newUser
        });
    } catch (error) {
        console.error('Error en registerUserController:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
}

const getRoleController = async (req, res) => {
    return res.status(200).json({
        ok: true,
        name: req.user.name_user,
        role: req.role
    });
};

module.exports = {
    registerUserController,
    getRoleController
};