const { validationResult } = require('express-validator');

//Enseña los primeros errores de validación encontrados
const validateInputMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = Object.values(errors.mapped())[0].msg;
        return res.status(400).json({
            ok: false,
            message: firstError
        });
    };
    next();
};

module.exports = {
    validateInputMiddleware
};