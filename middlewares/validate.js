const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

// const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const usernamePattern = /[\w]*/;

const validatePlaceBody = celebrate({
    body: Joi.object().keys({
        // cityId: Joi.number().integer().required(),
        name: Joi.string().min(3).required(),
        // description: Joi.string().max(300).required(),
        // address: Joi.string().required(),
        // timeFrom: Joi.string(),
        // timeTo: Joi.string(),
    }),
});

const validatePlaceParams = celebrate({
    params: Joi.object().keys({
        placeId: Joi.objectId(),
    }),
});
// валидация при регистрации
const validateBodySignup = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().min(3).max(18).regex(usernamePattern),
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().min(3).email().required(),
        password: Joi.string().min(3).max(25).required(),
        photo: Joi.string(),
    }),
});
// валидация при авторизации
const validateBodySignin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(2).email().required(),
        password: Joi.string().min(3).max(25).required(),
    }),
});

module.exports = {
    validatePlaceBody,
    validatePlaceParams,
    validateBodySignup,
    validateBodySignin
}