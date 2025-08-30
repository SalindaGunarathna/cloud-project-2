const { ValidateSignature, IsAdmin } = require('../../utils');

const UserAuth = async (req,res,next) => {
    
    const isAuthorized = await ValidateSignature(req);

    if(isAuthorized){
        return next();
    }
    return res.status(403).json({message: 'Not Authorized'})
}

const isAdmin = async (req,res,next) => {
    const isAdmin = await IsAdmin(req);

    if(isAdmin){
        return next();
    }
    return res.status(403).json({message: 'Admins only'})
}

module.exports = {
    UserAuth,
    isAdmin
};