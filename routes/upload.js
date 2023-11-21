const router = require('express').Router();
const { getPlaces } = require('../controllers/places');
const { getAvatar } = require('../controllers/users');
const { validateParamsUploadImage } = require('../middlewares/validate')

router.get('/places/:imgId', validateParamsUploadImage, getPlaces);

router.get('/avatar/:imgId', validateParamsUploadImage, getAvatar);

module.exports = router;