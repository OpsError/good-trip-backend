const validator = require('validator');
const InvalidData = require('../errors/invalid-data-err');
const fs = require('fs');
const imagePattern = /[\w]*\.[png | jpg | jpeg | svg | webp]/;

const isUndefined = (element) => {
    return typeof element === 'undefined';
}

const isObjectUndefined = ({ cityId, name, description, address, photo }) => {
    return isUndefined(cityId) || isUndefined(name) || isUndefined(description) || isUndefined(address) || isUndefined(photo);
}

const unlinkImage = (photo) => {
    fs.unlink(`./upload/places/${photo}`, (unlinkErr) => {
        next(unlinkErr);
    });
}

module.exports = (req, res, next) => {
    const {
        cityId, name, description, address, photo
    } = req.body;

    let isValid;
    if (!isObjectUndefined({ cityId, name, description, address, photo })) {
        const idCityId = validator.isMongoId(cityId);
        const isName = validator.isLength(name, { min: 3, max: 20 });
        const isDescription = validator.isLength(description, { min: 0, max: 300 });
        const isAddress = validator.isLength(address, { min: 3, max: 30 });
        const isPhoto = validator.equals(photo, imagePattern);

        isValid = idCityId || isName || isDescription || isAddress || isPhoto;
    } else {
        unlinkImage(photo);
        return next(new InvalidData('Bad Request'));
    }

    if (!isValid) {
        unlinkImage(photo);
    }
    return isValid? next() : next(new InvalidData('Bad Request'));
}