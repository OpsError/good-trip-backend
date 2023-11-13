const mongoose = require('mongoose');
const validatorLib = require('validator');

const placeSchema = new mongoose.Schema({
    // id города
    // cityId: {
    //     type: Number,
    //     required: true,
    // },
    // название места
    name: {
        type: String,
        required: true,
    },
    // описание
    // description: {
    //     type: String,
    //     required: true
    // },
    // ссылка на фото
    // photo: {
    //     type: String,
    //     required: true,
    // },
    // адрес
    // address: {
    //     type: String,
    //     required: true,
    // },
    // время работы
    // timeFrom: {
    //     type: String,
    //     required: false,
    // },
    // timeTo: {
    //     type: String,
    //     required: false,
    // }
});

module.exports = mongoose.model('place', placeSchema);