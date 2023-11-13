const Place = require('../models/place');
const InvalidData = require('../errors/invalid-data-err');
const NotFound = require('../errors/not-found-err');
const path = require('path');
// получение всех мест
const getPlaces = (req, res, next) => {
    // const {cityId} = req.body;
    // Place.find({ cityId: cityId })
    // .then((places) => res.send(places))
    // .catch(next);
    res.status(200).sendFile('qwqwq-wow-.jpg', {
        root: './images/'
    });
}

// создание места
const createPlace = (req, res, next) => {
    const { name } = req.body;
    Place.create({ name })
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

// удаление мероприятия
const deletePlace = (req, res, next) => {
    Place.deleteOne({ _id: req.params.placeId })
    .orFail(() => {
        throw new NotFound('Place Not Found');
    })
    .then(() => res.send({ message: 'Place Removed' }))
    .catch(next);
}

module.exports = {
    getPlaces,
    createPlace,
    deletePlace
}