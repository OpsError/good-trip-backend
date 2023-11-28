const { getCities, createCity } = require('../controllers/cities');
const router = require('express').Router();
const adminValidate = require('../middlewares/admin');
const authValidate = require('../middlewares/auth');
const { validateCreateCity } = require('../middlewares/validate');

router.get('/', getCities);
router.post('/', authValidate, adminValidate, validateCreateCity, createCity);

module.exports = router;