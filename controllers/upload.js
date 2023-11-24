const getAvatar = (req, res, next) => {
    res.status(200).sendFile(req.params.imgId, {
        root: './upload/users/'
    });
}

const getImagePlace = (req, res, next) => {
    res.status(200).sendFile(req.params.imgId, {
        root: './upload/places/'
    });
}

module.exports = {
    getAvatar,
    getImagePlace,
}