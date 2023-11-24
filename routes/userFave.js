const router = require('express').Router();
const { putFave, deleteFave } = require('../controllers/users');
const { validateParamsPlaceId } = require('../middlewares/validate');

router.put('/:placeId', validateParamsPlaceId, putFave);
router.delete('/:placeId', validateParamsPlaceId, deleteFave);

module.exports = router;