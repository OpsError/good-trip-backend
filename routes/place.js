const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getPlaces, createPlace, deletePlace } = require('../controllers/places');
const { validateBodyCreatePlace, validateParamsDeletePlace } = require('../middlewares/validate');
const { uploadImage } = require('../middlewares/upload');

const placeConfig = {
    path: 'upload/places'
}

router.get('/', getPlaces);

// создание карточки
router.post('/', auth, uploadImage(placeConfig).single('photo'), validateBodyCreatePlace,createPlace);

// удаление карточки
router.delete('/:placeId', auth, validateParamsDeletePlace, deletePlace);

module.exports = router;