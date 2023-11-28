const User = require('../models/user');
const NotFound = require('../errors/not-found-err');

module.exports = (req, res, next) => {
    const userId = req.params.userId;

    User.findById(userId)
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then(next())
}