const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const fs = require('fs');

// const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const usernamePattern = /[\w]*/;
const imagePattern = /[\w]*\.[png | jpg | jpeg | svg | webp]/;
const passwordPattern = /[[\w]*[\W]*]*/;

const usernameConfig = () =>  { return Joi.string().required().min(3).max(18).regex(usernamePattern) };
const nameConfig = () => { return Joi.string().min(2).max(20).required() };
const emailConfig = () => { return Joi.string().min(5).email().required() };
const passwordConfig = () => { return Joi.string().min(3).max(25).required().regex(passwordPattern) };
const objectIdConfig = () => { return Joi.objectId() };
const photoConfig = () => { return Joi.string().regex(imagePattern) };

// delete place
const validateParamsPlaceId = celebrate({
    params: Joi.object().keys({
        placeId: objectIdConfig(),
    }),
});
// валидация при регистрации
const validateBodySignup = celebrate({
    body: Joi.object().keys({
        username: usernameConfig(),
        name: nameConfig(),
        email: emailConfig(),
        password: passwordConfig(),
    }),
});
// валидация при авторизации
const validateBodySignin = celebrate({
    body: Joi.object().keys({
        email: emailConfig(),
        password: passwordConfig(),
    }),
});

const validatePatchPhoto = celebrate({
    body: Joi.object().keys({
        photo: photoConfig(),
    }),
});

const validatePatchUsername = celebrate({
    body: Joi.object().keys({
        username: usernameConfig(),
        name: nameConfig(),
    }),
});

const validatePatchPassword = celebrate({
    body: Joi.object().keys({
        oldPassword: passwordConfig(),
        newPassword: passwordConfig(),
    }),
});

const validatePatchEmail = celebrate({
    body: Joi.object().keys({
        email: emailConfig(),
    }),
});

// get info
const validateParamsGetInfo = celebrate({
    params: Joi.object().keys({
        userId: objectIdConfig(),
    }),
});

// upload image
const validateParamsUploadImage = celebrate({
    params: Joi.object().keys({
        imgId: photoConfig(),
    }),
});

const validateCreateCity = celebrate({
    body: Joi.object().keys({
        name: nameConfig(),
    }),
});

const validateSetAdmin = celebrate({
    params: Joi.object().keys({
        userId: objectIdConfig(),
    }),
});

const validateParamsDeleteCity = celebrate({
    params: Joi.object().keys({
        cityId: objectIdConfig().required()
    }),
});

module.exports = {
    validateBodySignup,
    validateBodySignin,
    // validateBodyCreatePlace,
    validateParamsPlaceId,
    validateParamsGetInfo,
    validateParamsUploadImage,
    validatePatchPhoto,
    validatePatchUsername,
    validatePatchPassword,
    validatePatchEmail,
    validateCreateCity,
    validateSetAdmin,
    validateParamsDeleteCity
}