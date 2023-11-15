const multer = require('multer');
const path = require('path');

const uploadImage = (config) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, config.path);
        },
        filename: (req, file, cb) => {
            const uniqueName = `${config.name}` + path.extname(file.originalname);
            req.body.photo = uniqueName;
            cb(null, uniqueName);
        }
    });

    return multer({ storage });
}

module.exports = {
    uploadImage
};