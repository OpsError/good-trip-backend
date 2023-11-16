const router = require('express').Router();
const { getPlaces } = require('../controllers/places');
const { getAvatar } = require('../controllers/users');

router.get('/places/:imgId', getPlaces);

router.get('/avatar/:imgId', getAvatar);

module.exports = router;