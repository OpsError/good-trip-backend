const User = require('../models/user');
const NotFound = require('../errors/not-found-err');
const Duplicate = require('../errors/duplicate-err');
const InvalidAuth = require('../errors/invalid-auth-err');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const MONGODB_ERROR = 11000;

// обновить фото
const patchPhoto = (req, res, next) => {
    const { photo } = req.body;

    Promise.all([
        User.findById(req.user._id),
        User.findByIdAndUpdate(req.user._id, { photo: photo }, { returnDocument: 'after' })
    ])
    .then(([oldUser, newUser]) => {
        if (oldUser.photo !== 'avatar.jpg') {
            fs.unlink(`./upload/users/${oldUser.photo}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        res.status(200).send({
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            photo: newUser.photo,
            saved: newUser.saved,
            _id: newUser._id
        });
    })
    .catch((err) => {
        fs.unlink(`./upload/users/${photo}`, (unlinkErr) => {
            next(unlinkErr);
        });
        next(err);
    });
}

// обновление username/name
const patchUsername = (req, res, next) => {
    const { username, name } = req.body;

    User.findByIdAndUpdate(req.user._id, { username: username, name: name }, { returnDocument: 'after' })
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        saved: user.saved,
        _id: user._id
    }))
    .catch((err) => {
        if (err.code === MONGODB_ERROR) {
            next(new Duplicate('Такое имя уже занято'))
        } else {
            next(err)
        }
    });
}

// обновить пароль
const patchPassword = (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    User.findById(req.user._id).select('+password')
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    // находит юзера и сравнивает пароль из бд и старый пароль из req
    .then((oldUser) => Promise.all([oldUser, bcrypt.compare(oldPassword, oldUser.password)]))
    .then(([user, matched]) => {
        // если разные, то throw new err
        if (!matched) {
            throw new InvalidAuth('Неверный пароль');
        }
        // хэширует новый пароль и добавляет его в бд вместо старого
        bcrypt.hash(newPassword, 10)
        .then((hash) => User.findByIdAndUpdate(
            req.user._id,
            { password: hash },
            { returnDocument: 'after' }
        )
        .then(() => res.status(200).send('Пароль успешно сохранён'))
        )
        .catch(next);
    })
    .catch(next);
}

// обновить email
const patchEmail = (req, res, next) => {
    const { email } = req.body.email;
    
    User.findByIdAndUpdate(req.user._id, { email: email }, {  returnDocument: 'after' })
    .orFail(() => { throw new  NotFound('Пользователь не найден')})
    .then((user) => res.status(201).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        saved: user.saved,
        _id: user._id
    }))
    .catch((err) => {
        if (err.code === MONGODB_ERROR) {
            next(new Duplicate('Такая почта уже существует'))
        } else {
            next(err);
        }
    });
}

// сохранить в избранное
const putFave = (req, res, next) => {
    const { placeId } = req.params.placeId;
    User.findByIdAndUpdate(req.user._id, {
        $addToSet: { saved: placeId },
    }, { new: true })
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        saved: user.saved,
        _id: user._id
    }))
    .catch(next);
}

// удалить из избранного
const deleteFave = (req, res, next) => {
    const { placeId } = req.params.placeId;
    User.findByIdAndUpdate(req.user._id, {
        $pull: { saved: placeId },
    }, { new: true })
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        saved: user.saved,
        _id: user._id
    }))
    .catch(next);
}

const getCurrentUser = (req, res, next) => {
    User.findById(req.user._id)
    .orFail(() => { throw new NotFound('Пользователь не найден') })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        admin: user.admin,
        _id: user._id
    }))
    .catch(next);
}

const getInfo = (req, res, next) => {
    User.findById(req.params.userId)
    .orFail(() => {
        throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        admin: user.admin,
        _id: user._id
    }))
    .catch(next);
}

module.exports = {
    patchPhoto,
    patchUsername,
    patchPassword,
    patchEmail,
    getInfo,
    getCurrentUser,
    putFave,
    deleteFave,
}