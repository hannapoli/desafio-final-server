//Middleware para validar que el usuario solo acceda a sus propios recursos
 
//Valida que el :id en los params coincide con el uid del usuario autenticado
const validateUserUid = (req, res, next) => {
    const requestedUid = req.params.id;
    const userUid = req.user.uid;

    if (requestedUid !== userUid) {
        return res.status(403).json({
            ok: false,
            msg: "No tienes permiso para acceder a este recurso"
        });
    }

    next();
};

//Valida que el :email en los params coincide con el email del usuario autenticado
const validateUserEmail = (req, res, next) => {
    const requestedEmail = req.params.email;
    const userEmail = req.user.email;

    if (requestedEmail !== userEmail) {
        return res.status(403).json({
            ok: false,
            msg: "No tienes permiso para acceder a este recurso"
        });
    }

    next();
};

module.exports = {
    validateUserUid,
    validateUserEmail
};
