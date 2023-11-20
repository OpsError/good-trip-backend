const router = require('express').Router();
const auth = require('../middlewares/auth');
const { createPlace, deletePlace } = require('../controllers/places');
const { validatePlaceBody, validatePlaceParams } = require('../middlewares/validate');
const { uploadImage } = require('../middlewares/upload');

const placeConfig = {
    path: 'upload/places'
}

// создание карточки
router.post('/', auth, uploadImage(placeConfig).single('photo'), createPlace);

// удаление карточки
router.delete('/:placeId', auth, validatePlaceParams, deletePlace);

module.exports = router;