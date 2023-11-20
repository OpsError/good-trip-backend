const mongoose = require('mongoose');
const validatorLib = require('validator');

const placeSchema = new mongoose.Schema({
    // id города
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    // название места
    name: {
        type: String,
        required: true,
    },
    // описание
    description: {
        type: String,
        required: true
    },
    // адрес
    address: {
        type: String,
        required: true,
    },
    // название файла
    photo: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

module.exports = mongoose.model('place', placeSchema);