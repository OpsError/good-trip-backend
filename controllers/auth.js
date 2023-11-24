const User = require('../models/user');
const InvalidData = require('../errors/invalid-data-err');
const Duplicate = require('../errors/duplicate-err');
const InvalidAuth = require('../errors/invalid-auth-err');
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
    .then((user) => res.status(201).send({
        username: user.username,
        name: user.name,
        email: user.email,
        photo: user.photo,
        _id: user._id
    }))
    .catch((err) => {
        if (err.code === MONGODB_ERROR) {
            next(new Duplicate(err.keyValue.email ? 'Такая почта уже существует' : 'Такое имя пользователя занято'));
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
            photo: user.photo,
            _id: user._id
        });
    })
    .catch(next);
}

module.exports = {
    signup,
    signin,
}