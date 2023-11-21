const User = require('../models/user');
const InvalidData = require('../errors/invalid-data-err');
const NotFound = require('../errors/not-found-err');
const Duplicate = require('../errors/duplicate-err');
const InvalidAuth = require('../errors/invalid-auth-err');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGODB_ERROR = 11000;

// регистрация
const signup = (req, res, next) => {
    const {username, name, email, password} = req.body;
    bcrypt.hash(password, 10)
    .then((hash) => User.create({
        username, name, email, password: hash, photo: 'avatar.jpg'
    }))
    .then((user) =>
        res.status(201).send({
            name: user.name,
            email: user.email,
            _id: user._id,
        })
    )
    .catch((err) => {
        if (err.code === MONGODB_ERROR) {
            next(new Duplicate('Такая почта уже существует'));
        } else if (err.name === 'ValidationError') {
            next(new InvalidData('Данные введены неправильно'))
        } else {
            next(err);
        }
    });
}

// авторизация
const signin = (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ email }).select('+password')
    .orFail(() => { throw new InvalidAuth('Неверный логин или пароль') })
    .then((user) => Promise.all([user, bcrypt.compare(password, user.password)]))
    .then(([user, matched]) => {
        if (!matched) {
            throw new InvalidAuth('Неверный логин или пароль');
        }
        const token = jwt.sign({_id: user._id}, 'super-secret-key', {expiresIn: '14d'});
        res
        .cookie('TOKEN', token, {
            httpOnly: true,
        })
        .status(200)
        .send({
            username: user.username,
            name: user.name,
            email: user.email,
            _id: user._id
        });
    })
    .catch(next);
}

// обновить профиль
const updateInfo = (req, res, next) => {
    const { username, name, email, photo } = req.body;

    User.findById(req.user._id)
    .orFail(() => {
        throw new NotFound('Пользователь не найден');
    })
    .then((user) => {
        if (!(user._id.toString() === req.user._id)) {
            console.log(user._id.toString(), req.user._id)
            throw next(new AccessError('Нет прав доступа'));
        }
        if (user.photo !== 'default-avatar.jpg') {
            fs.unlink(`./upload/users/${user.photo}`, (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
        User.findByIdAndUpdate(req.user._id, { username, name, email, photo }, { returnDocument: 'after' })
        .orFail(() => {
        throw new NotFound('User Not Found');
        })
        .then((user) => res.status(200).send(user))
        .catch((err) => {
        if (err.code === MONGODB_ERROR) {
            next(new Duplicate('Такая почта уже существует'));
        } else {
            next(err);
        }
        });
    })
    .catch(next);
}

const getInfo = (req, res, next) => {
    User.findById({ _id: req.params.userId })
    .orFail(() => {
        throw new NotFound('Пользователь не найден');
    })
    .then((user) => res.status(200).send({
        username: user.username,
        name: user.name,
        photo: user.photo,
    }))
    .catch(next);
}

const getAvatar = (req, res, next) => {
    res.status(200).sendFile(req.params.imgId, {
        root: './upload/users/'
    });
}

module.exports = {
    signup,
    signin,
    updateInfo,
    getInfo,
    getAvatar,
}