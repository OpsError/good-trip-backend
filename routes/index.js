const router = require('express').Router();
const { validatePlaceBody, validatePlaceParams } = require('../middlewares/validate');
const { getPlaces, createPlace, deletePlace } = require('../controllers/places');

router.get('/', getPlaces);
router.post('/', validatePlaceBody, createPlace);
router.delete('/:placeId', validatePlaceParams, deletePlace);

module.exports = router;