const Place = require('../models/place');
const InvalidData = require('../errors/invalid-data-err');
const NotFound = require('../errors/not-found-err');
const AccessError = require('../errors/access-err')
const fs = require('fs');

// получение всех мест
const getPlaces = (req, res, next) => {
    res.status(200).sendFile(req.params.imgId, {
        root: './upload/places/'
    });
}

// создание места
const createPlace = (req, res, next) => {
    const {
        cityId, name, description, address, photo
    } = req.body;
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

module.exports = {
    getPlaces,
    createPlace,
    deletePlace
}