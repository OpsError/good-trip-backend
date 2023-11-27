const router = require('express').Router();
const { setAdmin, deleteAdmin, deletePlaceForsed } = require('../controllers/admin');

router.patch('/set/:userId', setAdmin);
router.patch('/delete/:userId', deleteAdmin);
router.delete('/place/:placeId', deletePlaceForsed);

module.exports = router;