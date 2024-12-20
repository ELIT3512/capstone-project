const jwt = require('./jwt');
const models = require('../models');

module.exports = (redirectAuthenticated = true) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers?.authorization;
            if (!authHeader) {
                throw new Error('No token provided');
            }
            const token = authHeader.split(' ')[1];
            console.log("Token:", token);
            if (!token) {
                throw new Error('jwt must be provided');
            }
            const decoded = await jwt.verifyToken(token);
            const user = await models.User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            req.user = user; 
            next(); 
        } catch (err) {
            console.error("Authentication error:", err.message);
            if (!redirectAuthenticated) {
                next(); 
                return;
            }
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired. Please log in again.' });
            }
            if (['jwt must be provided', 'No token provided'].includes(err.message)) {
                return res.status(401).json({ message: 'UNAUTHORIZED!' });
            }
            next(err); 
        }
    };
};
