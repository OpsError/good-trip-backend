const router = require('express').Router();
const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const uploadRouter = require('./upload');
const cityRouter = require('./city');
const adminValidate = require('../middlewares/admin');
const authValidate = require('../middlewares/auth');
const adminRouter = require('./admin');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/place', placeRouter);
router.use('/upload', uploadRouter);
router.use('/city', cityRouter);
router.use('/admin', authValidate, adminValidate, adminRouter);

module.exports = router;