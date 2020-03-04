const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config')

function auth(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token)
        return res.status(401).json({ isTokenError: true, message: 'No token, authorizaton denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ isTokenError: true, message: 'Token is not valid' });
    }
}

module.exports = auth;