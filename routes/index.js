const router = require('express').Router();
const auth = require('../middlewares/auth');
const authRouter = require('./auth');
const userRouter = require('./user');
const placeRouter = require('./place');
const uploadRouter = require('./upload');

router.use('/', authRouter);
router.use('/user', userRouter);
router.use('/place', placeRouter);
router.use('/upload', auth, uploadRouter);

module.exports = router;