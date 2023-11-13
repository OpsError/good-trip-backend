const multer = require('multer');
const path = require('path');

const uploadImage = (namePhoto) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            const uniqueName = `${namePhoto}` + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    });

    return multer({ storage });
}

module.exports = {
    uploadImage
};