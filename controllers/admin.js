const User = require('../models/user');
const Place = require('../models/place');
const NotFound = require('../errors/not-found-err');
const AccessError = require('../errors/access-err');
const fs = require('fs');

// посвятить в бога
const setAdmin = (req, res, next) => {
    const userId = req.params.userId;
    console.log(req.params.userId);

    User.findByIdAndUpdate(userId, { admin: true })
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then(() => res.status(200).send('Success'))
    .catch(next);
}

// разжаловать из богов
const deleteAdmin = (req, res, next) => {
    const userId = req.params.userId;
    if (req.user._id === userId) {
        next(new AccessError('У тебя доступа нет хаха'));
    } else {
        User.findByIdAndUpdate(userId, { admin: false })
        .orFail(() => { throw new NotFound('Пользователь не найден') })
        .then(() => res.status(200).send('Success'))
        .catch(next);
    }
}

// принудительно удалить место
const deletePlaceForsed = (req, res, next) => {
    Place.findById({ _id: req.params.placeId })
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then((place) => {
        fs.unlink(`./upload/places/${place.photo}`, (err) => {
            if (err) {
                console.log(err)
            }
        });

        Place.deleteOne({ _id: req.params.placeId })
        .then(res.status(200).send({ message: 'Карточка удалена' }))
        .catch(next);
    })
    .catch(next);
}

module.exports = {
    setAdmin,
    deleteAdmin,
    deletePlaceForsed
}