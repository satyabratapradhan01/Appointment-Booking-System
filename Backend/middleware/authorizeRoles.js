

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({status: false ,message: "You don’t have permission" })
        }
        next();
    }
}

export default authorizeRoles;