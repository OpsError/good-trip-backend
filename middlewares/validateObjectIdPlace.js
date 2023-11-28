const Place = require('../models/place');
const NotFound = require('../errors/not-found-err');

module.exports = (req, res, next) => {
    const placeId = req.params.placeId;

    Place.findById(placeId)
    .orFail(() => { throw new NotFound('Карточка не найдена') })
    .then(next())
}