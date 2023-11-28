const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const InvalidAuth = require('../errors/invalid-auth-err');

module.exports = (req, res, next) => {
    const token = req.cookies.REMEMBERME;

    if (!token) {
        throw new InvalidAuth('Необходима авторизация');
    }

    let payload;

    try {
        payload = jwt.verify(token, 'super-secret-key');
    } catch (err) {
        return next(new InvalidAuth('Необходима авторизация'));
    }

    req.user = payload;
    return next();
}