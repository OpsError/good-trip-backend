const User = require('../models/user');
const AccessError = require('../errors/access-err');

module.exports = (req, res, next) => {
    const userId = req.user._id;

    User.findById(userId)
    .then((user) => {
        console.log(user);
        return user.admin? next() : next(new AccessError('Нет доступа')) 
    })
}