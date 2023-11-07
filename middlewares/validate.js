const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

const validatePlaceBody = celebrate({
    body: Joi.object().keys({
        cityId: Joi.number().integer().required(),
        name: Joi.string().min(3).required(),
        description: Joi.string().max(300).required(),
        photo: Joi.string().uri().pattern(new RegExp(urlPattern)).required(),
        address: Joi.string().required(),
        timeFrom: Joi.string(),
        timeTo: Joi.string(),
    }),
});

const validatePlaceParams = celebrate({
    params: Joi.object().keys({
        placeId: Joi.objectId(),
    }),
});

module.exports = {
    validatePlaceBody,
    validatePlaceParams
}