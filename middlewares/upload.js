const multer = require('multer');
const path = require('path');
const randomId = require('random-id');

const uploadImage = (config) => {
    let uniqueName = '';
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.path);
        },
        filename: (req, file, cb) => {
            uniqueName = randomId(30, 'aA0') + path.extname(file.originalname);
            req.body.photo = uniqueName;
            cb(null, uniqueName);
            uniqueName = '';
        }
    });
    return multer({ storage });
}

module.exports = {
    uploadImage
};