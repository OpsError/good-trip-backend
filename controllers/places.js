const Place = require('../models/place');
const City = require('../models/city');
const InvalidData = require('../errors/invalid-data-err');
const NotFound = require('../errors/not-found-err');
const AccessError = require('../errors/access-err')
const fs = require('fs');

const getPlaces = (req, res, next) => {
    Place.find({})
    .then((places) => res.status(200).send({places}))
    .catch(next);
}

// создание места
const createPlace = (req, res, next) => {
    const {
        cityId, name, description, address, photo
    } = req.body;

    City.findById(cityId)
    .orFail(() => { throw new InvalidData('Невернные данные') })
    .then(() => {
        Place.create({
            cityId, name, description, address, photo, owner: req.user._id
        })
        .then((place) => {
            res.status(201).send(place);
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                next(new InvalidData('Invalid Data'))
            } else {
                next(err);
            }
            next(err);
        });
    })
    .catch(next);
};

// удаление
const deletePlace = (req, res, next) => {
    Place.findById({ _id: req.params.placeId })
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then((place) => {
        if (!(place.owner.toString() === req.user._id)) {
            throw next(new AccessError('Нет прав доступа'));
        }
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

// поставить лайк
const putLike = (req, res, next) => {
    Place.findByIdAndUpdate(req.params.placeId, {
        $addToSet: { likes: req.user._id },
    }, { new: true })
    .orFail(() => { throw new NotFound('Место не найдено') })
    .then(place => res.status(200).send(place))
    .catch(next);
}

// удалить лайк
const deleteLike = (req, res, next) => {
    Place.findByIdAndUpdate(req.params.placeId, {
        $pull: { likes: req.user._id },
    }, { new: true })
    .orFail(() => { throw new NotFound('Место не найдено') })
    .then(place => res.status(200).send(place))
    .catch(next);
}

module.exports = {
    getPlaces,
    createPlace,
    deletePlace,
    putLike,
    deleteLike,
}