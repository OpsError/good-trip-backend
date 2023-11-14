const router = require('express').Router();
const { validatePlaceBody, validatePlaceParams } = require('../middlewares/validate');
const { getPlaces, createPlace, deletePlace } = require('../controllers/places');
const { signup, signin, updateInfo } = require('../controllers/users');
const {uploadImage} = require('../middlewares/upload');

router.get('/', getPlaces);
router.post('/', uploadImage('place').single('photo'), createPlace);
router.delete('/:placeId', validatePlaceParams, deletePlace);
router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/user', uploadImage('avatar').single('photo'), updateInfo);

module.exports = router;