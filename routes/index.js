const router = require('express').Router();
const { validatePlaceBody, validatePlaceParams } = require('../middlewares/validate');
const { getPlaces, createPlace, deletePlace } = require('../controllers/places');
const { signup, signin, updateInfo } = require('../controllers/users');
const {uploadImage} = require('../middlewares/upload');
const auth = require('../middlewares/auth');
const randomId = require('random-id');

const userConfig = {
    name: randomId(30, 'aA0'),
    path: 'upload/users'
}

const placeConfig = {
    name: randomId(30, 'aA0'),
    path: 'upload/places'
}

router.get('/', getPlaces);

router.post('/', auth, uploadImage(placeConfig).single('photo'), createPlace);

router.delete('/:placeId', auth, validatePlaceParams, deletePlace);

router.patch('/user', auth, uploadImage(userConfig).single('photo'), updateInfo);

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;