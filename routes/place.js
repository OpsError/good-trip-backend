const router = require('express').Router();
const auth = require('../middlewares/auth');
const { 
    getPlaces,
    createPlace,
    deletePlace,
    putLike,
    deleteLike,
} = require('../controllers/places');
const { validateParamsPlaceId } = require('../middlewares/validate');
const validateCreatePlace = require('../middlewares/validatePlaceBody');
const { uploadImage } = require('../middlewares/upload');

const placeConfig = {
    path: 'upload/places'
}

router.get('/', getPlaces);

// создание карточки
router.post('/', auth, uploadImage(placeConfig).single('photo'), validateCreatePlace, createPlace);
// удаление карточки
router.delete('/:placeId', auth, validateParamsPlaceId, deletePlace);

// лайки
router.put('/likes/:placeId', auth, validateParamsPlaceId, putLike);
router.delete('/likes/:placeId', auth, validateParamsPlaceId, deleteLike);

module.exports = router;