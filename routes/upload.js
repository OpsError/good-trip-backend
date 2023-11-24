const router = require('express').Router();
const { getAvatar, getImagePlace } = require('../controllers/upload');
const { validateParamsUploadImage } = require('../middlewares/validate')

router.get('/places/:imgId', validateParamsUploadImage, getImagePlace);

router.get('/avatar/:imgId', validateParamsUploadImage, getAvatar);

module.exports = router;