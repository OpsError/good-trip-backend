const City = require('../models/city');

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

module.exports = {
    getCities,
    createCity
}