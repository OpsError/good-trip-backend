const router = require('express').Router();
const { signup, signin } = require('../controllers/users');
const { validateBodySignup, validateBodySignin, } = require('../middlewares/validate');

router.post('/signin', validateBodySignin, signin);
router.post('/signup', validateBodySignup, signup);

module.exports = router;