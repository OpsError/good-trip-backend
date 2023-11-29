const City = require('../models/city');
const NotFound = require('../errors/not-found-err');

const getCities = (req, res, next) => {
    City.find({})
    .then((cities) => res.status(200).send(cities))
    .catch(next);
}

const createCity = (req, res, next) => {
    City.create(req.body)
    .then((city) => res.status(201).send(city))
    .catch(next);
}

const deleteCity = (req, res, next) => {
    City.findByIdAndDelete(req.params.cityId)
    .orFail(() => { throw new NotFound('Город не найден') })
    .then(() => res.status(200).send('Success'))
    .catch(next);
}

module.exports = {
    getCities,
    createCity,
    deleteCity
}