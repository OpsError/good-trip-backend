const Place = require('../models/place');
const InvalidData = require('../errors/invalid-data-err').default;
const NotFound = require('../errors/not-found-err').default;

// получение всех мест
const getPlaces = (req, res, next) => {
    Place.find({})
    .then((places) => res.send(places))
    .catch(next);
}

// создание места
const createPlace = (req, res, next) => {
    const { 
        cityId,
        name,
        description,
        photo,
        address,
        timeFrom,
        timeTo
     } = req.body;
    
    Place.create({
        cityId,
        name,
        description,
        photo,
        address,
        timeFrom,
        timeTo
    })
    .then((place) => res.send(place))
    .catch((err) => {
        if (err.name === 'ValidationError') {
            next(new InvalidData('Invalid Data'))
        } else {
            next(err);
        }
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