const router = require('express').Router();
const auth = require('../middlewares/auth');
const { updateInfo, getInfo } = require('../controllers/users');
const { uploadImage } = require('../middlewares/upload');
const { validateParamsGetInfo, validateBodyPatchInfo } = require('../middlewares/validate');

const userConfig = {
    path: 'upload/users'
}

// получение инфо
router.get('/:userId', validateParamsGetInfo, getInfo);

// обновление инфо
router.patch('/me', auth, uploadImage(userConfig).single('photo'), validateBodyPatchInfo, updateInfo);

module.exports = router;