const { getCities, createCity } = require('../controllers/cities');
const router = require('express').Router();
const adminValidate = require('../middlewares/admin');
const authValidate = require('../middlewares/auth');

router.get('/', getCities);
router.post('/', authValidate, adminValidate, createCity);

module.exports = router;