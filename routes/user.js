const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getInfo } = require('../controllers/users');
const { validateParamsGetInfo } = require('../middlewares/validate');
const infoRouter = require('./userInfo');
const faveRouter = require('./userFave');

// обновление инфо
router.use('/me', auth, infoRouter);
// сохранить в избранное
router.use('/fave', auth, faveRouter);

// получение инфо
router.get('/:userId', validateParamsGetInfo, getInfo);

module.exports = router;