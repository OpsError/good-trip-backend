const router = require('express').Router();
const { signup, signin } = require('../controllers/users');

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;