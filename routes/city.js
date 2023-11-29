const { getCities, createCity, deleteCity } = require('../controllers/cities');
const router = require('express').Router();
const adminValidate = require('../middlewares/admin');
const authValidate = require('../middlewares/auth');
const { validateCreateCity, validateParamsDeleteCity } = require('../middlewares/validate');

router.get('/', getCities);
router.post('/', authValidate, adminValidate, validateCreateCity, createCity);
router.delete('/:cityId', authValidate, adminValidate, validateParamsDeleteCity, deleteCity);

module.exports = router;