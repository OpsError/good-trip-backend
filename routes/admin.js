const router = require('express').Router();
const { setAdmin, deleteAdmin, deletePlaceForsed } = require('../controllers/admin');
const {
    validateSetAdmin,
    validateParamsPlaceId
} = require('../middlewares/validate');
const userIdValidate = require('../middlewares/validateObjectIdUser');
const placeIdValidate = require('../middlewares/validateObjectIdPlace');

router.patch('/set/:userId', validateSetAdmin, userIdValidate, setAdmin);
router.patch('/delete/:userId', validateSetAdmin, userIdValidate, deleteAdmin);
router.delete('/place/:placeId', validateParamsPlaceId, placeIdValidate, deletePlaceForsed);

module.exports = router;