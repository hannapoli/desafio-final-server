const { findUserByUidModel } = require('../models/auth.model');

const getFullUserDataMiddleware = async (req, res, next) => {
    try {
        const { uid } = req.user;
        const user = await findUserByUidModel(uid);
        // console.log(uid)

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Usuario no encontrado.'
            });
        }

        //convertir id role al role 
        const userRole = user.uid_role_user || 'producer'; //temporalmente para pruebas

        req.user = {
            ...req.user,
            // email_user 
            name_user: user.name_user,
            role: userRole 
        };
        
        req.role = userRole;

        next();
    } catch (error) {
        console.error('Error en getFullUserDataMiddleware:', error);
        return res.status(500).json({
            ok: false,
            message: 'Error interno del servidor.'
        });
    }
};

module.exports = { getFullUserDataMiddleware };
