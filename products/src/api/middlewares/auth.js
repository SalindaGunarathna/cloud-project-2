const { ValidateSignature, IsAdmin } = require("../../utils");

const AuthMiddleware = async (req, res, next) => {
    const isAuthorized = await ValidateSignature(req);

    if (isAuthorized) {
        return next();
    }

    return res.status(403).json({ message: 'Not Authorized' });
};

const AdminMiddleware = async (req, res, next) => {
    const isAdmin = await IsAdmin(req);

    if (isAdmin) {
        return next();
    }

    return res.status(403).json({ message: 'Admins only' });
};

// Export both middleware functions
module.exports = {
    AuthMiddleware,
    AdminMiddleware
};