const validateRole = ((rolesPermitidos) => {
    return (req, res, next) => {
        const role = req.role;
        // console.log("================ ROLE ================",role)
        if (!rolesPermitidos.includes(role)) {
            return res.status(403).json({
                ok: false,
                message: "No tienes permisos."
            })
        }
        next();
    };
})

const checkAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            ok: false,
            message: 'Acceso denegado: esta ruta es solo para el rol de administrador.'
        });
    }
    next();
};


module.exports = {
    validateRole,
    checkAdmin
};