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

        // Mapeo de roles
        const roleMap = {
            '9717e4fb-c034-46e9-9350-9375f797a384': 'productor',
            'd9ac3cf9-80a5-46b0-b7f3-fc9e9ef05768': 'distribuidor',
            'f4409e7e-ec44-4f3b-86a6-a3692a81a7e1': 'asesor',
            'f868c9f0-be0b-4817-bbd2-aa8775e527d8': 'analista',
            'fe95e061-f046-46cb-9253-5ede9be81a12': 'director'
        };
        const userRole = roleMap[user.uid_rol] || 'rol_desconocido';
        
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
