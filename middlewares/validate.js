const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

// const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const usernamePattern = /[\w]*/;
const imagePattern = /[\w]*\.[png | jpg | jpeg | svg | webp]/;
const passwordPattern = /[[\w]*[\W]*]*/;

// create place
const validateBodyCreatePlace = celebrate({
    body: Joi.object().keys({
        cityId: Joi.objectId().required(),
        name: Joi.string().min(3).max(20).required(),
        description: Joi.string().max(300).required(),
        address: Joi.string().max(30).required(),
        photo: Joi.string().regex(imagePattern).required(),
        owner: Joi.objectId().required,
    }),
});
// delete place
const validateParamsDeletePlace = celebrate({
    params: Joi.object().keys({
        placeId: Joi.objectId(),
    }),
});
// валидация при регистрации
const validateBodySignup = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().min(3).max(18).regex(usernamePattern),
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().min(5).email().required(),
        password: Joi.string().min(3).max(25).required().regex(passwordPattern),
    }),
});
// валидация при авторизации
const validateBodySignin = celebrate({
    body: Joi.object().keys({
        email: Joi.string().min(2).email().required(),
        password: Joi.string().min(3).max(25).required(),
    }),
});
// update info
const validateBodyPatchInfo = celebrate({
    body: Joi.object().keys({
        username: Joi.string().required().min(3).max(18).regex(usernamePattern),
        name: Joi.string().min(2).max(20).required(),
        email: Joi.string().min(5).email().required(),
        photo: Joi.string().regex(imagePattern).required(),
    }),
});
// get info
const validateParamsGetInfo = celebrate({
    params: Joi.object().keys({
        userId: Joi.objectId(),
    }),
});

// upload image
const validateParamsUploadImage = celebrate({
    params: Joi.object().keys({
        imgId: Joi.string().regex(imagePattern),
    }),
})

module.exports = {
    validateBodySignup,
    validateBodySignin,
    validateBodyCreatePlace,
    validateParamsDeletePlace,
    validateParamsGetInfo,
    validateBodyPatchInfo,
    validateParamsUploadImage
}