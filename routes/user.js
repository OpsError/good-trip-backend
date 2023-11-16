const router = require('express').Router();
const randomId = require('random-id');
const auth = require('../middlewares/auth');
const { updateInfo, getInfo } = require('../controllers/users');
const { uploadImage } = require('../middlewares/upload');

const userConfig = {
    name: randomId(30, 'aA0'),
    path: 'upload/users'
}

// получение инфо
router.get('/:userId', getInfo);

// обновление инфо
router.patch('/me', auth, uploadImage(userConfig).single('photo'), updateInfo);

module.exports = router;