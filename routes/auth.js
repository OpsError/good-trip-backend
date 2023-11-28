const router = require('express').Router();
const { signup, signin, signout } = require('../controllers/auth');
const { validateBodySignup, validateBodySignin, } = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.post('/signin', validateBodySignin, signin);
router.post('/signup', validateBodySignup, signup);
router.delete('/signout', auth, signout);

module.exports = router;