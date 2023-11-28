const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const { PORT = 3001, DB_ADDRESS = 'mongodb://127.0.0.1:27017/placesdb' } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_ADDRESS);

app.use(express.json());

// app.use(requestLogger);

app.use(cookieParser());

app.use(router);

// app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send(err.stack);
    next();
});

app.listen(PORT, () => {
    console.log('HELLO WORLD');
});