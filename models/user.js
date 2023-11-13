const mongoose = require('mongoose');
const validatorLib = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator(email) {
                return validatorLib.isEmail(email);
            },
            message: 'Invalid Email',
        }
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('user', userSchema);