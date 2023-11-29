const User = require('../models/user');

module.exports = (placeId, res, next) => {
    User.find({ saved: placeId })
    .then((userArr) => {
        userArr.map(user => User.findByIdAndUpdate(user._id, {
            $pull: { saved: placeId },
        }, { new: true })
        .then(res.status(200).send('Saved deleted')));
    })
    .catch(next);
}