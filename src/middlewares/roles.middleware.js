const jwt = require("jsonwebtoken");

const validateRole = ((rolesPermitidos) => {
    return (req, res, next) => {
        const role = req.role;
        console.log("================ ROLE ================",role)
        if (!rolesPermitidos.includes(role)) {
            return res.status(403).json({
                of: false,
                msg: "No tienes permisos." 
            })
        }
        next();
    };
})


module.exports={validateRole}