const router = require('express').Router();
const { uploadImage } = require('../middlewares/upload');
const {
    patchEmail,
    patchPassword,
    patchUsername,
    patchPhoto,
    getCurrentUser
} = require('../controllers/users');
const {
    validatePatchPhoto,
    validatePatchUsername,
    validatePatchEmail,
    validatePatchPassword
} = require('../middlewares/validate');

const userConfig = {
    path: 'upload/users'
}

router.get('/', getCurrentUser);
router.patch('/email', validatePatchEmail, patchEmail);
router.patch('/password', validatePatchPassword, patchPassword);
router.patch('/username', validatePatchUsername, patchUsername);
router.patch('/photo', uploadImage(userConfig).single('photo'), validatePatchPhoto, patchPhoto);

module.exports = router;