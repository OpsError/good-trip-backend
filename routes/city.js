const { getCities, createCity } = require('../controllers/cities');
const router = require('express').Router();

router.get('/', getCities);
router.post('/', createCity);

module.exports = router;